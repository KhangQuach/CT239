export default function isValidJohnsonMatrix(matrix) {
  const rowCount = matrix.length;
  const columnCount = matrix[0].length;

  // Kiểm tra ma trận vuông
  if (rowCount !== columnCount) {
      console.error('Matrix is not square.');
      return false;
  }

  // Kiểm tra tất cả các phần tử phải là số
  for (let i = 0; i < rowCount; i++) {
      if (matrix[i].some(isNaN)) {
          console.error('Matrix contains non-numeric values.');
          return false;
      }

      // Kiểm tra giá trị trên đường chéo là 0
      if (matrix[i][i] !== 0) {
          console.error('Diagonal elements must be zero.');
          return false;
      }
  }

  return true;
}