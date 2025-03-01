'use client'
import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import convertMatrixToUndirectedGraph from '@/utils/convertMatrixToUndirectedGraph'
import convertMatrixToDirectedGraph from '@/utils/convertMatrixTodirectedGraph'
export default function Header({ setNodes, setEdges }) {
  // Handle run algorithm
  const [algorithm, setAlgorithm] = useState('Choose a algorithm')
  const [direct, setDirect] = useState('Choose a direct')
  const [fileContent, setFileContent] = useState(null)
  const [matrix, setMatrix] = useState([])
  useEffect(() => {
    console.log('Matrix updated:', matrix)
  }, [matrix])

  const handleChangeAlgorithm = (value) => {
    console.log(`selected ${value}`)
    setAlgorithm(value)
  }
  const handleChangeDirect = (value) => {
    setDirect(value)
    switch (value) {
      case "directed":
        // Code to execute if expression === value1
        const directedGraph = convertMatrixToDirectedGraph(matrix)
        console.log('Directed Graph Nodes:', directedGraph.initialNodes)
        console.log('Directed Graph Edges:', directedGraph.initialEdges)
        setNodes(directedGraph.initialNodes)
        setEdges(directedGraph.initialEdges)
        break;
      case "undirected":
        // Code to execute if expression === value2
        const undirectedGraph = convertMatrixToUndirectedGraph(matrix)
        console.log('Undirected Graph Nodes:', undirectedGraph.initialNodes)
        console.log('Undirected Graph Edges:', undirectedGraph.initialEdges)
        setNodes(undirectedGraph.initialNodes)
        setEdges(undirectedGraph.initialEdges)
        break;
      default:
      // Code to execute if no cases match
      console.log('Choose a direct option')
        break;
    }
  }
  const handleRunAlgorithm = () => {
    console.log(algorithm)
  }

  // Upload File
  const handleFileRead = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target.result
      setFileContent(content)
      const parsedMatrix = content.trim().split('\n').map(row => row.trim().split(' ').map(Number))
      console.log('Parsed matrix:', parsedMatrix) // Log parsed matrix
      setMatrix(parsedMatrix)
      message.success(`${file.name} file read successfully`)
    }
    reader.onerror = (e) => {
      message.error(`Failed to read file: ${e.target.error.code}`)
    }
    reader.readAsText(file)
    return false  // Prevent upload
  }

  const props = {
    beforeUpload: file => {
      if (!file.type.includes('text/plain')) {
        message.error('Only TXT files are allowed!')
        return Upload.LIST_IGNORE
      }
      return handleFileRead(file)
    },
    accept: '.txt',  // Accept only .txt files
    onRemove: () => setFileContent('')  // Clear content when file is removed
  }

  return (
    <div className="w-screen h-50 bg-black fixed z-10 flex justify-between items-center px-5 py-5 text-white">
      <div>
        <Upload {...props} >
          <Button className='custom-button' icon={<UploadOutlined />}>Click to Upload and Read .txt File</Button>
        </Upload>
        <div>
          <h3 className="">File Content:</h3>
          <textarea className='rounded-md' value={fileContent || ""} readOnly disabled style={{ width: '100%', height: '100px' }} />
        </div>
      </div>
      <div className='flex gap-2 w-fit'>
        <Select
          className='custom-select'
          defaultValue={algorithm}
          style={{
            width: 200,
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
        <Select
          className='custom-select'
          defaultValue={direct}
          style={{
            width: 200,
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
        <Button className='custom-button'>Reset</Button>
        <Button onClick={handleRunAlgorithm} className='custom-button'>
          Run
        </Button>
      </div>
    </div>
  )
}