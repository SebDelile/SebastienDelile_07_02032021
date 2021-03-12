//--------------------------------------------------------------------------------------------
//----------------------------------- imports(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

import { listIngredients, gridIngredients, listAppliances, gridAppliances, listUstensils, gridUstensils } from "../main.js";

//--------------------------------------------------------------------------------------------
//----------------------------- HTML ELEMENT TEMPLATE ----------------------------------------
//--------------------------------------------------------------------------------------------

// template Li element : <li class="tagsearch__list__item"><button class="tagsearch__list__button">item 1</button></li>

//--------------------------------------------------------------------------------------------
//----------------------------- Intermediate stage(s) ----------------------------------------
//--------------------------------------------------------------------------------------------

function createTagElement(category, tag) {
  let element = document.createElement("li");
  element.classList.add("tagsearch__list__item");
  element.setAttribute("id", `${category}-${tag}`);
  element.innerHTML = `<button class="tagsearch__list__button" data-category = "${category}">${tag}</button>`;
  return element;
}

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

//adds the ingredients, appliances and ustensils to both the list and the page if they doesn't yet exist
export function tagsImport(recipe) {
  for (let item of recipe.ingredients) {
    if (!listIngredients.includesData("shown", item.ingredient)) {
      listIngredients.insertAtBeginning("shown", item.ingredient);
      gridIngredients.append(createTagElement("ingredients", item.ingredient));
    }
  }
  if (recipe.appliance && !listAppliances.includesData("shown", recipe.appliance)) {
    listAppliances.insertAtBeginning("shown", recipe.appliance);
    gridAppliances.append(createTagElement("appliances", recipe.appliance));
  }
  for (let item of recipe.ustensils) {
    if (!listUstensils.includesData("shown", item)) {
      listUstensils.insertAtBeginning("shown", item);
      gridUstensils.append(createTagElement("ustensils", item));
    }
  }
}
