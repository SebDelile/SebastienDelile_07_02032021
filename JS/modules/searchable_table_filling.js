//--------------------------------------------------------------------------------------------
//----------------------------------- imports(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

import { searchableTable } from "../main.js";
import { norm } from "./utils.js";

//--------------------------------------------------------------------------------------------
//----------------------------- Intermediate stage(s) ----------------------------------------
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

//the method to fill the table is related to the filtering algorithm
//here is a naive method just to have something while testing other features

//add the recipe's info to the table
export function searchableTableFilling(recipe) {
  let element = {
    ingredients: [], // need to eliminate quantity and unit fields, see below
    appliances: [norm(recipe.appliance)], // as a table to be consistent with other tags, even if there is only one element inside
    ustensils: recipe.ustensils.map((el) => norm(el)),
    mainSearch: {
      name: norm(recipe.name),
      description: norm(recipe.description),
      //ingredients added later as field "ingredient#", see bellow
    },
  };
  for (let index in recipe.ingredients) {
    element.ingredients.push(norm(recipe.ingredients[index].ingredient));
    element.mainSearch[`ingredient${index}`] = norm(recipe.ingredients[index].ingredient);
  }
  searchableTable.push(element);
}
