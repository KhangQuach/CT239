class PriorityQueue {
    constructor() {
        this.nodes = [];
    }

    enqueue(priority, key) {
        const node = { key, priority };
        this.nodes.push(node);
        this.nodes.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.nodes.shift().key;
    }

    isEmpty() {
        return this.nodes.length === 0;
    }
}

export default function Dijkstra(edges, startVertex, direct, hasNegativeWeights) {
    const startTime = performance.now();

    if (hasNegativeWeights) {
        toast.dismiss();
        toast.error('Đồ thị chứa trọng số âm!', {
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
        throw new Error('Dijkstra algorithm does not support negative weights.');
    }

    // Build adjacency list
    const adjacencyList = edges.reduce((acc, edge) => {
        acc[edge.source] = acc[edge.source] || [];
        acc[edge.source].push({ node: edge.target, weight: edge.weight });
        if (direct === 'undirected') {
            acc[edge.target] = acc[edge.target] || [];
            acc[edge.target].push({ node: edge.source, weight: edge.weight });
        }
        return acc;
    }, {});

    const distances = {};
    const previousVertices = {};
    const priorityQueue = new PriorityQueue();

    // Initialize distances and previous vertices
    for (const edge of edges) {
        distances[edge.source] = Infinity;
        distances[edge.target] = Infinity;
        previousVertices[edge.source] = null;
        previousVertices[edge.target] = null;
    }

    distances[startVertex] = 0;
    priorityQueue.enqueue(0, startVertex);

    // Process the priority queue
    while (!priorityQueue.isEmpty()) {
        const currentVertex = priorityQueue.dequeue();

        (adjacencyList[currentVertex] || []).forEach(neighbor => {
            const newPath = distances[currentVertex] + neighbor.weight;
            if (newPath < distances[neighbor.node]) {
                distances[neighbor.node] = newPath;
                previousVertices[neighbor.node] = currentVertex;
                priorityQueue.enqueue(newPath, neighbor.node);
            }
        });
    }

    // Format distances and previousVertices into the desired structure
    const formattedDistances = Object.keys(distances).map(key => ({
        vertex: key,
        distance: distances[key],
    }));

    const formattedPreviousVertices = Object.keys(previousVertices).map(key => ({
        vertex: key,
        previous: previousVertices[key],
    }));

    // Create edge list from previous vertices
    const edgeList = formattedPreviousVertices
        .filter(node => node.previous !== null)
        .map(node => `e${node.previous}-${node.vertex}`);

    const endTime = performance.now();
    const executionTime = endTime - startTime;

    return {
        distances: formattedDistances,
        previousVertices: formattedPreviousVertices,
        edgeList,
        executionTime,
    };
}