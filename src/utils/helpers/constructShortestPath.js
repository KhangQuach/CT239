const constructShortestPath = (previousVertices, startVertex, targetVertex) => {
  const path = [];
  let currentNode = targetVertex;

  while (currentNode && currentNode !== startVertex) {
    path.unshift(currentNode); // Add the current node to the path
    currentNode = previousVertices.find(v => v.vertex === currentNode)?.previous;
  }

  if (currentNode === startVertex) {
    path.unshift(startVertex); // Add the start node to the path
  }

  return path;
};

export default constructShortestPath;