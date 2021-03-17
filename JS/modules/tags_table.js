//--------------------------------------------------------------------------------------------
//----------------------------------- imports(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

import { searchedTagItems } from "../main.js";

//--------------------------------------------------------------------------------------------
//----------------------------- Intermediate stage(s) ----------------------------------------
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

export class TagsTable {
  constructor() {
    
  }
  addSubTable(category) {
    this[category] = new TagsSubTable(category)
  }
}

export class TagsSubTable {
  constructor(category) {
    this.sum = {};
    this.test = {};
    this.category = category;
  }
  importTag(tag) {
    //to initiate the table
    if (this.sum.hasOwnProperty(tag)) {
      this.sum[tag]++;
    } else {
      this.sum[tag] = 1;
    }
  }
  beginTest(list) {
    //initiate a test by clearing the test area and updating the visibility of the tags depending on the list being browsed
    this.test = {};
    toggleDisplay = list === "shown" ? true : false; //browsing shown : every tags is hidden and each match turns the tag visible. opposite when browsing hidden
    for (let searchedTagItem of searchedTagItems) {
      searchedTagItem.classList.toggle("hidden", toggleDisplay)
    }
  }
  testTag(tag, list) {
    if ((list = "shown")) {
      //browses the shown list, each times a tag appears, it turns shown (no need to duplicate)
      if (!this.test.hasOwnProperty(tag)) {
        this.test[tag] = 1; //whatever the value, this adds the key
        document.getElementById(`${this.category}-${tag}`).classList.toggle("hidden", false);
      }
    }
    if ((list = "hidden")) {
      //browses hidden list, if a tag is matched as much times as it appears in sum, this tag doesn't appear in the shown list, so hides it
      if (!this.test.hasOwnProperty(tag)) {
        this.test[tag] = this.sum[tag];
      }
      this.test[tag]--;
      if (this.test[tag] === 0) {
        document.getElementById(`${this.category}-${tag}`).classList.toggle("hidden", true);
      }
    }
  }
}
