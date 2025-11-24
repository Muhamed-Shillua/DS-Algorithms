/**
 * Class representing a node in a binary tree.
 */
class TreeNode {
    /**
     * Constructs a new TreeNode with the given value.
     * @param {any} data - The value to store in the node.
     */
    constructor(data) {
        /** @type {any} The value stored in the node */
        this.data = data;

        /** @type {TreeNode|null} Pointer to the left child node */
        this.left = null;

        /** @type {TreeNode|null} Pointer to the right child node */
        this.right = null;
    }
}

/**
 * Class representing a Binary Tree (not necessarily a BST).
 */
module.exports = class BinaryTree {
    /** @type {TreeNode|null} Root node of the binary tree */
    #root;

    /**
     * Constructs an empty BinaryTree.
     */
    constructor() {
        this.#root = null;
    }

    /**
     * Inserts a new value into the tree following level-order (BFS) insertion.
     * @param {any} data - The value to insert into the tree.
     */
    insert(data) {
        const newNode = new TreeNode(data);

        if (!this.#root) {
            this.#root = newNode;
            return;
        }

        const queue = [this.#root];
        while (queue.length) {
            const current = queue.shift();

            if (!current.left) {
                current.left = newNode;
                return;
            } else {
                queue.push(current.left);
            }

            if (!current.right) {
                current.right = newNode;
                return;
            } else {
                queue.push(current.right);
            }
        }
    }

    /**
     * Calculates the height of the tree or a subtree.
     * @param {TreeNode} [node=this.#root] - The node to calculate height from.
     * @returns {number} The height of the tree.
     */
    height(node = this.#root) {
        if (!node) return 0;
        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    /**
     * Performs a pre-order traversal of the tree.
     * @param {TreeNode} [node=this.#root] - Node to start traversal from.
     * @param {any[]} [result=[]] - Array to store traversal result.
     * @returns {any[]} Array of node values in pre-order.
     */
    preOrder(node = this.#root, result = []) {
        if (!node) return result;

        result.push(node.data);
        this.preOrder(node.left, result);
        this.preOrder(node.right, result);

        return result;
    }

    /**
     * Performs an in-order traversal of the tree.
     * @param {TreeNode} [node=this.#root] - Node to start traversal from.
     * @param {any[]} [result=[]] - Array to store traversal result.
     * @returns {any[]} Array of node values in in-order.
     */
    inOrder(node = this.#root, result = []) {
        if (!node) return result;

        this.inOrder(node.left, result);
        result.push(node.data);
        this.inOrder(node.right, result);

        return result;
    }

    /**
     * Performs a post-order traversal of the tree.
     * @param {TreeNode} [node=this.#root] - Node to start traversal from.
     * @param {any[]} [result=[]] - Array to store traversal result.
     * @returns {any[]} Array of node values in post-order.
     */
    postOrder(node = this.#root, result = []) {
        if (!node) return result;

        this.postOrder(node.left, result);
        this.postOrder(node.right, result);
        result.push(node.data);

        return result;
    }

    /**
     * Finds a node with the given value in the tree.
     * @param {any} data - Value to search for.
     * @param {TreeNode} [node=this.#root] - Node to start search from.
     * @returns {TreeNode|null} The node with the given value or null if not found.
     */
    find(data, node = this.#root) {
        if (!node) return null;
        if (node.data === data) return node;

        const leftResult = this.find(data, node.left);
        if (leftResult) return leftResult;

        return this.find(data, node.right);
    }

    /**
     * Deletes a node with the specified value from the tree.
     * Replaces the target node's value with the rightmost node's value, then removes the rightmost node.
     * @param {any} data - Value of the node to delete.
     * @throws {Error} If the node does not exist.
     */
    delete(data) {
        let targetNode = this.find(data);

        if (!targetNode) {
            throw new Error("Node does not exists.");
        } else {
            let lastRightNode = this.#root;
            let parent = null;
            while (lastRightNode.right) {
                parent = lastRightNode;
                lastRightNode = lastRightNode.right;
            }
            targetNode.data = lastRightNode.data;

            if (parent === null) {
                this.#root = null;
            } else {
                parent.right = null;
            }
        }
    }

    /**
     * Prints the binary tree in a visual tree-like structure.
     */
    print() {
        if (!this.#root) return;

        const buildTree = (node) => {
            if (!node) return { lines: [], width: 0, height: 0, middle: 0 };

            const valStr = node.data.toString();
            const left = buildTree(node.left);
            const right = buildTree(node.right);

            const height = Math.max(left.height, right.height) + 2;
            const width = left.width + valStr.length + right.width;
            const middle = left.width + Math.floor(valStr.length / 2);

            const lines = [];

            // Node value line
            let firstLine = " ".repeat(left.width) + valStr + " ".repeat(right.width);
            lines.push(firstLine);

            // Branches line
            let secondLine = "";
            if (left.height > 0) {
                secondLine += " ".repeat(left.width - 1) + "/" + " ".repeat(valStr.length + right.width);
            } else {
                secondLine += " ".repeat(left.width + valStr.length + right.width);
            }

            if (right.height > 0 && left.height === 0) {
                secondLine = secondLine.slice(0, left.width + valStr.length) + "\\" + secondLine.slice(left.width + valStr.length + 1);
            } else if (right.height > 0) {
                secondLine = secondLine.slice(0, left.width + valStr.length + right.width - right.width) + "\\" + secondLine.slice(left.width + valStr.length + right.width - right.width + 1);
            }

            lines.push(secondLine);

            // Merge left and right subtree lines
            for (let i = 0; i < Math.max(left.height, right.height); i++) {
                const leftLine = i < left.lines.length ? left.lines[i] : " ".repeat(left.width);
                const rightLine = i < right.lines.length ? right.lines[i] : " ".repeat(right.width);
                lines.push(leftLine + " ".repeat(valStr.length) + rightLine);
            }

            return { lines, width, height, middle };
        };

        const { lines } = buildTree(this.#root);
        for (const line of lines) {
            console.log(line);
        }
    }
};
