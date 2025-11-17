class Node{
    constructor(data){
        this.data = data;   // node value
        this.next = null;   // pointer to the next node
    }
}

// A simple singly linked list implementation
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // ====================== UTILITY ======================
    isEmpty(){ return this.length === 0; }
    getLength(){ return this.length; }

    // Display all elements in the list
    print(){
        let current = this.head;
        let list = '';
        while(current){
            list += current.data + (current.next ? ' -> ' : '');
            current = current.next;
        }
        console.log(list);
    }

    // Search if an element is in the list
    search(element){
        let current = this.head;
        let pos = 0;
        while(current){
            if(current.data === element) return pos;
            current = current.next;
            pos++;
        }
        return -1; // Return -1 if the element not found
    }

    // Reverse the linked list (Iterative Method)
    reverseIterative(){
        let prev = null;
        let current = this.head;
        let next = null;
        this.tail = this.head; // old head becomes new tail

        while(current){
            next = current.next;   // save next
            current.next = prev;   // reverse link
            prev = current;        // move prev
            current = next;        // move current
        }

        this.head = prev;
    }

    // ====================== INSERT ======================
    // Insert element at the beginning
    insertAtBeginning(value){
        const newNode = new Node(value);
        if(this.isEmpty()){
            this.head = this.tail = newNode;
        } else{
            newNode.next = this.head;   // link to old head
            this.head = newNode;        // update head
        }
        this.length++;
    }

    // Insert element at the end
    insertAtEnd(value){
        const newNode = new Node(value);
        if(this.isEmpty()){
            this.head = this.tail = newNode;
        } else{
            this.tail.next = newNode;   // link old tail to new node
            this.tail = newNode;        // update tail
        }
        this.length++;
    }

    // Insert element at a specific position
    insertAtPos(pos, value){
        if(pos < 0 || pos > this.length){
            throw new RangeError("Invalid position!");
        }

        if(pos === 0){
            this.insertAtBeginning(value);
            return;
        }

        if(pos === this.length){
            this.insertAtEnd(value);
            return;
        }

        const newNode = new Node(value);
        let current = this.head;
        for(let i = 1; i < pos; i++){
            current = current.next;
        }
        newNode.next = current.next;
        current.next = newNode;
        this.length++;
    }

        // ====================== REMOVE ======================
    // Remove from the beginning
    removeBeginning(){
        if(this.isEmpty()) throw new Error("List is empty!");

        if(this.length === 1){
            this.head = this.tail = null;
        } else{
            this.head = this.head.next;
        }
        this.length--;
    }

    //Remove from the end
    removeEnd(){
        if(this.isEmpty()) throw new Error("List is empty!");

        if(this.length === 1){
            this.head = this.tail = null;
        } else {
            let current = this.head;
            let prev = null;

            while(current !== this.tail){
                prev = current;
                current = current.next;
            }

            prev.next = null;
            this.tail = prev;
        }
        this.length--;
    }

    // Remove by value
    remove(value){
        if(this.isEmpty()) throw new Error("List is empty!");

        if(this.head.data === value){
            this.removeBeginning();
            return;
        }

        let prev = this.head;
        let current = this.head.next;

        while(current){
            if(current.data === value){
                prev.next = current.next;
                if(current === this.tail) this.tail = prev;
                this.length--;
                return;
            }
            prev = current;
            current = current.next;
        }

        console.log("Element not found");
    }
}

module.exports = LinkedList;
