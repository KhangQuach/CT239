import { toast } from 'react-toastify';

// Hàm tạo ma trận kề từ danh sách cạnh
function createAdjacencyMatrix(edges, numVertices) {
  const matrix = Array.from({ length: numVertices }, () => Array(numVertices).fill(Infinity));
  edges.forEach(edge => {
    const source = parseInt(edge.source) - 1;
    const target = parseInt(edge.target) - 1;
    matrix[source][target] = edge.weight;
  });
  for (let i = 0; i < numVertices; i++) {
    matrix[i][i] = 0;
  }
  return matrix;
}

// Thuật toán Bellman-Ford
function bellmanFord(graph, source) {
  const distances = Array(graph.length).fill(Infinity);
  distances[source] = 0;

  // Relax edges repeatedly
  for (let i = 0; i < graph.length - 1; i++) {
    let update = false;
    for (let u = 0; u < graph.length; u++) {
      for (let v = 0; v < graph.length; v++) {
        if (graph[u][v] !== Infinity && distances[u] + graph[u][v] < distances[v]) {
          distances[v] = distances[u] + graph[u][v];
          update = true;
        }
      }
    }
    if (!update) break; // Stop early if no updates
  }

  // Check for negative weight cycles
  for (let u = 0; u < graph.length; u++) {
    for (let v = 0; v < graph.length; v++) {
      if (graph[u][v] !== Infinity && distances[u] + graph[u][v] < distances[v]) {
        throw new Error('Graph contains a negative weight cycle.');
      }
    }
  }

  return distances;
}

// Thuật toán Dijkstra
function dijkstra(graph, source) {
  const distances = Array(graph.length).fill(Infinity);
  const visited = Array(graph.length).fill(false);
  distances[source] = 0;

  for (let i = 0; i < graph.length; i++) {
    let u = -1;
    for (let j = 0; j < graph.length; j++) {
      if (!visited[j] && (u === -1 || distances[j] < distances[u])) {
        u = j;
      }
    }
    visited[u] = true;

    for (let v = 0; v < graph.length; v++) {
      if (graph[u][v] !== Infinity && distances[u] + graph[u][v] < distances[v]) {
        distances[v] = distances[u] + graph[u][v];
      }
    }
  }

  return distances;
}

// Thuật toán Johnson
export default function Johnson(edges, numVertices, direct) {
  if (direct === 'undirected') {
    throw new Error('Johnson algorithm does not support undirected graph.');
  }

  const startTime = performance.now();
  const graph = createAdjacencyMatrix(edges, numVertices);

  let h;
  try {
    h = bellmanFord(graph, numVertices - 1);
  } catch (error) {
    // Display a toast notification and terminate execution
    toast.error('Graph contains a negative weight cycle.', {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return null; // End the function execution
  }

  const newGraph = graph.map((row, u) => row.map((weight, v) => weight + h[u] - h[v]));
  const distances = Array.from({ length: numVertices }, (_, u) => dijkstra(newGraph, u));
  const endTime = performance.now();
  const executionTime = endTime - startTime;

  return { distances, executionTime };
}