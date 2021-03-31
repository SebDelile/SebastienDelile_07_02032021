//--------------------------------------------------------------------------------------------
//----------------------------------- imports(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

import { searchedTagsInputs, tagsCategories } from "../main.js";
import { norm } from "./utils.js";

//--------------------------------------------------------------------------------------------
//----------------------------- Intermediate stage(s) ----------------------------------------
//--------------------------------------------------------------------------------------------

//update the status of the message when no recipe matches the criteria
function noResultMessage(grid) {
  const message = grid.querySelector(".searchedtag__grid__message");
  const availableTags = grid.querySelectorAll(".searchedtag__grid__item:not(.hidden):not(.searchedtag__grid__item--hidden)");
  if (availableTags.length === 0) {
    message.classList.toggle("hidden", false);
  } else {
    message.classList.toggle("hidden", true);
  }
}

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

//allow to filter the tag suggestions when the user input in the tag search bar
//the class .hidden is not used to avoid confusion between tag unsuitable to displayed recipes with tags unsuitable according to tag serach input
export function tagsUpdatingAvailability(target) {
  const input = norm(target.value);
  const category = target.dataset.category;
  const tagGrid = tagsCategories[category];
  const availableTags = tagGrid.querySelectorAll(".searchedtag__grid__item:not(.hidden)");
  for (let tag of availableTags) {
    const tagname = tag.getAttribute("id").replace(`${category}-`, "");
    if (tagname.includes(input)) {
      tag.classList.toggle("searchedtag__grid__item--hidden", false);
    } else {
      tag.classList.toggle("searchedtag__grid__item--hidden", true);
    }
  }
}

//resets the availability of the tag (with an empty input in the tag search bar)
export function tagsUpdatingReset() {
  for (let searchedTagsInput of searchedTagsInputs) {
    searchedTagsInput.value = "";
    tagsUpdatingAvailability(searchedTagsInput);
  }
}

//display or undisplay the grid of tag suggestions
export function tagsUpdatingGridDisplay(mode, input, icon, grid) {
  icon.classList.toggle("searchedtag__icon--opened", mode);
  grid.classList.toggle("searchedtag__grid--visible", mode);
  grid.setAttribute("aria-expanded", mode);
  if (mode && window.innerWidth >= 1200) {
    const gridWidth = parseFloat(window.getComputedStyle(grid).width);
    input.style.width = `${gridWidth}px`;
  } else {
    input.style.width = "";
  }
  noResultMessage(grid);
}
