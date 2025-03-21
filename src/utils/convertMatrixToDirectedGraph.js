import getRandomPosition from "./getRandomPosition";

export default function convertMatrixToDirectedGraph(matrix) {
  const initialNodes = [];
  const initialEdges = [];

  // Create nodes for each row of the matrix
  matrix.forEach((row, index) => {
    initialNodes.push({
      id: String(index + 1),
      data: { label: `Node ${index + 1}` },
      type: 'nodeWithFourHandler',
      position: { x: getRandomPosition(100, 1300), y: getRandomPosition(100, 1300) }
    });
  });

  // Create edges based on non-zero values in the matrix
  matrix.forEach((row, sourceIndex) => {
    row.forEach((value, targetIndex) => {
      if (value !== 0) { // Only create edges for non-zero values
        const offsetX = (sourceIndex - targetIndex) * 10; // Dynamically adjust X offset
        const offsetY = (sourceIndex + targetIndex) * 6; // Dynamically adjust Y offset

        initialEdges.push({
          id: `e${sourceIndex + 1}-${targetIndex + 1}`,
          source: String(sourceIndex + 1),
          target: String(targetIndex + 1),
          weight: value,
          label: `${value}`,
          labelStyle: { fontSize: '16px', fill: 'blue' },
          animated: false,
          labelOffsetX: offsetX, // Dynamically adjust label position
          labelOffsetY: offsetY, // Dynamically adjust label position
          markerEnd: {
            type: 'arrowclosed', // Add an arrow at the target
            color: 'black', // Arrow color,
            width: 16, // Arrow width
            height: 16, // Arrow height
          },
        });
      }
    });
  });

  return { initialNodes, initialEdges };
}