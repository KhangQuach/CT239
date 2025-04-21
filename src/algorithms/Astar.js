import { toast } from 'react-toastify';

export default function AStar(edges, startVertex, goalVertex, direct) {
  const startTime = performance.now();

  // Build adjacency list
  const adjacencyList = edges.reduce((acc, edge) => {
    acc[edge.source] = acc[edge.source] || [];
    acc[edge.source].push({ node: edge.target, weight: edge.weight });
    if (direct === 'undirected') {
      acc[edge.target] = acc[edge.target] || [];
      acc[edge.target].push({ node: edge.source, weight: edge.weight });
    }
    return acc;
  }, {});

  const distances = {};
  const previousVertices = {};
  const openSet = new Set([startVertex]);
  const fScore = {};
  const heuristic = (node) => 0; // Replace with a proper heuristic if needed

  // Initialize distances and fScore
  for (const edge of edges) {
    distances[edge.source] = Infinity;
    distances[edge.target] = Infinity;
    fScore[edge.source] = Infinity;
    fScore[edge.target] = Infinity;
    previousVertices[edge.source] = null;
    previousVertices[edge.target] = null;
  }

  distances[startVertex] = 0;
  fScore[startVertex] = heuristic(startVertex);

  while (openSet.size > 0) {
    // Get the node in openSet with the lowest fScore
    let current = [...openSet].reduce((a, b) => (fScore[a] < fScore[b] ? a : b));

    // If the goal is reached, reconstruct the path
    if (current === goalVertex) {
      const endTime = performance.now();
      const edgeList = Object.keys(previousVertices)
        .filter((key) => previousVertices[key] !== null)
        .map((key) => `e${previousVertices[key]}-${key}`);

      const formattedDistances = Object.keys(distances).map((key) => ({
        vertex: key,
        distance: distances[key],
      }));

      const formattedPreviousVertices = Object.keys(previousVertices).map((key) => ({
        vertex: key,
        previous: previousVertices[key],
      }));

      return {
        distances: formattedDistances,
        previousVertices: formattedPreviousVertices,
        edgeList,
        executionTime: endTime - startTime,
      };
    }

    openSet.delete(current);

    for (const neighbor of adjacencyList[current] || []) {
      const tentativeGScore = distances[current] + neighbor.weight;

      if (tentativeGScore < distances[neighbor.node]) {
        previousVertices[neighbor.node] = current;
        distances[neighbor.node] = tentativeGScore;
        fScore[neighbor.node] = tentativeGScore + heuristic(neighbor.node);
        openSet.add(neighbor.node);
      }
    }
  }

  // If no path is found
  toast.error('No path found!', {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  return null;
}