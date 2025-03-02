function generateRandomUndirectedAdjacencyMatrix(size, maxWeight = 10) {
  // Tạo ma trận kề ban đầu với tất cả các giá trị là 0
  const adjacencyMatrix = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => 0)
  );

  // Điền giá trị ngẫu nhiên cho ma trận đảm bảo tính đối xứng
  for (let i = 0; i < size; i++) {
      for (let j = i + 1; j < size; j++) {
          const weight = Math.floor(Math.random() * (maxWeight + 1));
          adjacencyMatrix[i][j] = weight;
          adjacencyMatrix[j][i] = weight;
      }
  }

  // Đảm bảo không có cạnh từ một đỉnh tới chính nó
  for (let i = 0; i < size; i++) {
      adjacencyMatrix[i][i] = 0;
  }

  return adjacencyMatrix;
}

// Khởi tạo ma trận kề 7x7
const size = 7;
const randomAdjMatrix = generateRandomUndirectedAdjacencyMatrix(size);

// In ma trận kề
console.log("Random Undirected Adjacency Matrix 7x7:");
randomAdjMatrix.forEach(row => console.log(row.join(' ')));
