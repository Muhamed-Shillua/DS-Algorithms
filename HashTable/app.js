/**
 * =============================================================================
 *  HashTable (Chaining) — Usage & Testing File
 * =============================================================================
 *  This is a full demo + stress test for the HashTable implementation.
 *  It covers:
 *    - Basic set/get/remove operations
 *    - Updating values
 *    - contains()
 *    - Auto-resizing behavior
 *    - Iteration support (for...of)
 *    - keys(), values(), entries()
 *    - String representation (toString)
 *    - Edge-case handling
 * =============================================================================
 */

const HashTable = require("./hashTable");

// ------------------------------------------------------------
// Utility helper for section titles
// ------------------------------------------------------------
function section(title) {
  console.log("\n" + "=".repeat(70));
  console.log(`>>> ${title}`);
  console.log("=".repeat(70));
}

// ------------------------------------------------------------
// Create a new table
// ------------------------------------------------------------
section("Creating HashTable...");
const table = new HashTable(4);
console.log("Initial size:", table.size());

// ------------------------------------------------------------
// Insert elements
// ------------------------------------------------------------
section("Inserting elements...");

table.set("name", "Muhamed");
table.set("age", 23);
table.set("job", "Software Engineer");
table.set("country", "Egypt");
table.set("city", "Cairo"); // This should trigger resize

console.log("Size after inserts:", table.size());
console.log("Table contents:");
console.log(table.toString());

// ------------------------------------------------------------
// Get values
// ------------------------------------------------------------
section("Retrieving values...");

console.log("name  →", table.get("name"));
console.log("age   →", table.get("age"));
console.log("city  →", table.get("city"));
console.log("unknown →", table.get("unknown")); // undefined

// ------------------------------------------------------------
// Update value
// ------------------------------------------------------------
section("Updating a value...");

table.set("job", "Senior Developer");
console.log("Updated job →", table.get("job"));

// ------------------------------------------------------------
// contains()
// ------------------------------------------------------------
section("contains(key)");

console.log("Contains 'name'?   →", table.contains("name"));
console.log("Contains 'salary'? →", table.contains("salary"));

// ------------------------------------------------------------
// Removing
// ------------------------------------------------------------
section("Removing entries...");

console.log("Remove 'age' →", table.remove("age"));
console.log("Remove 'invalidKey' →", table.remove("invalidKey"));
console.log("Size after removal:", table.size());

// ------------------------------------------------------------
// Keys / Values / Entries
// ------------------------------------------------------------
section("keys() / values() / entries()");

console.log("Keys:", table.keys());
console.log("Values:", table.values());
console.log("Entries:", table.entries());

// ------------------------------------------------------------
// Iterator (for...of)
// ------------------------------------------------------------
section("Iterating using for...of");

for (const [key, value] of table) {
  console.log(`${key}  =>  ${value}`);
}

// ------------------------------------------------------------
// Stress test for resize
// ------------------------------------------------------------
section("Stress test (inserting 50 keys)");

for (let i = 1; i <= 50; i++) {
  table.set("key" + i, i);
}

console.log("Size:", table.size());
console.log("Some samples:");
console.log(table.get("key10"));
console.log(table.get("key25"));
console.log(table.get("key50"));

// ------------------------------------------------------------
// Final structure
// ------------------------------------------------------------
section("Final HashTable structure");

console.log(table.toString());

console.log("\nAll tests completed successfully ");
