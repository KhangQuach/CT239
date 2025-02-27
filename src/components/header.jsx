'use client'
import { Button } from 'antd';
import UploadButton from './upload'
import { Select } from 'antd';
import { useState } from 'react';
export default function Header() {
  const [algorithm, setAlgorithm] = useState('Choose a algorithm');
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setAlgorithm(value);
  };
  const handleRunAlgorithm = () =>{
    console.log(algorithm)
  }
  return (
    <div className="w-screen h-50 bg-black fixed z-10 flex justify-between items-center px-5 py-5 text-white">
      <div>
        <UploadButton />
      </div>
      <div className='flex gap-2 w-fit'>
        <Select
          className='custom-select'
          defaultValue={algorithm}
          style={{
            width: 200,
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
        <Button className='custom-button'>Reset</Button>
        <Button onClick={handleRunAlgorithm} className='custom-button'>
          Run
        </Button>
      </div>
    </div>
  )
}