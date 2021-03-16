//--------------------------------------------------------------------------------------------
//----------------------------------- imports(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//----------------------------- Intermediate stage(s) ----------------------------------------
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

//node to be used on the linked lists
export class ListNode {
  constructor(data, next = null) {
    (this.data = data), (this.next = next);
  }
  deleteNextNode() {
    this.next = this.next.next;
    //note that it won't be called on the tail (node.next can't be null)
  }
}

//list to contain recipe's id or tags
export class DualLinkedList {
  constructor(category) {
    this.shown = { head: null };
    this.hidden = { head: null };
    this.category = category;
  }
  updateList(testFunction, mode, category="all") {
    const list = mode === "moreStrict" || "tooDifferent" ? "shown" : mode === "lessStrict" ? "hidden" : "errorMode"
    if (mode === "tooDifferent") {
      this.concatenate();
    }
    const oppositeList = list === "shown" ? "hidden" : "shown";
    const displayToggle = list === "shown" ? true : false;
    let node = this[list].head;
    let previousNode = null;
    while (node) {
      if (testFunction(node.data, category)) {
        //item matches the parameter, so it has to be moved to the opposite list and deleted from this one, plus the display status has to be updated
        this.insertAtBeginning(oppositeList, node.data);
        if (previousNode) {
          //usual case, links the previous node to the next node, so the actual node is deleted from the list
          previousNode.deleteNextNode();
        } else {
          //particuliar case when the node to move was the head, so previous node doesn't exist and head should be updated
          this[list].head = this[list].head.next;
        }
        //finally the class hidden is add or remove depending on the list being browsed, only for tags
        console.log(`${this.category}-${node.data}`)
        const nodeElement = document.getElementById(`${this.category}-${node.data}`);
        nodeElement.classList.toggle("hidden", displayToggle);
      } else {
        //previous node changed only if the node is kept
        previousNode = node;
        // as the lists were concatened, this element was in .hidden and moved to .shown without changing the visibility state
        if (mode === "tooDifferent") {
          const nodeElement = document.getElementById(`${this.category}-${node.data}`);
          nodeElement.classList.toggle("hidden", false);
        }
      } 
      //go to next node whatever the case
      node = node.next;
    }
  }
  insertAtBeginning(list, data) {
    //insert at the begining means moving the head of the list to the new item and links it to the previous head
    let newNode = new ListNode(data);
    newNode.next = this[list].head;
    this[list].head = newNode;
  }
  includesData(list, data) {
    //browes the list and returns true if the data is found in the list, false otherwise
    let node = this[list].head;
    while (node) {
      if (node.data === data) {
        return true;
      } else {
        node = node.next;
      }
    }
    return false;
  }
  concatenate() {
    //if not empty, put hiddenList at the begining of the shownList
    if (this.hidden.head === null) {
      return;
    } else {
      //goes to the tail of hiddenList
      let hiddenTail = this.hidden.head;
      while (hiddenTail.next) {
        hiddenTail = hiddenTail.next;
      }
      //insert at the beginning of shownList and clear hiddenList
      hiddenTail.next = this.shown.head;
      this.shown.head = this.hidden.head;
      this.hidden.head = null;
    }
  }
  //used for tests
  print(list) {
    let print = "";
    let node = this[list].head;
    while (node) {
      print += " " + node.data;
      node = node.next;
    }
    return print;
  }
}
