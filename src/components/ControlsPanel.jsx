import React from 'react';

export default function ControlsPanel({ onAddNode, onAutoLayout }) {
  return (
    <div style={{ padding: 10 }}>
      <button onClick={onAddNode}>Add Node</button>
      <button onClick={onAutoLayout}>Auto Layout</button>
    </div>
  );
}
