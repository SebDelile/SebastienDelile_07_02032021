//--------------------------------------------------------------------------------------------
//----------------------------------- imports(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

import { wrapperSelectedTag } from "../main.js";

//--------------------------------------------------------------------------------------------
//----------------------------- Intermediate stage(s) ----------------------------------------
//--------------------------------------------------------------------------------------------

//template element  : <button type="button" class="tag__button color__ingredients">Exemple1</button>

function createSelectedTagElement(tagname, category) {
  let element = document.createElement("button");
  element.classList.add("tag__button", `color__${category}`);
  element.setAttribute("type", "button");
  element.textContent = tagname;
  return element;
}

//is called after each tag modification : hide the section if there is no selected tag.
function selectedTagSectionVisibility() {
  const nbElements = wrapperSelectedTag.getElementsByClassName("tag__button");
  if (nbElements.length > 0) {
    wrapperSelectedTag.parentNode.classList.toggle("hidden", false);
  } else {
    wrapperSelectedTag.parentNode.classList.toggle("hidden", true);
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

export function tagSelection(tagname, list) {
  let element = createSelectedTagElement(tagname, list.category);
  wrapperSelectedTag.append(element);
  //update recipes
  //update list
  list.updateList(tagTestFunction, tagname, "shown");
  selectedTagSectionVisibility();
  element.addEventListener("click", function () {
    element.remove();
    //update list
    list.updateList(tagTestFunction, tagname, "hidden");
    //update element
    selectedTagSectionVisibility();
  });
}
