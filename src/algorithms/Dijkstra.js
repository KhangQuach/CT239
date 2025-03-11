
class PriorityQueue {
    constructor() {
        this.nodes = [];
    }

    enqueue(priority, key) {
        this.nodes.push({ key, priority });
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
    if (hasNegativeWeights) {
        throw new Error('Dijkstra algorithm does not support negative weights.');
    }
    const adjacencyList = edges.reduce((acc, edge) => {
        acc[edge.source] = acc[edge.source] || [];
        acc[edge.source].push({ node: edge.target, weight: edge.weight });
        if (direct === 'undirected') {
            acc[edge.target] = acc[edge.target] || [];
            acc[edge.target].push({ node: edge.source, weight: edge.weight }); // Thêm cạnh ngược lại cho đồ thị vô hướng
        }
        return acc;
    }, {});

    const distances = {};
    const previousVertices = {};
    const priorityQueue = new PriorityQueue();

    // Initialize distances and priority queue
    for (const edge of edges) {
        distances[edge.source] = Infinity;
        distances[edge.target] = Infinity;
        previousVertices[edge.source] = null;
        previousVertices[edge.target] = null;
    }

    distances[startVertex] = 0;
    priorityQueue.enqueue(0, startVertex);

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
    
    const edgeList = [];
    // Loop over all vertices in previousVertices
    for (const target in previousVertices) {
        const source = previousVertices[target];
        if (source) {
            // Find the edge connecting the source to the target
            const edge = edges.find(edge => edge.source === source && edge.target === target);
            if (edge) {
                edgeList.push(edge.id);
            }
        }
    }

    return { distances, previousVertices, edgeList };
}



