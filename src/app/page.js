"use client"
import React, { useCallback, useEffect, useState } from 'react';
import '@xyflow/react/dist/style.css';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  ControlButton,
} from '@xyflow/react';
import Header from '../components/Header'
export default function App() {
  const [initialNodes, setInitialNodes] = useState([])
  const [initialEdges, setInitialEdges] = useState([])
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [selected, setSelected] = useState(null)
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Delete' && selectedNode) {
        console.log('Deleted node')
        setInitialNodes(initialNodes.filter(node => node.id !== selectedNode.id))
        setNodes(initialNodes.filter(node => node.id !== selectedNode.id))
        setInitialEdges(initialEdges.filter(edge => edge.source !== selectedNode.id && edge.target !== selectedNode.id))
        setEdges(initialEdges.filter(edge => edge.source !== selectedNode.id && edge.target !== selectedNode.id))
        setSelectedNode(null)
      }
      if (event.key === 'Delete' && selectedEdge) {
        console.log('Deleted edge')
        setSelectedEdge(null)
      }
    };

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  },[nodes, edges]);

  if (selectedNode) {
    console.log(selectedNode)
  }
  if (selectedEdge) {
    console.log(selectedEdge)
  }
  return (
    <>
      <Header nodes={nodes} setNodes={setNodes} setEdges={setEdges} selectedNode={selectedNode} selectedEdge={selectedEdge} />
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(event, node) => {
            setSelectedNode(node)

          }}
          onEdgeClick={(event, edge) => {
            setSelectedEdge(edge)
          }}
        >
          <MiniMap />
          <Background color="#333" variant="dots" gap={12} size={1} />
          <Controls>
          </Controls>
        </ReactFlow>
      </div>
    </>
  );
}