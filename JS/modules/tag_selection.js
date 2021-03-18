//--------------------------------------------------------------------------------------------
//----------------------------------- imports(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

import { selectedTags } from "../main.js";
import {searchedInputsUpdating} from "./searched_inputs_updating.js"

//--------------------------------------------------------------------------------------------
//----------------------------- Intermediate stage(s) ----------------------------------------
//--------------------------------------------------------------------------------------------

//template element  : <button type="button" class="tag__button color__ingredients">Exemple1</button>

function createSelectedTagElement(tagname, category) {
  let element = document.createElement("button");
  element.classList.add("selectedtag__button");
  element.setAttribute("type", "button");
  element.setAttribute("data-category", category);
  element.textContent = tagname;
  return element;
}

//is called after each tag modification : hide the section if there is no selected tag.
function selectedTagSectionVisibility() {
  const nbElements = selectedTags.getElementsByClassName("selectedtag__button");
  if (nbElements.length > 0) {
    selectedTags.classList.toggle("hidden", false);
  } else {
    selectedTags.classList.toggle("hidden", true);
  }
}


//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

export function tagSelection(tagname, category) {
  let element = createSelectedTagElement(tagname, category);
  selectedTags.querySelector(".selectedtag__wrapper").append(element);
  searchedInputsUpdating(category, "add", tagname);
  selectedTagSectionVisibility();
  //add eventlistener to remove the tag on click
  element.addEventListener("click", function () {
    element.remove();
    searchedInputsUpdating(category, "remove", tagname);
    selectedTagSectionVisibility();
  });
}
