//--------------------------------------------------------------------------------------------
//----------------------------------- imports(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

import {searchedTagsInputs, tagsCategories} from "../main.js"
import {norm} from "./utils.js"

//--------------------------------------------------------------------------------------------
//----------------------------- Intermediate stage(s) ----------------------------------------
//--------------------------------------------------------------------------------------------

function noResultMessage (grid) {
  const message = grid.querySelector(".searchedtag__grid__message");
  const availableTags = grid.querySelectorAll(".searchedtag__grid__item:not(.hidden):not(.searchedtag__grid__item--hidden)");
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
  const tagGrid = tagsCategories[category];
  const availableTags = tagGrid.querySelectorAll(".searchedtag__grid__item:not(.hidden)")
  for (let tag of availableTags) {
    const tagname = tag.getAttribute("id").replace(`${category}-`, "")
    if (tagname.includes(input)) {
      tag.classList.toggle("searchedtag__grid__item--hidden", false);
    }
    else {
      tag.classList.toggle("searchedtag__grid__item--hidden", true);
    }
  }
}

export function tagsUpdatingReset() {
  for (let searchedTagsInput of searchedTagsInputs) {
  searchedTagsInput.value="";
  tagsUpdatingAvailability(searchedTagsInput);
}}


export function tagsUpdatingGridDisplay(mode, input, icon, grid) {
  icon.classList.toggle("searchedtag__icon--opened", mode);
  grid.classList.toggle("searchedtag__grid--visible", mode);
  if (mode && window.innerWidth >= 1200) {
    const gridWidth = parseFloat(window.getComputedStyle(grid).width);
    input.style.width = `${gridWidth}px`;
  } else {
    input.style.width = "";
  }
  noResultMessage(grid);
}
