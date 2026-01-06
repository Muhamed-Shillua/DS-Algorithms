/**
 * Graph Traversal using Breadth-First Search (BFS)
 * ------------------------------------------------
 * 
 * This implementation provides:
 *  - A graph structure with vertices and edges
 *  - BFS traversal from starting vertex
 *  - Returns the order of vertices visited (path)
 * 
 * Time Comlexity:
 *  - O(V + E)
 *      where V = number of vertices
 *            E = number of edges
 * 
 * Space Complexity:
 *  - O(V) for visited array and BFS queue
 * 
 * Notes:
 *  - Graph is implemented as adjacency list using Edge objects
 *  - Supports unweighted edges (Weight defaults to 0)
 */

class Vertex {
    constructor(name) {
        this.name = name;
        this.visited = false;
        this.edges = [];   // array of Edge objects
    }
};
class Edge {
    constructor(source, target, weight = 0) {
        this.source = source;
        this.target = target;
        this.weight = weight;
    }
};

class Graph{
    constructor(vertexNames = []){
        this.vertices= vertexNames.map(name => new Vertex(name));
    }

    /**
     * Add edges from a vertex to multiple target indices
     * @param {number} vertexIndex 
     * @param {number[]} targetIndices 
     */
    addEdge(vertexIndex, targetIndices){
        const sourceVertex = this.vertices[vertexIndex];
        targetIndices.forEach(tagetIndex => {
            const targetVertex = this.vertices[tagetIndex];
            sourceVertex.edges.push(new Edge(sourceVertex, targetVertex));
        });
    }

    /**
     * Perform BFS traversal from the first vertex
     * @returns {Array<string>} Array of edges in the order visited
     */
    breadthFirst(){
        if(!this.vertices.length) return [];

        const pathEdges = [];
        const queue = [];

        // Start BFS from first vertex
        const startVertex = this.vertices[0];
        startVertex.visited = true;
        queue.push(startVertex);

        while(queue.length > 0){
            const currentVertex = queue.shift();
            currentVertex.edges.forEach(edge => {
                if(!edge.target.visited){
                    edge.target.visited = true;
                    queue.push(edge.target);
                    pathEdges.push([currentVertex.name, edge.target.name]);
                }
            });
        }

        // Reset visited for future traversals
        this.vertices.forEach(v => v.visited = false);

        return pathEdges;
    }
};


// ------------------------ Example Usage ------------------------
const graph = new Graph(["A", "B", "C", "D", "E", "F", "G", "H", "I"]);

graph.addEdge(0, [1, 2]);
graph.addEdge(1, [0, 3, 4]);
graph.addEdge(2, [0, 3, 5]);
graph.addEdge(3, [1, 2, 4]);
graph.addEdge(4, [1, 5]);
graph.addEdge(5, [2, 3, 4, 7]);
graph.addEdge(6, [7, 8]);
graph.addEdge(7, [5, 6, 8]);
graph.addEdge(8, [6, 7]);

const bfsPath = graph.breadthFirst();

console.log("BFS Traversal Path:");
bfsPath.forEach(edge => { console.log(`${edge[0]} -> ${edge[1]}`); });
