function createAdjacencyMatrix(edges) {
    // Determine the number of vertices
    let numVertices = 0;
    edges.forEach(edge => {
        let source = parseInt(edge.source);
        let target = parseInt(edge.target);
        if (source > numVertices) numVertices = source;
        if (target > numVertices) numVertices = target;
    });

    // Create adjacency matrix with initial values as Infinity
    const graph = Array.from({ length: numVertices }, () => Array(numVertices).fill(Infinity));
    for (let i = 0; i < numVertices; i++) {
        graph[i][i] = 0; // Distance from a vertex to itself is 0
    }

    // Fill in the weights in the adjacency matrix
    edges.forEach(edge => {
        const source = parseInt(edge.source) - 1;
        const target = parseInt(edge.target) - 1;
        const weight = edge.weight;
        graph[source][target] = weight;
    });

    return graph;
}

export default function FloydWarshall(graph, direct) {
    if (direct === "undirected") {
        throw new Error("Floyd-Warshall algorithm does not support undirected graph.");
    }
    graph = createAdjacencyMatrix(graph);
    const dist = graph.map(row => [...row]); // Create a copy of the adjacency matrix
    const numVertices = graph.length;

    const startTime = performance.now(); // Start measuring execution time

    // Floyd-Warshall algorithm
    for (let k = 0; k < numVertices; k++) {
        for (let i = 0; i < numVertices; i++) {
            for (let j = 0; j < numVertices; j++) {
                if (dist[i][j] > dist[i][k] + dist[k][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }

    // Check for negative weight cycles
    for (let i = 0; i < numVertices; i++) {
        if (dist[i][i] < 0) {
            // Display a toast notification and terminate the function
            toast.error('Graph contains a negative weight cycle.', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return null; // End the function
        }
    }

    const endTime = performance.now(); // End measuring execution time
    const executionTime = endTime - startTime;

    return { distances: dist, executionTime };
}