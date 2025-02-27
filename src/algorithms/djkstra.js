export default dijkstra = (graph, startNode) => {
  const nodes = ['1', '2', '3'];
  const edges = [
    { source: '1', target: '2', weight: 1 },  // Giả sử trọng số là 1 cho mỗi cạnh
    { source: '2', target: '3', weight: 1 },
    { source: '3', target: '1', weight: 1 }
  ];

  // Khởi tạo ma trận kề
  const adjacencyMatrix = Array(nodes.length).fill(null).map(() => Array(nodes.length).fill(Infinity));

  // Điền trọng số vào ma trận
  edges.forEach(edge => {
    const srcIndex = nodes.indexOf(edge.source);
    const tgtIndex = nodes.indexOf(edge.target);
    adjacencyMatrix[srcIndex][tgtIndex] = edge.weight;
  });

  // Đặt độ dài từ một nút đến chính nó là 0
  nodes.forEach((_, index) => {
    adjacencyMatrix[index][index] = 0;
  });
  // Tìm đư��ng đi từ nút nguồn đến tất cả các đ��nh
  const distances = [];
  const visited = [];
  const previous = [];
  const numVertices = graph.length;

  // Khởi tạo khoảng cách và đánh dấu tất cả các đỉnh chưa được thăm
  for (let i = 0; i < numVertices; i++) {
    distances[i] = Infinity;
    visited[i] = false;
    previous[i] = null;
  }

  // Đặt khoảng cách từ nút nguồn đến chính nó là 0
  distances[startNode] = 0;

  for (let i = 0; i < numVertices; i++) {
    // Tìm đỉnh chưa thăm có khoảng cách nhỏ nhất
    let minDistance = Infinity;
    let minIndex = -1;

    for (let j = 0; j < numVertices; j++) {
      if (!visited[j] && distances[j] < minDistance) {
        minDistance = distances[j];
        minIndex = j;
      }
    }

    visited[minIndex] = true;

    // Cập nhật khoảng cách cho các đỉnh kề
    for (let j = 0; j < numVertices; j++) {
      if (graph[minIndex][j] !== Infinity && distances[minIndex] + graph[minIndex][j] < distances[j]) {
        distances[j] = distances[minIndex] + graph[minIndex][j];
        previous[j] = minIndex;
      }
    }
  }

  return { distances, previous };
};

const startNode = 0; // Giả sử bắt đầu từ đỉnh '1'
const { distances, previous } = dijkstra(adjacencyMatrix, startNode);

// In kết quả ra console
nodes.forEach((node, index) => {
  console.log(`Minimum distance from ${nodes[startNode]} to ${node} is ${distances[index]}`);
});