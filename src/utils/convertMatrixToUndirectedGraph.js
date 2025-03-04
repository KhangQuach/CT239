export default function convertMatrixToUndirectedGraph(matrix) {
  const initialNodes = [];
  const initialEdges = [];

  // Tạo nút cho mỗi hàng của ma trận
  matrix.forEach((row, index) => {
    initialNodes.push({
      id: String(index + 1),
      data: { label: `Node ${index + 1}` },
      position: { x: 100 + index * 100, y: 300 + index * 100 }  // Ví dụ về vị trí, có thể tùy chỉnh
    });
  });

  // Tạo cạnh dựa trên giá trị khác không trong ma trận và chỉ thêm một lần cho mỗi cặp nút
  matrix.forEach((row, sourceIndex) => {
    row.forEach((value, targetIndex) => {
      if (value !== 0 && sourceIndex < targetIndex) { // Chỉ xét khi giá trị khác không và chỉ số nguồn nhỏ hơn chỉ số đích
        initialEdges.push({
          id: `e${sourceIndex + 1}-${targetIndex + 1}`,
          source: String(sourceIndex + 1),
          target: String(targetIndex + 1),
          weight: value,
          label: `${value}`, // Thêm trọng số vào nhãn cạnh
          type: 'straight', // Đặt loại cạnh mặc định, có thể tùy chỉnh
        });
      }
    });
  });

  return { initialNodes, initialEdges };
}
