export default function isUndirectedMatrix(adjMatrix) {
  const size = adjMatrix.length;

  for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
          if (adjMatrix[i][j] !== adjMatrix[j][i]) {
              return false; // Phát hiện sự không đối xứng, không phải ma trận của đồ thị vô hướng
          }
      }
  }
  return true; // Tất cả các phần tử đối xứng, là ma trận của đồ thị vô hướng
}
