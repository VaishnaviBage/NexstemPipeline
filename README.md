# 🚀 React DAG Pipeline Editor

A visual editor for designing Directed Acyclic Graphs (DAGs), built using React and React Flow. This tool simulates data pipelines and processing workflows using draggable and connectable nodes.

## 🌐 Live Demo

🔗 [Deployed on Vercel]
https://nexstem-pipeline-dxe76y8gz-vaishnavis-projects-7485a9d2.vercel.app
---

## 📦 Features

- ➕ Add custom-named nodes
- 🔗 Draw directional edges between nodes
- ❌ Prevent invalid edges (e.g., self-loops, source→source)
- ✅ Real-time DAG validation (no cycles, no unconnected nodes)
- 🧭 Auto-layout via Dagre.js
- ⌨️ Delete selected nodes/edges using Delete or Backspace
- 🔍 Zoom & pan with built-in React Flow controls

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16+)
- npm (v8+)

### Installation & Run Locally

```bash
git clone https://github.com/vaishnavibage/pipeline-editor.git
cd pipeline-editor
npm install
npm run dev

**🧰 Libraries Used**
| Library        | Purpose                          |
| -------------- | -------------------------------- |
| **React**      | UI framework                     |
| **React Flow** | Visual graph and edge management |
| **Dagre**      | Auto-layout for nodes            |
| **Vite**       | Build and dev server             |

**📸 Screenshots**

![image](https://github.com/user-attachments/assets/017731e8-765b-43b1-9128-306e04b0bb66)


**🧠 Key Decisions & Challenges**
Used reactflow to simplify visual graph construction and event handling

Implemented cycle detection using Depth-First Search in Validator.js

Created auto-layout functionality using Dagre, integrated with fitView() to zoom/center after layout

Enabled delete by tracking selected elements using onSelectionChange

Handled real-time validation with useEffect watching nodes/edges state

**✅ Validation Rules**
At least 2 nodes

No cycles

All nodes must be connected to at least one edge

Only valid source → target connections (no source→source or target→target)

No self-loops

**📌 Possible Improvements**
Context menu (right-click delete/edit)

Node type icons (e.g., input/output/transform)

Save/load pipeline from localStorage

Export pipeline as JSON or PNG

**👩‍💻 Developed By**
Vaishnavi Bage
🔗https://github.com/VaishnaviBage/NexstemPipeline 


