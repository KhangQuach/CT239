'use client'
import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { Upload, Button, message } from 'antd'
import { CaretRightOutlined, ReloadOutlined, UploadOutlined } from '@ant-design/icons'
import convertMatrixToUndirectedGraph from '@/utils/convertMatrixToUndirectedGraph'
import convertMatrixToDirectedGraph from '@/utils/convertMatrixToDirectedGraph'
import validateMatrix from '@/utils/validateMatrix'
import isUndirectedMatrix from '@/utils/isUndirectedMatrix'
import { Slide, toast } from 'react-toastify'
import { Card } from "antd";
import Dijkstra from '@/algorithms/Dijkstra'
import BellmanFord from '@/algorithms/BellmanFord'

export default function Header({ nodes, edges, setNodes, setEdges, selectedNode, selectedEdge, setSelectedNode, setSelectedEdge }) {
  const [algorithm, setAlgorithm] = useState('Choose a algorithm')
  const [direct, setDirect] = useState('Choose a direct')
  const [fileContent, setFileContent] = useState(null)
  const [matrix, setMatrix] = useState([])
  const [hasNegativeWeights, setHasNegativeWeights] = useState(false)
  const [nodeStart, setNodeStart] = useState('Start node')
  const [distances, setDistances] = useState([])
  const [previousVertices, setPreviousVertices] = useState([])
  const [edgeList, setEdgeList] = useState([])
  const [loading, setLoading] = useState(false)
  const [executeTime, setExecuteTime] = useState(0)
  const [error, setError] = useState(null)
  const [onRun, setOnRun] = useState(false)

  useEffect(() => {
    console.log('Matrix updated:', matrix)
  }, [matrix])

  useEffect(() => {
    if (error) {
      toast.dismiss()
      toast.error(`${error}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    }
  }, [error])

  const handleChangeAlgorithm = (value) => {
    console.log(`selected ${value}`)
    setAlgorithm(value)
  }

  const handleChangeDirect = (value) => {
    setDirect(value)
    if (!matrix.length) {
      console.log("This is not matrix data!")
      return
    }
    switch (value) {
      case "directed":
        if (!isUndirectedMatrix(matrix)) {
          const directedGraph = convertMatrixToDirectedGraph(matrix)
          setNodes(directedGraph.initialNodes)
          setEdges(directedGraph.initialEdges)
        } else {
          setDirect('Choose a direct')
          console.log("Matrix is Undirected")
        }
        break
      case "undirected":
        if (isUndirectedMatrix(matrix)) {
          const undirectedGraph = convertMatrixToUndirectedGraph(matrix)
          setNodes(undirectedGraph.initialNodes)
          setEdges(undirectedGraph.initialEdges)
        } else {
          setDirect('Choose a direct')
          console.log("Matrix is directed")
        }
        break
      default:
        // Code to execute if no cases match
        console.log('Choose a direct option')
        break
    }
  }

  const handleChangeNodeStart = (value) => {
    setNodeStart(value)
  }

  const handleResetAll = () => {
    setMatrix([])
    setNodes([])
    setEdges([])
    setFileContent('')
    setAlgorithm('Choose a algorithm')
    setDirect('Choose a direct')
    setNodeStart('Start node')
    setHasNegativeWeights(false)
    setDistances([])
    setPreviousVertices([])
    setEdgeList([])
    setLoading(false)
    setExecuteTime(0)
    setError(null)
    setOnRun(false)
  }

  const handleRunAlgorithm = () => {
    console.log(algorithm)
    switch (algorithm) {
      case 'dijkstra':
        try {
          const { distances, previousVertices, edgeList, executionTime } = Dijkstra(edges, nodeStart, direct, hasNegativeWeights);
          console.log(distances, previousVertices, edgeList)
          setDistances(distances)
          setPreviousVertices(previousVertices)
          setEdgeList(edgeList)
          setExecuteTime(executionTime)
          setOnRun(true)
        } catch (e) {
          setError(e)
        }
        break;
      case 'bellman-ford':
        const { distances, previousVertices, edgeList, executionTime } = BellmanFord(edges,nodes.length, nodeStart, direct);
          console.log(distances, previousVertices, edgeList, executionTime)
        break;
      default:
        toast.error('Chưa chọn thuật toán!', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        })
    }
  }

  // Upload File
  const handleFileRead = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target.result
      setFileContent(content)
      const parsedMatrix = content.trim().split('\n').map(row => row.trim().split(' ').map(Number))
      const { isMatrix, hasNegativeWeights } = validateMatrix(parsedMatrix)
      console.log("Is matrix: ", isMatrix)
      if (isMatrix) {
        setMatrix(parsedMatrix)
        toast.dismiss()
        toast.success('Ma trận hợp lệ!', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      } else {
        toast.dismiss()
        toast.error('Ma trận không hợp lệ!', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        message.error('Invalid matrix')
      }
      setHasNegativeWeights(hasNegativeWeights)
      message.success(`${file.name} file read successfully`)
    }
    reader.onerror = (e) => {
      message.error(`Failed to read file: ${e.target.error.code}`)
    }
    reader.readAsText(file)
    return false  // Prevent upload
  }

  const UploadProps = {
    beforeUpload: file => {
      if (!file || file.size === 0) {
        toast.dismiss()
        toast.error('File does not exist or is empty!', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        return Upload.LIST_IGNORE
      }
      const isTxt = file.type === 'text/plain' && file.name.endsWith('.txt')
      if (!isTxt) {
        toast.dismiss()
        toast.error('Chỉ cho phép file .txt!', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        return Upload.LIST_IGNORE
      }
      return handleFileRead(file)
    },
    accept: '.txt',  // Accept only .txt files
    maxCount: 1,  // Accept only one file
    onRemove: () => setFileContent('')  // Clear content when file is removed
  }

  const handleDeleteNode = () => {
    // Implement delete node logic here
    setNodes(nodes.filter(node => node.id !== selectedNode.id))
    setEdges(edges.filter(edge => edge.source !== selectedNode.id && edge.target !== selectedNode.id))
    setSelectedNode(null)
  }

  const handleDeleteEdge = () => {
    // Implement delete edge logic here
    setEdges(edges.filter(edge => edge.id !== selectedEdge.id))
    setSelectedEdge(null)
  }

  return (
    <div className="w-screen h-50 bg-black fixed z-10 flex justify-between items-center px-5 py-5 text-white">
      <div className='flex gap-2'>
        <div>
          <Upload {...UploadProps} >
            <Button className='custom-button' icon={<UploadOutlined />}>Click to Upload and Read .txt File</Button>
          </Upload>
          <div>
            <h3 className="">File Content:</h3>
            <textarea className='rounded-md min-h-24' value={fileContent || ""} readOnly disabled style={{ width: '100%', height: '100px' }} />
          </div>
        </div>
        <div className='flex gap-2'>
          {selectedNode && (
            <Card
              title={`Node ${selectedNode.id}`}
              extra={
                <button onClick={handleDeleteNode} className=' text-black hover:text-opacity-15'>delete</button>
              }
              style={{
                width: 165,
                maxHeight: 195
              }}
              size="small"
            >
              <p>ID: {selectedNode.id}</p>
              <p>Label: {selectedNode.data.label}</p>
            </Card>
          )}
          {selectedEdge && (
            <Card
              title={`Edge ${selectedEdge.id}`}
              extra={
                <button onClick={handleDeleteEdge} className=' text-black hover:text-opacity-15'>delete</button>
              }
              style={{
                width: 165,
                maxHeight: 195
              }}
              size="small"
            >
              <p>ID: {selectedEdge.id}</p>
              <p>Source: {selectedEdge.source}</p>
              <p>Target: {selectedEdge.target}</p>
              <p>Weight: {selectedEdge.weight}</p>
            </Card>
          )}
        </div>
      </div>
      <div>
        {algorithm === 'dijkstra' && onRun && !error &&
          <div className='flex gap-2'>
            <Card
              title={`Distances from Node ${nodeStart}`}
              style={{
                minWidth: 165,
                maxHeight: 195,
                overflow: 'auto'
              }}
              size="small"
            >
              {distances.map((dist, i) => {
                return <p key={i}>Node {dist.vertex}, Distance: {dist.distance}</p>
              })}
            </Card>
            <Card
              title={`Previous Vertices`}
              style={{
                minWidth: 165,
                maxHeight: 195,
                overflow: 'auto'
              }}
              size="small"
            >
              {previousVertices.map((previous, i) => {
                if (previous.previous) {
                  return <p key={i}>Node {previous.vertex}, Distance: {previous.previous}</p>
                }
              })}
            </Card>
            <Card
              title={`List edges shortest path`}
              style={{
                minWidth: 165,
                maxHeight: 195,
                overflow: 'auto'
              }}
              size="small"
            >
              {edgeList.map((edge, i) => {
                if (edge) {
                  return <p key={i}>Edge {edge}</p>
                }
              })}
            </Card>
          </div>

        }
      </div>
      <div className='flex gap-2 w-fit'>
        <Select
          className='custom-select'
          value={direct}
          style={{
            width: 180,
          }}
          onChange={handleChangeDirect}
          options={[
            {
              value: 'directed',
              label: 'Directed Graph',
            },
            {
              value: 'undirected',
              label: 'Undirected Graph',
            },
          ]}
        />
        <Select
          className='custom-select'
          value={algorithm}
          style={{
            width: 180,
          }}
          onChange={handleChangeAlgorithm}
          options={[
            {
              value: 'dijkstra',
              label: 'Dijkstra',
            },
            {
              value: 'bellman-ford',
              label: 'Bellman-Ford',
            },
            {
              value: 'floyd-warshall',
              label: 'Floyd-Warshall',
            },
            {
              value: 'a*',
              label: 'A* Algorithm',
            },
            {
              value: 'johnson',
              label: 'Johnson',
            },
          ]}
        />
        {(algorithm === 'dijkstra' || algorithm === 'bellman-ford') && (
          <Select
            className='custom-select node-start'
            style={{
              width: 120,
            }}
            value={nodeStart}
            onChange={handleChangeNodeStart}
            options={nodes.map(node => ({
              value: `${node.id}`,
              label: node.data.label
            }))}
          />)}
        <Button onClick={handleResetAll} className='custom-button'>
          <ReloadOutlined />
        </Button>
        <Button onClick={handleRunAlgorithm} className='custom-button'>
          <CaretRightOutlined />
        </Button>
      </div>
    </div>
  )
}