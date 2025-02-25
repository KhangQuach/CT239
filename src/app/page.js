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
import Header from '../components/header'

// const initialNodes = [
//   {
//     id: '1',
//     data: { label: '1' },
//     position: { x: 0, y: 0 },
//     type: 'input',
//   },
//   {
//     id: '2',
//     data: { label: '2' },
//     position: { x: 100, y: 100 },
//   },
//   {
//     id: '3',
//     data: { label: '3' },
//     position: { x: 300, y: 300 },
//   },
// ];
// const initialEdges = [
//   {
//     id: 'e1-2',
//     source: '1',
//     target: '2'
//   },
//   {
//     id: 'e2-3',
//     source: '2',
//     target: '3'
//   }
// ];
export default function App() {
  const [initialNodes, setInitialNodes] = useState([
    {
      id: '1',
      data: { label: '1' },
      position: { x: 0, y: 0 },
    },
    {
      id: '2',
      data: { label: '2' },
      position: { x: 100, y: 100 },
    },
    {
      id: '3',
      data: { label: '3' },
      position: { x: 300, y: 300 },
    },
  ])
  const [initialEdges, setInitialEdges] = useState([
    {
      id: 'e1-2',
      source: '1',
      target: '2'
    },
    {
      id: 'e2-3',
      source: '2',
      target: '3'
    },
    {
      id: 'e3-1',
      source: '3',
      target: '1'
    }
  ])
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
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
      if(event.key === 'Delete' && selectedEdge){
        console.log('Deleted edge')
        setSelectedEdge(null)
      }
    };

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedNode]);
  if(selectedNode){
    console.log(selectedNode)
  }
  if(selectedEdge){
    console.log(selectedEdge)
  }
  
  console.log(initialEdges)
  return (
    <>
      <Header />
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