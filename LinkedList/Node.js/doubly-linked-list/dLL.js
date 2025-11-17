class Node{
    constructor(data){
        this.data = data;   // node value
        this.next = null;   // pointer to the next node
        this.back = null;   // pointer to the prev node
    }
}

// A simple singly linked list implementation
class DoublyLinkedList {
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
            list += current.data + (current.next ? ' <--> ' : '');
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
        let temp = null;
        let current = this.head;
        this.tail = this.head; // old head becomes new tail

        while(current){
            temp = current.back;   // save back
            current.back = current.next;   // swap back, next
            current.next = temp;        // swap next, back
            current = current.back;        // move current
        }

        // after loop, temp is at old head location
        if(temp) this.head = temp.back; // new head
    }

    // ====================== INSERT ======================
    // Insert element at the beginning
    insertAtBeginning(value){
        const newNode = new Node(value);
        if(this.isEmpty()){
            this.head = this.tail = newNode;
        } else{
            newNode.next = this.head;   // link to old head
            this.head.back = newNode;   // old head back -> new node
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
            newNode.back = this.tail;   // new node back -> old tail 
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
        newNode.back = current;
        newNode.next.back = newNode;
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
            this.head.back = null;
        }
        this.length--;
    }

    //Remove from the end
    removeEnd(){
        if(this.isEmpty()) throw new Error("List is empty!");

        if(this.length === 1){
            this.head = this.tail = null;
        } else {
            this.tail = this.tail.back;
            this.tail.next = null;
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

        if(this.tail.data === value){
            this.removeEnd();
            return;
        }

        let current = this.head.next;

        while(current){
            if(current.data === value){
                current.back.next = current.next;
                if(current.next) current.next.back = current.back;
                this.length--;
                return;
            }
            current = current.next;
        }

        console.log("Element not found");
    }
}

module.exports = DoublyLinkedList;
