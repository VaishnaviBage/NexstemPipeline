import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  useReactFlow
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './components/CustomNode.jsx';
import ControlsPanel from './components/ControlsPanel.jsx';

import { validateDAG } from './components/Validator';
import dagre from 'dagre';

const nodeTypes = { custom: CustomNode };

const initialNodes = [];
const initialEdges = [];

function FlowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [idCounter, setIdCounter] = useState(1);
  const [validationResult, setValidationResult] = useState({ valid: true, errors: [] });

  const { fitView } = useReactFlow();

  const onConnect = useCallback(
    (params) => {
      if (params.source === params.target) return;
      setEdges((eds) => addEdge({ ...params, markerEnd: { type: 'arrowclosed' } }, eds));
    },
    [setEdges]
  );

  const addNode = () => {
    const label = prompt('Enter node name:');
    if (!label) return;

    const newNode = {
      id: `node-${idCounter}`,
      type: 'custom',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label }
    };
    setNodes((nds) => [...nds, newNode]);
    setIdCounter(idCounter + 1);
  };

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Delete') {
      setNodes((nds) => nds.filter((node) => !node.selected));
      setEdges((eds) => eds.filter((edge) => !edge.selected));
    }
  }, [setNodes, setEdges]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setValidationResult(validateDAG(nodes, edges));
  }, [nodes, edges]);

  const autoLayout = () => {
    const g = new dagre.graphlib.Graph();
    g.setDefaultEdgeLabel(() => ({}));
    g.setGraph({ rankdir: 'LR' });

    nodes.forEach((node) => g.setNode(node.id, { width: 172, height: 36 }));
    edges.forEach((edge) => g.setEdge(edge.source, edge.target));

    dagre.layout(g);

    const updatedNodes = nodes.map((node) => {
      const pos = g.node(node.id);
      return {
        ...node,
        position: { x: pos.x - 86, y: pos.y - 18 },
      };
    });

    setNodes(updatedNodes);
    fitView();
  };

  return (
    <>
      <ControlsPanel onAddNode={addNode} onAutoLayout={autoLayout} />
      <div className="react-flow-wrapper">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
      <div style={{ padding: 10 }}>
        {validationResult.valid ? (
          <p style={{ color: 'green' }}>✅ Valid DAG</p>
        ) : (
          <div style={{ color: 'red' }}>
            ❌ Invalid DAG:
            <ul>{validationResult.errors.map((err, i) => <li key={i}>{err}</li>)}</ul>
          </div>
        )}
      </div>
    </>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <FlowEditor />
    </ReactFlowProvider>
  );
}
