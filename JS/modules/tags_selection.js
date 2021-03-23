//--------------------------------------------------------------------------------------------
//----------------------------------- imports(s) ---------------------------------------------
//--------------------------------------------------------------------------------------------

import {tagsTable } from "../main.js";
import {searchedInputsUpdating} from "./searched_inputs_updating.js"
import {norm} from "./utils.js";

//--------------------------------------------------------------------------------------------
//---------------------------------- DOM elements --------------------------------------------
//--------------------------------------------------------------------------------------------

const selectedTagsSection = document.querySelector(".selectedtag");

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
function selectedTagsSectionVisibility() {
  const nbElements = selectedTagsSection.getElementsByClassName("selectedtag__button");
  if (nbElements.length > 0) {
    selectedTagsSection.classList.toggle("hidden", false);
  } else {
    selectedTagsSection.classList.toggle("hidden", true);
  }
}



//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

export function tagsSelectionClick(target) {
  const tagname = target.textContent;
  const category = target.dataset.category;
  let element = createSelectedTagElement(tagname, category);
  selectedTagsSection.querySelector(".selectedtag__wrapper").append(element);
  searchedInputsUpdating(category, "add", norm(tagname));
  selectedTagsSectionVisibility();
  document.querySelector(".searchedtag").focus();
  //add eventlistener to remove the tag on click
  element.addEventListener("click", function () {
    element.remove();
    searchedInputsUpdating(category, "remove", norm(tagname));
    selectedTagsSectionVisibility();
  });
}

export function tagsSelectionInput(target){
  const tagname = norm(target.value);
  const category = target.dataset.category;
  if (tagsTable[category].sum[tagname]) {
    //the tag exists
    const tagItem = document.getElementById(`${category}-${tagname}`)
    if (!tagItem.classList.contains("hidden")) {
      //and it is available => clicks it
      tagItem.querySelector("button").click();
    }
    else {
      //else set invalid to run the shacking animation
      target.setCustomValidity("nop");
    }
  }
  else {
    //same as above
    target.setCustomValidity("nop");
  }
}