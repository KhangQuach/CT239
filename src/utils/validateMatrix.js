export default function validateMatrix(matrix) {
  const rowCount = matrix.length;
  let hasNegativeWeights = false;
  let isMatrix = true
  if (rowCount === 0) return false; // Không hợp lệ nếu ma trận rỗng
  const columnCount = matrix[0].length;
  if (rowCount !== columnCount) {
    isMatrix = false; // Không hợp lệ nếu ma trận không vuông
  }
  for (let i = 0; i < rowCount; i++) {
    if (matrix[i].length !== columnCount) {
      isMatrix = false; // Không hợp lệ nếu hàng nào đó không đồng nhất về số lượng cột
    }
    for (let j = 0; j < columnCount; j++) {
      if (typeof matrix[i][j] !== 'number' || isNaN(matrix[i][j])) {
        isMatrix = false; // Không hợp lệ nếu phần tử không phải là số
      }
      if (matrix[i][j] < 0) {
        hasNegativeWeights = true; // Kiểm tra nếu có trọng số âm
      }
      if (i === j && matrix[i][j] !== 0) {
        isMatrix = false; // Không hợp lệ nếu phần tử trên đường chéo không bằng 0
      }
    }
  }
  return { isMatrix, hasNegativeWeights }
}