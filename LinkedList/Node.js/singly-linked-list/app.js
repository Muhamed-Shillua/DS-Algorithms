const LinkedList = require('./sLL');

function logList(list, message) {
    console.log(`\n=== ${message} ===`);
    list.print();
    console.log(`Length: ${list.getLength()}`);
    console.log('--------------------------');
}

function main() {
    const list = new LinkedList();

    // ================== INSERT ELEMENTS ==================
    list.insertAtEnd(20);
    list.insertAtEnd(40);
    list.insertAtEnd(50);
    list.insertAtBeginning(10);
    list.insertAtPos(2, 30); // insert 30 at index 2

    logList(list, 'Initial List');

    // ================== REVERSE ==================
    list.reverseIterative();
    logList(list, 'List After Reverse');

    // ================== REMOVE ELEMENTS ==================
    console.log('Removing elements: Beginning, value 20, and End...');
    list.removeBeginning();
    list.remove(20);
    list.removeEnd();

    logList(list, 'Final List After Removals');
}

// Run the main function
main();
