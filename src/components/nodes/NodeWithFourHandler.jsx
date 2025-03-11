import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import styled from 'styled-components';

const NodeContainer = styled.div`
  position: relative;
  width: 150px;
  height: 50px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  text-align: center;
  padding: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  }
  
`;

function NodeWithFourHandler({ data }) {
  return (
    <NodeContainer>
      <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
      <div >
        <label style={{cursor: 'pointer'}} htmlFor="text">{data.label}</label>
      </div>
      <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
    </NodeContainer>
  );
}

export default NodeWithFourHandler;