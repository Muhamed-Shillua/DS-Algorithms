/**
 * @class HeapNode
 * @description Represents a node in Huffman Tree
 */
class HeapNode {
    constructor(char, freq) {
        this.char = char;   // Character (null for internal nodes)
        this.freq = freq;   // Frequency
        this.left = null;
        this.right = null;
    }
}
module.exports = HeapNode;

