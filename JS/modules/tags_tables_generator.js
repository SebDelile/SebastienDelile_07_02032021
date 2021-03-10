//--------------------------------------------------------------------------------------------
//----------------------------------- imports(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

import { shownIngredients, shownAppliances, shownUstensils } from "../main.js";

//--------------------------------------------------------------------------------------------
//----------------------------- Intermediate stage(s) ----------------------------------------
//--------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

export function tagsTablesGenerator(recipe) {
  for (let item of recipe.ingredients) {
    if (!shownIngredients.includes(item.ingredient)) {
      shownIngredients.push(item.ingredient);
    }
  }

  if (!shownAppliances.includes(recipe.appliance)) {
    shownAppliances.push(recipe.appliance);
  }

  for (let item of recipe.ustensils) {
    if (!shownUstensils.includes(item)) {
      shownUstensils.push(item);
    }
  }
}
