export default function isValidDijkstraMatrix(matrix) {
  const rowCount = matrix.length;
  const columnCount = matrix[0].length;

  // Kiểm tra ma trận vuông
  if (rowCount !== columnCount) {
      console.error('Matrix is not square.');
      return false;
  }

  // Kiểm tra tất cả các phần tử phải là số và không âm
  for (let i = 0; i < rowCount; i++) {
      for (let j = 0; j < columnCount; j++) {
          if (isNaN(matrix[i][j]) || matrix[i][j] < 0) {
              console.error('Matrix contains invalid (non-numeric or negative) values.');
              return false;
          }
      }

      // Kiểm tra giá trị trên đường chéo là 0
      if (matrix[i][i] !== 0) {
          console.error('Diagonal elements must be zero.');
          return false;
      }
  }

  return true;
}
