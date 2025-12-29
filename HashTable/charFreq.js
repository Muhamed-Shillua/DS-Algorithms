/**
 * ============================================================
 * Character Frequency Analyzer
 * ============================================================
 *
 * Purpose:
 * --------
 * Analyze a string and calculate the frequency of each character.
 * The class provides two different approaches:
 *
 * 1) ASCII-Based Frequency Counting
 *    - Uses a fixed-size array indexed by ASCII codes.
 *    - Very fast and memory-efficient.
 *    - Limited to standard ASCII characters.
 *
 * 2) Map-Based Frequency Counting (Any Character Set)
 *    - Uses JavaScript Map for dynamic character storage.
 *    - Supports all Unicode characters.
 *
 * After counting, characters are sorted by frequency
 * using the Merge Sort algorithm.
 *
 * ============================================================
 * Algorithms Used:
 * ============================================================
 *
 * 1) Frequency Counting
 *    - Traverse the string once.
 *    - Increment frequency for each character.
 *
 * 2) Merge Sort
 *    - Divide & Conquer sorting algorithm.
 *    - Recursively splits the array.
 *    - Merges sorted subarrays based on frequency.
 *
 * ============================================================
 * Time & Space Complexity:
 * ============================================================
 *
 * ASCII Method:
 * - Time:  O(n)
 * - Space: O(1)  (fixed-size array)
 *
 * Map Method:
 * - Time:  O(n log n)
 * - Space: O(n)
 *
 * ============================================================
 */

class CharFreq {

    /**
     * ------------------------------------------------------------
     * ASCII-Based Frequency Method
     * ------------------------------------------------------------
     *
     * Counts character frequency using ASCII indexing.
     *
     * @param {string} message
     * @returns {Array<{char: string, freq: number}>}
     *
     * Notes:
     * - Only works for ASCII characters (0–126).
     * - Faster and more memory-efficient than Map-based method.
     */
    ASCIIMethod(message) {
        const freq = new Array(127).fill(0);
        const results = [];

        // Count frequency using ASCII codes
        for (let i = 0; i < message.length; i++) {
            const code = message.charCodeAt(i);
            if (code < 127) {
                freq[code]++;
            }
        }

        // Convert frequency array to result format
        for (let i = 0; i < freq.length; i++) {
            if (freq[i] > 0) {
                results.push({
                    char: String.fromCharCode(i),
                    freq: freq[i]
                });
            }
        }

        return results;
    }

    /**
     * ------------------------------------------------------------
     * Map-Based Frequency Method (Any Character Set)
     * ------------------------------------------------------------
     *
     * Counts frequency using a Map to support Unicode characters.
     *
     * @param {string} message
     * @returns {Array<{char: string, freq: number}>}
     */
    anyCodeMethod(message) {
        const freqMap = new Map();

        // Count frequency using Map
        for (let i = 0; i < message.length; i++) {
            const ch = message[i];
            freqMap.set(ch, (freqMap.get(ch) || 0) + 1);
        }

        return this.sortMap(freqMap);
    }

    /**
     * ------------------------------------------------------------
     * Convert Map to Array and Sort by Frequency
     * ------------------------------------------------------------
     *
     * @param {Map<string, number>} freqMap
     * @returns {Array<{char: string, freq: number}>}
     */
    sortMap(freqMap) {
        const freqArray = [];

        // Convert Map entries to array
        for (let [char, freq] of freqMap) {
            freqArray.push([char, freq]);
        }

        // Sort by frequency using Merge Sort
        this.mergeSort(freqArray, 0, freqArray.length - 1);

        // Convert to final output format
        return freqArray.map(([char, freq]) => ({ char, freq }));
    }

    /**
     * ------------------------------------------------------------
     * Merge Sort Algorithm
     * ------------------------------------------------------------
     *
     * Sorts an array based on character frequency.
     *
     * @param {Array<[string, number]>} array
     * @param {number} start
     * @param {number} end
     */
    mergeSort(array, start, end) {
        if (start >= end) return;

        const mid = Math.floor((start + end) / 2);
        this.mergeSort(array, start, mid);
        this.mergeSort(array, mid + 1, end);
        this.merge(array, start, mid, end);
    }

    /**
     * Merge step of Merge Sort
     */
    merge(array, start, mid, end) {
        const left = array.slice(start, mid + 1);
        const right = array.slice(mid + 1, end + 1);

        let i = 0, j = 0, k = start;

        // Merge two sorted subarrays
        while (i < left.length && j < right.length) {
            if (left[i][1] <= right[j][1]) {
                array[k++] = left[i++];
            } else {
                array[k++] = right[j++];
            }
        }

        // Copy remaining elements
        while (i < left.length) array[k++] = left[i++];
        while (j < right.length) array[k++] = right[j++];
    }
}
