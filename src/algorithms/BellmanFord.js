import { Slide, toast } from 'react-toastify';

export default function BellmanFord(edges, numVertices, source, direct) {
    if (direct === 'undirected') {
        throw new Error('Bellman-Ford algorithm does not support undirected graph.');
    }
    const startTime = performance.now();

    // Initialize distances and previous vertices arrays
    const distances = Array(numVertices).fill(Infinity).map((_, index) => ({
        vertex: (index + 1).toString(),
        distance: Infinity
    }));
    const previousVertices = Array(numVertices).fill(null).map((_, index) => ({
        vertex: (index + 1).toString(),
        previous: null
    }));
    if (distances[source - 1].distance) {
        distances[source - 1].distance = 0; // Adjust source index
    }

    // Relax edges repeatedly
    for (let i = 0; i < numVertices - 1; i++) {
        let update = false;
        for (const edge of edges) {
            const u = parseInt(edge.source) - 1; // Convert to zero-based index
            const v = parseInt(edge.target) - 1; // Convert to zero-based index
            const weight = edge.weight;

            // Update distance if a shorter path is found
            if (distances[u].distance !== Infinity && distances[u].distance + weight < distances[v].distance) {
                distances[v].distance = distances[u].distance + weight;
                previousVertices[v].previous = (u + 1).toString(); // Convert back to one-based index
                update = true;
            }
        }
        // If no update in this iteration, break early
        if (!update) break;
    }

    // Check for negative weight cycles
    for (const edge of edges) {
        const u = parseInt(edge.source) - 1;
        const v = parseInt(edge.target) - 1;
        const weight = edge.weight;
        if (distances[u].distance !== Infinity && distances[u].distance + weight < distances[v].distance) {
            // Display a toast notification and terminate the function
            toast.error('Đồ thị chứa chu trình âm', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Slide,
            });
            return null; // End the function
        }
    }

    // Create edge list from previous vertices
    const edgeList = previousVertices.map((node) => {
        if (node.previous) {
            return `e${node.previous}-${node.vertex}`;
        }
        return null;
    }).filter(edge => edge !== null);

    const endTime = performance.now();
    const executionTime = endTime - startTime;
    return { distances, previousVertices, edgeList, executionTime };
}