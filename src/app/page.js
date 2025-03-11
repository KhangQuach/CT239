"use client"
import React, { useCallback, useEffect, useState } from 'react';
import '@xyflow/react/dist/style.css';
import Header from '../components/Header'
import NodeWithFourHandler from "@/components/nodes/NodeWithFourHandler";
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
const nodeTypes = { nodeWithFourHandler: NodeWithFourHandler };
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
    console.log('Selected:', selected)
  },[selected])
  useEffect(() => {
    console.log('Nodes:', nodes)
  },[nodes])
  useEffect(() => {
    console.log('Edges:', edges)
  },[edges])
  return (
    <>
      <Header nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} selectedNode={selectedNode} selectedEdge={selectedEdge} setSelectedNode={setSelectedNode} setSelectedEdge={setSelectedEdge} />
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
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