/**
 * Minimum Spanning Tree (MST) using Prim's Algorithm
 * ======================================================
 *
 * This function computes the MST of a weighted undirected graph.
 *
 * Inputs:
 *  - vertices: Array of vertex labels, e.g., ["A", "B", "C"]
 *  - graph: 2D array of edge weights
 *      • graph[i][j] = weight of edge between vertices[i] and vertices[j]
 *      • 0 if no edge exists
 *
 * Outputs:
 *  - Array of edges included in the MST
 *      Each edge is an object: { from, to, weight }
 *
 * Technique:
 *  - Prim's algorithm
 *  - Greedy selection of the smallest weight edge connecting visited to unvisited vertex
 *
 * Time Complexity:
 *  - O(V^2) using adjacency matrix
 *
 * Space Complexity:
 *  - O(V + E)
 *
 * Notes:
 *  - This version works for dense graphs
 *  - Uses simple arrays, no priority queue (heap) optimization
 */

function primMST(vertices, graph) {
    const n = vertices.length;
    const visited = Array(n).fill(false);
    const mstEdges = [];

    visited[0] = true; // start from first vertex
    let edgesCount = 0;

    while (edgesCount < n - 1) {
        let minWeight = Number.MAX_SAFE_INTEGER;
        let from = -1;
        let to = -1;

        for (let i = 0; i < n; i++) {
            if (visited[i]) {
                for (let j = 0; j < n; j++) {
                    if (!visited[j] && graph[i][j] > 0 && graph[i][j] < minWeight) {
                        minWeight = graph[i][j];
                        from = i;
                        to = j;
                    }
                }
            }
        }

        if (to !== -1) {
            visited[to] = true;
            edgesCount++;

            mstEdges.push({
                from: vertices[from],
                to: vertices[to],
                weight: minWeight
            });
        } else {
            // No more edges to process
            break;
        }
    }

    return mstEdges;
}

/**
 * Utility function to print MST edges in readable format
 * @param {Array} mstEdges - array of {from, to, weight}
 */
function printMST(mstEdges) {
    console.log("Minimum Spanning Tree:");
    mstEdges.forEach(edge => {
        console.log(`${edge.from} -> ${edge.to} | Weight: ${edge.weight}`);
    });
}

// ------------------------ Example Usage ------------------------
const vertices = ['A', 'B', 'C', 'D', 'E', 'F'];
const graph = [
    [0, 6.7, 5.2, 2.8, 5.6, 3.6],
    [6.7, 0, 5.7, 7.3, 5.1, 3.2],
    [5.2, 5.7, 0, 3.4, 8.5, 4.0],
    [2.8, 7.3, 3.4, 0, 8.0, 4.4],
    [5.6, 5.1, 8.5, 8.0, 0, 4.6],
    [3.6, 3.2, 4.0, 4.4, 4.6, 0]
];

const mstEdges = primMST(vertices, graph);
printMST(mstEdges);
