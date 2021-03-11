//--------------------------------------------------------------------------------------------
//----------------------------------- imports(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

import { ingredientsList, ingredientsGrid, appliancesList, appliancesGrid, ustensilsList, ustensilsGrid } from "../main.js";

//--------------------------------------------------------------------------------------------
//----------------------------- Intermediate stage(s) ----------------------------------------
//--------------------------------------------------------------------------------------------

// template Li element : <li class="tagsearch__list__item"><button class="tagsearch__list__button">item 1</button></li>


function createTagElement(category, tag) {
  let element = document.createElement("li");
  element.classList.add("tagsearch__list__item");
  element.setAttribute("id", `${category}-${tag}`);
  element.innerHTML = `<button class="tagsearch__list__button">${tag}</button>`
  return element;
}

let handler = function () {
  console.log("fire")
}

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

//adds the ingredients, appliance and ustensils to both the list and the page if they doesn't yet exist
export function tagsImport (recipe) {
  for (let item of recipe.ingredients) {
    if (!ingredientsList.includesData("shown", item.ingredient)) {
      ingredientsList.insertAtBeginning("shown", item.ingredient);
      ingredientsGrid.append(createTagElement("ingredient", item.ingredient));
    }
  }
  if (recipe.appliance && !appliancesList.includesData("shown", recipe.appliance)) {
    appliancesList.insertAtBeginning("shown", recipe.appliance);
    appliancesGrid.append(createTagElement("appliance", recipe.appliance));
  }
  for (let item of recipe.ustensils) {
    if (!ustensilsList.includesData("shown", item)) {
      ustensilsList.insertAtBeginning("shown", item);
      ustensilsGrid.append(createTagElement("ustensil", item));
    }
  }
}
