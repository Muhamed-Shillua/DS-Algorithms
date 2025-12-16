/**
 * Merge Sort Algorithm
 *
 * Idea:
 * - Uses Divide and Conquer strategy.
 * - Recursively divides the array into halves until each part
 *   contains only one element (already sorted).
 * - Merges sorted subarrays to build the final sorted array.
 *
 * Steps:
 * 1. If the array has 0 or 1 element, return (already sorted).
 * 2. Find the middle index of the array.
 * 3. Recursively apply Merge Sort on the left half.
 * 4. Recursively apply Merge Sort on the right half.
 * 5. Merge the two sorted halves into one sorted array.
 *
 * Time Complexity:
 * - O(n log n) in all cases
 *
 * Space Complexity:
 * - O(n) (uses extra memory for merging)
 *
 * Properties:
 * - Stable sorting algorithm
 * - Not in-place
 */


function merge(array, start, mid, end) {
    // lengths
    const leftLength  = mid - start + 1;
    const rightLength = end - mid;

    // temp arrays
    const left  = new Array(leftLength);
    const right = new Array(rightLength);

    // copy data
    for (let i = 0; i < leftLength; i++) {
        left[i] = array[start + i];
    }

    for (let j = 0; j < rightLength; j++) {
        right[j] = array[mid + 1 + j];
    }

    // merge
    let i = 0, j = 0, k = start;

    while (i < leftLength && j < rightLength) {
        if (left[i] <= right[j]) {
            array[k] = left[i];
            i++;
        } else {
            array[k] = right[j];
            j++;
        }
        k++;
    }

    // remaining elements
    while (i < leftLength) {
        array[k] = left[i];
        i++;
        k++;
    }

    while (j < rightLength) {
        array[k] = right[j];
        j++;
        k++;
    }
}

function mergeSort(array, start, end) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);

    mergeSort(array, start, mid);
    mergeSort(array, mid + 1, end);
    merge(array, start, mid, end);
}

const arr = [38, 27, 43, 3, 9, 82, 10];
mergeSort(arr, 0, arr.length - 1);
console.log(arr);
// [3, 9, 10, 27, 38, 43, 82]

