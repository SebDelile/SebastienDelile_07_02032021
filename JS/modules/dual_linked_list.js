//--------------------------------------------------------------------------------------------
//----------------------------------- imports(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------
import { searchableTable, searchedInputs, tagsCategories } from "../main.js";
import { TagsTable } from "./tags_table.js";
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
    this.shown = { head: null, lenght = 0};
    this.hidden = { head: null, lenght = 0};
    this.category = category;
  }
  updateList(testFunction, mode, searchIn, criteria = searchedInputs) {
    //takes the parameters to set some useful variables
    const list = mode === "moreStrict" || "tooDifferent" ? "shown" : mode === "lessStrict" ? "hidden" : "errorMode";
    if (mode === "tooDifferent") {
      this.concatenate(); // restart from scratch
    }
    const oppositeList = list === "shown" ? "hidden" : "shown";
    const displayToggle = list === "shown" ? true : false; // true means undisplay (add the css class .hidden)
    let node = this[list].head;
    let previousNode = null;
    //for every node of the list
    while (node) {
      let condition = testFunction(node.data, searchIn, criteria);
      //if list is shown : do something when there is no match, if list is hidden, do something if there is match
      condition = displayToggle ? !condition : condition;
      if (condition) {
        //item matches the parameter, so it has to be moved to the opposite list and deleted from this one, plus the display status has to be updated
        this.insertAtBeginning(oppositeList, node.data);
        this[list].length --;
        if (previousNode) {
          //usual case, links the previous node to the next node, so the actual node is deleted from the list
          previousNode.deleteNextNode();
        } else {
          //particuliar case when the node to move was the head, so previous node doesn't exist and head should be updated
          this[list].head = this[list].head.next;
        }
        //finally the class hidden is add or remove depending on the list being browsed
        const nodeElement = document.getElementById(`${this.category}-${node.data}`);
        nodeElement.classList.toggle("hidden", displayToggle);
      } else {
        //previous node changed only if the node is kept
        previousNode = node;
        // if the lists were concatened, this element might be in this.hidden and moved to this.shown without changing the visibility state
        if (mode === "tooDifferent") {
          document.getElementById(`${this.category}-${node.data}`).classList.toggle("hidden", false);
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
    this[list].length ++
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
  updateTags(){
    let list = this.shown.length <= this.hidden.length ? "shown" : "hidden";
    //let operator = this.shown.length <= this.hidden.length ? testHideTag : testShowTag;
    let node = this[list].head;
    //for every node of the list
    while (node) {
      for (let category of tagsCategories) {
        for (let tag of searchableTable[node.data][category]) {
          tagsTable[category].testShowTag(tag)
        }
      }
    }
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
