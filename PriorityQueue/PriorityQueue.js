/**
 * @file PriorityQueue.js
 * @class PriorityQueue
 * @brief A Min-Heap–based Priority Queue implementation.
 * 
 * Stores elements as objects: { priority, data }
 * The smallest priority value is always at the root.
 * 
 * Operations:
 *  - enqueue(priority, data)
 *  - dequeue()
 *  - size()
 *  - hasData()
 *  - print()
 *  - drawTree()
 */

module.exports = class PriorityQueue {
    #dataList;
    #size;

    constructor() {
        this.#dataList = [];
        this.#size = 0;
    }

    /**
     * @brief Insert a new element with a given priority.
     */
    enqueue(priority, data) {
        let index = this.#size;
        this.#dataList[index] = { priority, data };
        this.#size++;

        // Bubble up
        let parentIndex = Math.floor((index - 1) / 2);
        while (
            index !== 0 &&
            this.#dataList[index].priority < this.#dataList[parentIndex].priority
        ) {
            [this.#dataList[index], this.#dataList[parentIndex]] =
                [this.#dataList[parentIndex], this.#dataList[index]];

            index = parentIndex;
            parentIndex = Math.floor((index - 1) / 2);
        }
    }

    /**
     * @brief Remove and return element with the smallest priority.
     * @return [priority, data]  or null if empty
     */
    dequeue() {
        if (this.#size === 0) return null;

        const minNode = this.#dataList[0];
        const result = [minNode.priority, minNode.data];

        this.#dataList[0] = this.#dataList[this.#size - 1];
        this.#dataList[this.#size - 1] = null;
        this.#size--;

        // Bubble down
        let index = 0;
        let left = 1;

        while (left < this.#size) {
            let right = left + 1;
            let smaller = left;

            if (
                right < this.#size &&
                this.#dataList[right].priority < this.#dataList[left].priority
            ) {
                smaller = right;
            }

            if (this.#dataList[smaller].priority >= this.#dataList[index].priority)
                break;

            [this.#dataList[index], this.#dataList[smaller]] =
                [this.#dataList[smaller], this.#dataList[index]];

            index = smaller;
            left = 2 * index + 1;
        }

        return result;
    }

    hasData() {
        return this.#size > 0;
    }

    size() {
        return this.#size;
    }

    /**
     * @brief Print queue as a linear array
     */
    print() {
        let out = "";
        for (let i = 0; i < this.#size; i++) {
            out += `${this.#dataList[i].data}[${this.#dataList[i].priority}]`;
            if (i < this.#size - 1) out += " - ";
        }
        console.log(out);
    }

    /**
     * @brief Draw queue as a tree (visual heap)
     */
    drawTree() {
        if (this.#size === 0) return console.log("(empty)");

        const levels = Math.floor(Math.log2(this.#size)) + 1;

        let index = 0;
        for (let level = 0; level < levels; level++) {
            const nodes = Math.pow(2, level);
            let row = "";

            const indent = " ".repeat((Math.pow(2, levels - level) - 2));
            row += indent;

            for (let n = 0; n < nodes; n++) {
                if (index >= this.#size) break;

                const node = this.#dataList[index];
                row += `${node.data}[${node.priority}]`;

                row += " ".repeat(Math.pow(2, levels - level));
                index++;
            }

            console.log(row);
        }
    }
};
