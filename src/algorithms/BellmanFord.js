export default function BellmanFord(edges, numVertices, source, direct) {
    if (direct === 'undirected') {
        throw new Error('Bellman-Ford algorithm does not support undirected graph.');
    }
    const startTime = performance.now();
    // Khởi tạo mảng khoảng cách và mảng đỉnh trước
    const distances = Array(numVertices).fill(Infinity).map((_, index) => ({
        vertex: (index + 1).toString(),
        distance: Infinity
    }));
    const previousVertices = Array(numVertices).fill(null).map((_, index) => ({
        vertex: (index + 1).toString(),
        previous: null
    }));
    distances[source].distance = 0;

    // Lặp qua tất cả các đỉnh, trừ một lần cuối cùng
    for (let i = 0; i < numVertices - 1; i++) {
        let update = false;
        for (const edge of edges) {
            // Lấy thông tin của từng cạnh
            let u = parseInt(edge.source) - 1; // Chuyển đổi từ chuỗi sang số và điều chỉnh chỉ số
            let v = parseInt(edge.target) - 1; // Chuyển đổi từ chuỗi sang số và điều chỉnh chỉ số
            let weight = edge.weight;

            // Cập nhật khoảng cách nếu tìm thấy đường đi ngắn hơn
            if (distances[u].distance !== Infinity && distances[u].distance + weight < distances[v].distance) {
                distances[v].distance = distances[u].distance + weight;
                previousVertices[v].previous = (u + 1).toString();
                update = true;
            }
        }
        // Nếu không có cập nhật nào trong lần lặp này, dừng sớm
        if (!update) break;
    }

    // Kiểm tra chu trình trọng số âm
    for (const edge of edges) {
        let u = parseInt(edge.source) - 1;
        let v = parseInt(edge.target) - 1;
        let weight = edge.weight;
        if (distances[u].distance !== Infinity && distances[u].distance + weight < distances[v].distance) {
            console.error("Graph contains a negative weight cycle");
            return null;
        }
    }

    const edgeList = previousVertices.map((node, index) => {
        if (node.previous) {
            return `e${node.previous}-${node.vertex}`;
        }
        return null;
    }).filter(edge => edge !== null);

    const endTime = performance.now();
    const executionTime = endTime - startTime;
    return { distances, previousVertices, edgeList, executionTime };
}