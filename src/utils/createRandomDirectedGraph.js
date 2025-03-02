function generateRandomDirectedAdjacencyMatrix(size, maxWeight = 10) {
  // Tạo ma trận kề với các giá trị ngẫu nhiên
  const adjacencyMatrix = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => Math.floor(Math.random() * (maxWeight + 1)))
  );

  // Đảm bảo không có cạnh từ một đỉnh tới chính nó
  for (let i = 0; i < size; i++) {
      adjacencyMatrix[i][i] = 0;
  }

  return adjacencyMatrix;
}

// Khởi tạo ma trận kề 7x7
const size = 7;
const randomAdjMatrix = generateRandomDirectedAdjacencyMatrix(size);

// In ma trận kề
console.log("Random Directed Adjacency Matrix 7x7:");
randomAdjMatrix.forEach(row => console.log(row.join(' ')));