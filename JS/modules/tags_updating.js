//--------------------------------------------------------------------------------------------
//----------------------------------- imports(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

import {searchedTagsInputs, tagsCategoriesRelatedHtml} from "../main.js"
import {norm} from "./utils.js"

//--------------------------------------------------------------------------------------------
//----------------------------- Intermediate stage(s) ----------------------------------------
//--------------------------------------------------------------------------------------------

function noResultMessage (tagGrid) {
  const message = tagGrid.querySelector(".searchedtag__list__message");
  const availableTags = tagGrid.querySelectorAll(".searchedtag__list__item:not(.hidden):not(.searchedtag__list__item-hidden)");
  if (availableTags.length === 0) {
    message.classList.toggle("hidden", false)
  } else {
    message.classList.toggle("hidden", true)
  }
}

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------


export function tagsUpdatingAvailability(target) {
  const input = norm(target.value);
  const category = target.dataset.category ;
  const tagGrid = tagsCategoriesRelatedHtml[category];
  const availableTags = tagGrid.querySelectorAll(".searchedtag__list__item:not(.hidden)")
  for (let tag of availableTags) {
    const tagname = tag.getAttribute("id").replace(`${category}-`, "")
    if (tagname.includes(input)) {
      tag.classList.toggle("searchedtag__list__item-hidden", false);
    }
    else {
      tag.classList.toggle("searchedtag__list__item-hidden", true);
    }
  }
}

export function tagsUpdatingReset() {
  for (let searchedTagsInput of searchedTagsInputs) {
  searchedTagsInput.value="";
  tagsUpdatingAvailability(searchedTagsInput);
}}

export function tagsUpdatingGridDisplay(target) {
  const tagInput = target;
  const tagGrid = tagsCategoriesRelatedHtml[target.dataset.category];
  noResultMessage(tagGrid);
  const tagGridWidth = parseFloat(window.getComputedStyle(tagGrid).width);
  tagInput.style.width = `${tagGridWidth}px`;
}