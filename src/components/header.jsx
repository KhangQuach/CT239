"use client"
import { Button } from 'antd';
import UploadButton from './upload'
import { Select, Space } from 'antd';
import { useState } from 'react';
export default function Header() {
  const [algorithm, setAlgorithm] = useState('Choose a algorithm');
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setAlgorithm(value);
  };
  return (
    <div className="w-screen h-24 bg-black fixed z-10 flex justify-between items-center px-5">
      <div className=''>
        <UploadButton />
      </div>
      <div className='flex gap-2'>
        <Select
          className='custom-select'
          defaultValue={algorithm}
          style={{
            width: 120,
          }}
          onChange={handleChange}
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
        <Button className='custom-button'>Delete</Button>
        <Button className='custom-button'>
          Run
        </Button>
      </div>
    </div>
  )
}