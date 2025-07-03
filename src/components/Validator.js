export function validateDAG(nodes, edges) {
  const errors = [];

  if (nodes.length < 2) {
    errors.push('Must have at least 2 nodes.');
  }

  const adjacency = {};
  nodes.forEach(node => {
    adjacency[node.id] = [];
  });
  edges.forEach(edge => {
    if (edge.source === edge.target) {
      errors.push('Self-loops are not allowed.');
    }
    adjacency[edge.source].push(edge.target);
  });

  const visited = {};
  const stack = {};

  function dfs(node) {
    visited[node] = true;
    stack[node] = true;

    for (const neighbor of adjacency[node]) {
      if (!visited[neighbor] && dfs(neighbor)) return true;
      if (stack[neighbor]) return true;
    }

    stack[node] = false;
    return false;
  }

  for (const node of nodes) {
    if (!visited[node.id]) {
      if (dfs(node.id)) {
        errors.push('Cycle detected in graph.');
        break;
      }
    }
  }

  nodes.forEach(n => {
    const connected = edges.some(e => e.source === n.id || e.target === n.id);
    if (!connected) errors.push(`Node "${n.data.label}" is not connected.`);
  });

  return { valid: errors.length === 0, errors };
}
