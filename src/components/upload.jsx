'use client'
import React, { useState } from 'react'
import { Upload, Button, message, Alert  } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const TextFileReader = () => {
  const [fileContent, setFileContent] = useState(null)
  console.log(fileContent)

  const handleFileRead = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setFileContent(e.target.result)
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
        message.error('Only TXT files are allowed!');
        return Upload.LIST_IGNORE;
      }
      return handleFileRead(file);
    },
    accept: '.txt',  // Accept only .txt files
    onRemove: () => setFileContent('')  // Clear content when file is removed
  }

  return (
    <div className=''>
      <Upload {...props} >
        <Button className='custom-button' icon={<UploadOutlined />}>Click to Upload and Read .txt File</Button>
      </Upload>
      <div>
        <h3 className="">File Content:</h3>
        <textarea className='rounded-md' value={fileContent || ""} readOnly disabled style={{ width: '150%', height: '100px' }} />
      </div>
    </div>
  )
}

export default TextFileReader
