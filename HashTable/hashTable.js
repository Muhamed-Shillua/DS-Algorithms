/**
 * =============================================================================
 *  HashTable Implementation (Chaining)
 * =============================================================================
 *
 *  FEATURES:
 *  ----------
 *  - Collision handling using Chaining (each bucket stores KeyValuePair objects)
 *  - FNV-1A hashing (32-bit — fast and low-collision)
 *  - Auto-resize when load factor exceeds 0.75
 *  - Fully documented with JSDoc
 *  - Private fields & private methods (#field)
 *  - Iterator support (for...of)
 *  - Utilities: keys(), values(), entries(), size(), contains()
 *  - Strict validation for inputs (defensive programming)
 *
 *  Author: Muhamed Shillua
 * =============================================================================
 */

/**
 * Represents a single key-value entry stored inside a hash bucket.
 */
class KeyValuePair {
  /**
   * @param {string} key
   * @param {*} value
   */
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

class HashTable {
  /** @private */ #buckets;
  /** @private */ #capacity;
  /** @private */ #count;

  /**
   * Creates a new chaining-based HashTable.
   *
   * @param {number} initialSize - must be a positive integer
   */
  constructor(initialSize = 5) {
    if (!Number.isInteger(initialSize) || initialSize <= 0) {
      throw new Error("initialSize must be a positive integer");
    }

    this.#capacity = initialSize;
    this.#buckets = Array.from({ length: initialSize }, () => []);
    this.#count = 0;
  }

  // ===========================================================================
  //                               PRIVATE METHODS
  // ===========================================================================

  /**
   * FNV-1A hash (32-bit)
   * @private
   * @param {string} key
   * @returns {number} index
   */
  #hash(key) {
    const FNV_OFFSET = 2166136261;
    const FNV_PRIME = 16777619;

    let hash = FNV_OFFSET;

    for (let i = 0; i < key.length; i++) {
      hash ^= key.charCodeAt(i);
      hash = (hash * FNV_PRIME) >>> 0;
    }

    return hash % this.#capacity;
  }

  /**
   * @private
   * @returns {number} load factor (0 → 1)
   */
  #loadFactor() {
    return this.#count / this.#capacity;
  }

  /**
   * Doubles the capacity and rehashes all existing entries.
   * @private
   */
  #resize() {
    const oldBuckets = this.#buckets;

    this.#capacity *= 2;
    this.#buckets = Array.from({ length: this.#capacity }, () => []);
    this.#count = 0;

    for (const bucket of oldBuckets) {
      for (const pair of bucket) {
        this.set(pair.key, pair.value);
      }
    }
  }

  // ===========================================================================
  //                               PUBLIC METHODS
  // ===========================================================================

  /**
   * Stores or updates a key-value pair.
   *
   * @param {string} key - must be string
   * @param {*} value
   */
  set(key, value) {
    if (typeof key !== "string") {
      throw new Error("HashTable only supports string keys");
    }

    if (this.#loadFactor() >= 0.75) {
      this.#resize();
    }

    const index = this.#hash(key);
    const bucket = this.#buckets[index];

    // Update if exists
    for (const pair of bucket) {
      if (pair.key === key) {
        pair.value = value;
        return;
      }
    }

    // Insert new element
    bucket.push(new KeyValuePair(key, value));
    this.#count++;
  }

  /**
   * Retrieves a value by key.
   * @param {string} key
   * @returns {* | undefined}
   */
  get(key) {
    if (typeof key !== "string") return undefined;

    const index = this.#hash(key);
    const bucket = this.#buckets[index];

    for (const pair of bucket) {
      if (pair.key === key) return pair.value;
    }

    return undefined;
  }

  /**
   * Checks if a key exists.
   * @param {string} key
   * @returns {boolean}
   */
  contains(key) {
    return this.get(key) !== undefined;
  }

  /**
   * Removes key-value pair if exists.
   * @param {string} key
   * @returns {boolean} - true if removed
   */
  remove(key) {
    if (typeof key !== "string") return false;

    const index = this.#hash(key);
    const bucket = this.#buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        this.#count--;
        return true;
      }
    }
    return false;
  }

  /**
   * @returns {number} total stored entries
   */
  size() {
    return this.#count;
  }

  /**
   * @returns {string[]} all keys
   */
  keys() {
    const out = [];
    for (const bucket of this.#buckets) {
      for (const pair of bucket) out.push(pair.key);
    }
    return out;
  }

  /**
   * @returns {Array<*>} all values
   */
  values() {
    const out = [];
    for (const bucket of this.#buckets) {
      for (const pair of bucket) out.push(pair.value);
    }
    return out;
  }

  /**
   * @returns {Array<[string, *]>}
   */
  entries() {
    const out = [];
    for (const bucket of this.#buckets) {
      for (const pair of bucket) out.push([pair.key, pair.value]);
    }
    return out;
  }

  /**
   * @returns {string}
   */
  toString() {
    return JSON.stringify(this.entries(), null, 2);
  }

  // ===========================================================================
  //                           ITERATOR SUPPORT
  // ===========================================================================

  /**
   * Enables: `for (const [k, v] of table)`
   * @returns {Iterator<[string, *]>}
   */
  *[Symbol.iterator]() {
    for (const bucket of this.#buckets) {
      for (const pair of bucket) yield [pair.key, pair.value];
    }
  }
}

module.exports = HashTable;
