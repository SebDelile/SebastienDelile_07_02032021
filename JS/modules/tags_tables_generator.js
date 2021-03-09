//--------------------------------------------------------------------------------------------
//----------------------------------- imports(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

import { displayedIngredients, displayedAppliances, displayedUstensils } from "../main.js";

//--------------------------------------------------------------------------------------------
//----------------------------- Intermediate stage(s) ----------------------------------------
//--------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

export function tagsTablesGenerator(recipe) {
  for (let item of recipe.ingredients) {
    if (!displayedIngredients.includes(item.ingredient)) {
      displayedIngredients.push(item.ingredient);
    }
  }

  if (!displayedAppliances.includes(recipe.appliance)) {
    displayedAppliances.push(recipe.appliance);
  }

  for (let item of recipe.ustensils) {
    if (!displayedUstensils.includes(item)) {
      displayedUstensils.push(item);
    }
  }
}
