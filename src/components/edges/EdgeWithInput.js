import { useEffect, useState } from 'react';
import { BaseEdge, getStraightPath } from '@xyflow/react';

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY, source, target, weight }) {
  useEffect(() => {
    setCustomWeight(weight);
  }, []);
  const [customWeight, setCustomWeight] = useState();
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const handleWeightChange = (event) => {
    setCustomWeight(event.target.value);
  };

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <foreignObject width="100" height="30" x={(sourceX + targetX) / 2} y={(sourceY + targetY) / 2}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input
            type="text"
            value={customWeight}
            onChange={handleWeightChange}
            placeholder="Weight"
            style={{ width: '50px', textAlign: 'center' }}
          />
          <span>{`e${source}-${target}`}</span>
        </div>
      </foreignObject>
    </>
  );
}