//--------------------------------------------------------------------------------------------
//----------------------------------- imports(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

import {selectedTagWrapper} from "../main.js"

//--------------------------------------------------------------------------------------------
//----------------------------- Intermediate stage(s) ----------------------------------------
//--------------------------------------------------------------------------------------------

//template element  : <button type="button" class="tag__button color__ingredients">Exemple1</button>

function createSelectedTagElement(tagname, category) {
  let element = document.createElement("button");
  element.classList.add("tag__button", `color__${category}`);
  element.setAttribute("type", "button")
  element.textContent = tagname;
  return element;
}

//is called after each tag modification : hide the section if there is no selected tag.
function selectedTagSectionVisibility() {
  const nbElements = selectedTagWrapper.getElementsByClassName("tag__button")
  if (nbElements.length > 0 ) {
    selectedTagWrapper.parentNode.classList.toggle("hidden", false);
  }
  else {
    selectedTagWrapper.parentNode.classList.toggle("hidden", true);
  }
}

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

export function tagSelection(tagname, category) {
  let element = createSelectedTagElement(tagname, category);
  selectedTagWrapper.append(element);
  //update list
  //update element
  selectedTagSectionVisibility()
  element.addEventListener("click", function() {
    element.remove();
    //update list
    selectedTagSectionVisibility()
  })
}