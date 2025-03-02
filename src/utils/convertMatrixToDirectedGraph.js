export default function convertMatrixToDirectedGraph(matrix) {
  const initialNodes = [];
  const initialEdges = [];

  // Tạo nút cho mỗi hàng của ma trận
  matrix.forEach((row, index) => {
    initialNodes.push({
      id: String(index + 1),
      data: { label: `Node ${index + 1}` },
      position: { x: 100 + index * 100, y: 300 + index * 100 }, // Ví dụ về vị trí, có thể tùy chỉnh
    });
  });

  // Tạo cạnh dựa trên giá trị khác không trong ma trận
  matrix.forEach((row, sourceIndex) => {
    row.forEach((value, targetIndex) => {
      if (value !== 0) { // Chỉ tạo cạnh khi giá trị khác không
        initialEdges.push({
          id: `e${sourceIndex + 1}-${targetIndex + 1}`,
          source: String(sourceIndex + 1),
          target: String(targetIndex + 1),
          weight: value,
          label: `${value}`, // Thêm trọng số vào nhãn cạnh
        });
      }
    });
  });

  return { initialNodes, initialEdges };
}