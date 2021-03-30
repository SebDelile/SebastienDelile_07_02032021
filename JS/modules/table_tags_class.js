//--------------------------------------------------------------------------------------------
//----------------------------------- imports(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

import { tagsCategories } from "../main.js";
import { norm } from "./utils.js";

//--------------------------------------------------------------------------------------------
//----------------------------- Intermediate stage(s) ----------------------------------------
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

//the table containing the three tags subtable
export class TableTags {
  constructor() {
    //nothiing here, only subtables to be added
  }
  //add the corresponding subtable
  addSubTable(category) {
    this[category] = new SubTableTags(category);
  }
  //initiate a test by clearing the test area and updating the visibility of the tags depending on the list being browsed
  beginTest(list) {
    for (let category in this) {
      this[category].test = {};
    }
    const toggleDisplay = list === "shown" ? true : false; //browsing shown : every tags is hidden and each match turns the tag visible. opposite when browsing hidden
    const searchedTagItems = document.getElementsByClassName("searchedtag__grid__item");
    for (let searchedTagItem of searchedTagItems) {
      searchedTagItem.classList.toggle("hidden", toggleDisplay);
    }
  }
  //to avoid a selected tag to appear in the grid of tag suggestions (even if it actually fits all criteria)
  hideSelectedTags() {
    const selectedTags = document.getElementsByClassName("selectedtag__button");
    for (let selectedTag of selectedTags) {
      document.getElementById(`${selectedTag.dataset.category}-${norm(selectedTag.textContent)}`).classList.toggle("hidden", true);
    }
  }
}

//the subtable : one for each tag category
export class SubTableTags {
  constructor(category) {
    this.sum = {};
    this.test = {};
    this.category = category;
    this.relatedGrid = tagsCategories[category];
  }
  //to initiate the table
  importTag(tag) {
    if (this.sum[norm(tag)]) {
      this.sum[norm(tag)]++;
    } else {
      this.sum[norm(tag)] = 1;
      this.relatedGrid.append(this.createTagElement(this.category, tag));
    }
  }
  //create the HMTL element to be put in the grid of tag suggestions
  createTagElement(category, tag) {
    let element = document.createElement("li");
    element.classList.add("searchedtag__grid__item");
    element.setAttribute("id", `${category}-${norm(tag)}`);
    element.innerHTML = `<button class="searchedtag__grid__button" data-category ="${category}" tabindex=-1>${tag}</button>`;
    return element;
  }
  //the method to check if a tag should be included in the tag suggestion grid. To be called after each recipes update
  testTag(tag, list) {
    if (list === "shown") {
      //browses the shown list, each times a tag appears, it turns shown (no need to do several times)
      if (!this.test[tag]) {
        this.test[tag] = 1; //whatever the value, the point is to add the key
        document.getElementById(`${this.category}-${tag}`).classList.toggle("hidden", false);
      }
    }
    if (list === "hidden") {
      //browses hidden list, if a tag is matched as much times as it appears in sum, this tag doesn't appear in the shown list, so hides it
      if (!this.test[tag]) {
        this.test[tag] = this.sum[tag];
      }
      this.test[tag]--;
      if (this.test[tag] === 0) {
        document.getElementById(`${this.category}-${tag}`).classList.toggle("hidden", true);
      }
    }
  }
}
