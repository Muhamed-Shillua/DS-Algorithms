/**
 * A Min-Heap implementation using an array-based binary heap.
 * 
 * The heap always keeps the smallest element at the root.
 * Provides efficient insertion and removal of the minimum value.
 */
module.exports = class Heap {
    /** @type {number[]} Internal array representing heap elements */
    #dataList;

    /** @type {number} Total number of elements in the heap */
    #size;

    /**
     * Creates an empty Min-Heap.
     */
    constructor() {
        this.#dataList = [];
        this.#size = 0;
    }

    /**
     * Inserts a new value into the heap.
     * 
     * - Places the value at the end.
     * - Performs **up-heap** (heapify-up) to restore heap property.
     *
     * @param {number} data - The numeric value to insert.
     */
    insert(data) {
        let index = this.#size;
        this.#dataList[index] = data;
        this.#size++;

        // Move upwards until the heap property is valid
        let parentIndex = Math.floor((index - 1) / 2);

        while (index !== 0 && this.#dataList[index] < this.#dataList[parentIndex]) {
            // Swap with parent
            this.#dataList[index] = this.#dataList[parentIndex];
            this.#dataList[parentIndex] = data;

            index = parentIndex;
            parentIndex = Math.floor((index - 1) / 2);
        }
    }

    /**
     * Removes and returns the smallest element in the heap.
     * 
     * - Replaces the root with the last element.
     * - Performs **down-heap** (heapify-down) to restore heap property.
     * 
     * @returns {number|null} The minimum value or null if heap is empty.
     */
    pop() {
        if (this.#size === 0) return null;

        let index = 0;
        let data = this.#dataList[index];

        // Move last element to root
        this.#dataList[index] = this.#dataList[this.#size - 1];
        this.#dataList[this.#size - 1] = null;
        this.#size--;

        // Heapify down
        let leftIndex = (2 * index) + 1;

        while (leftIndex < this.#size) {
            let rightIndex = leftIndex + 1;
            let smallerIndex = leftIndex;

            if (rightIndex < this.#size && this.#dataList[rightIndex] < this.#dataList[leftIndex]) {
                smallerIndex = rightIndex;
            }

            if (this.#dataList[smallerIndex] >= this.#dataList[index]) break;

            // Swap with smallest child
            let temp = this.#dataList[index];
            this.#dataList[index] = this.#dataList[smallerIndex];
            this.#dataList[smallerIndex] = temp;

            index = smallerIndex;
            leftIndex = (2 * index) + 1;
        }

        return data;
    }

    /**
     * Prints the heap visually in a tree-like structure.
     * 
     * - Treats the array-based heap as a binary tree.
     * - Recursively builds text lines representing levels and branches.
     * - Useful for debugging and educational visualizations.
     */
    drawTree() {
        if (this.#size === 0) {
            console.log("(empty heap)");
            return;
        }

        const buildTree = (index) => {
            if (index >= this.#size || this.#dataList[index] == null)
                return { lines: [], width: 0, height: 0, middle: 0 };

            const valStr = this.#dataList[index].toString();

            const left = buildTree(2 * index + 1);
            const right = buildTree(2 * index + 2);

            const height = Math.max(left.height, right.height) + 2;
            const width = left.width + valStr.length + right.width;
            const middle = left.width + Math.floor(valStr.length / 2);

            const lines = [];

            // Root value line
            lines.push(" ".repeat(left.width) + valStr + " ".repeat(right.width));

            // Branches line
            let branchLine = "";
            if (left.height > 0) {
                branchLine += " ".repeat(left.middle) + "/" + " ".repeat(width - left.middle - 1);
            } else {
                branchLine += " ".repeat(width);
            }

            if (right.height > 0) {
                const pos = left.width + valStr.length + right.middle;
                branchLine = branchLine.substring(0, pos) + "\\" + branchLine.substring(pos + 1);
            }

            lines.push(branchLine);

            // Merge subtrees level by level
            for (let i = 0; i < Math.max(left.height, right.height); i++) {
                const leftLine = i < left.lines.length ? left.lines[i] : " ".repeat(left.width);
                const rightLine = i < right.lines.length ? right.lines[i] : " ".repeat(right.width);
                lines.push(leftLine + " ".repeat(valStr.length) + rightLine);
            }

            return { lines, width, height, middle };
        };

        const { lines } = buildTree(0);
        for (const line of lines) console.log(line);
    }

    /**
     * Returns the heap elements as a plain array.
     * 
     * @returns {number[]} Array of heap values.
     */
    toArray() {
        return this.#dataList.slice(0, this.#size);
    }

    /**
     * Gets the number of elements in the heap.
     * 
     * @returns {number}
     */
    size() {
        return this.#size;
    }

    /**
     * Returns the smallest value without removing it.
     * 
     * @returns {number|null} The min element or null if heap is empty.
     */
    peek() {
        return this.#size > 0 ? this.#dataList[0] : null;
    }
}
