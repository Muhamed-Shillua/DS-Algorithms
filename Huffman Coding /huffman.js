/**
 * ============================================================
 * Huffman Coding Implementation
 * ============================================================
 */

const PriorityQueue = require("./PriorityQueue");
const Node = require("./Node");

class Huffman {
    constructor(message) {
        this.message = message;
        this.codes = new Map();
        this.reverseCodes = new Map();
        this.INTERNAL = null;

        this.build();
    }

    /**
     * Build Huffman Tree and Codes
     */
    build() {
        const freqMap = this.buildFrequencyMap();
        const root = this.buildHuffmanTree(freqMap);
        this.generateCodes(root, "");
    }

    /**
     * Step 1: Frequency Map
     */
    buildFrequencyMap() {
        const freqMap = new Map();

        for (const ch of this.message) {
            freqMap.set(ch, (freqMap.get(ch) || 0) + 1);
        }
        return freqMap;
    }

    /**
     * Step 2 & 3: Build Huffman Tree using Priority Queue
     */
    buildHuffmanTree(freqMap) {
        const pq = new PriorityQueue();

        for (const [char, freq] of freqMap) {
            pq.enqueue(freq, new Node(char, freq));
        }

        while (pq.size() > 1) {
            const [, left] = pq.dequeue();
            const [, right] = pq.dequeue();

            const parent = new Node(this.INTERNAL, left.freq + right.freq);
            parent.left = left;
            parent.right = right;

            pq.enqueue(parent.freq, parent);
        }

        return pq.dequeue()[1];
    }

    /**
     * Step 4: Generate Huffman Codes (DFS)
     */
    generateCodes(node, code) {
        if (!node) return;

        if (node.char !== this.INTERNAL) {
            this.codes.set(node.char, code);
            this.reverseCodes.set(code, node.char);
            return;
        }

        this.generateCodes(node.left, code + "0");
        this.generateCodes(node.right, code + "1");
    }

    /**
     * Encode original message to binary string
     */
    encode() {
        let encoded = "";
        for (const ch of this.message) {
            encoded += this.codes.get(ch);
        }
        return encoded;
    }

    /**
     * Decode binary string back to original message
     */
    decode(encodedString) {
        let decoded = "";
        let buffer = "";

        for (const bit of encodedString) {
            buffer += bit;
            if (this.reverseCodes.has(buffer)) {
                decoded += this.reverseCodes.get(buffer);
                buffer = "";
            }
        }
        return decoded;
    }

    /**
     * Print Huffman Codes
     */
    printCodes() {
        console.table(
            [...this.codes].map(([char, code]) => ({ char, code }))
        );
    }
}

module.exports = Huffman;
