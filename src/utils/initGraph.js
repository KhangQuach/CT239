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