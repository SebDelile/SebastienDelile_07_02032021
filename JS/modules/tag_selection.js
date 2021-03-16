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

//this one is ok for the tag, but it need to be changed for the recipe
//something like : return searchAlgo(searchableTable[data], input) //data being the recipe's id
export let tagTestFunction = function (data, input) {
  return data === input;
  //!!!! a modifier surement
};

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

export function tagSelection(tagname, category) {
  let element = createSelectedTagElement(tagname, category);
  selectedTags.querySelector(".selectedtag__wrapper").append(element);
  /*let list;
    switch (category) {
      case "ingredients":
        list = listIngredients;
        break;
      case "appliances":
        list = listAppliances;
        break;
      case "ustensils":
        list = listUstensils;
        break;
    }*/
  //update recipes
  //update list
  searchedInputsUpdating();
  selectedTagSectionVisibility();
  element.addEventListener("click", function () {
    element.remove();
    //update list
    //update element
    searchedInputsUpdating();
    selectedTagSectionVisibility();
  });
}
