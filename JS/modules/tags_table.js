//--------------------------------------------------------------------------------------------
//----------------------------------- imports(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

import { tagsCategories } from "../main.js";
import {norm} from "./utils.js"

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
  beginTest(list) {
    //initiate a test by clearing the test area and updating the visibility of the tags depending on the list being browsed
    for (let category in this) {
      this[category].test = {};
    }
    const toggleDisplay = list === "shown" ? true : false; //browsing shown : every tags is hidden and each match turns the tag visible. opposite when browsing hidden
    const searchedTagItems = document.getElementsByClassName("searchedtag__list__item");  
    for (let searchedTagItem of searchedTagItems) {
        searchedTagItem.classList.toggle("hidden", toggleDisplay)
      }
  }
}

export class TagsSubTable {
  constructor(category) {
    this.sum = {};
    this.test = {};
    this.category = category;
    this.relatedGrid = tagsCategories[category];
  }
  importTag(tag) {
    //to initiate the table
    if (this.sum.hasOwnProperty(norm(tag))) {
      this.sum[norm(tag)]++;
    } else {
      this.sum[norm(tag)] = 1;
      this.relatedGrid.append(this.createTagElement(this.category, tag));
    }
  }
  createTagElement(category, tag) {
    let element = document.createElement("li");
    element.classList.add("searchedtag__list__item");
    element.setAttribute("id", `${category}-${norm(tag)}`);
    element.innerHTML = `<button class="searchedtag__list__button" data-category ="${category}" tabindex=-1>${tag}</button>`;
    return element;
  }
  testTag(tag, list) {
    if (list === "shown") {
      //browses the shown list, each times a tag appears, it turns shown (no need to duplicate)
      if (!this.test.hasOwnProperty(tag)) {
        this.test[tag] = 1; //whatever the value, this adds the key
        document.getElementById(`${this.category}-${tag}`).classList.toggle("hidden", false);
      }
    }
    if (list === "hidden") {
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
