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
//here is a the concatenation method : name, ingredients and description are concatenated into one long string ("§" as separator between field to avoid matching at the intersection of 2 fields)
//this long strings can be efficiently searched in with a smart substring-searching algorithm (Boyer-Moore in our case)

//add the recipe's info to the table
export function searchableTableFilling(recipe) {
  let element = {
    ingredients: [], // need to eliminate quantity and unit fields, see below
    appliances: [norm(recipe.appliance)], // as a table to be consistent with other tags, even if there is only one element inside
    ustensils: recipe.ustensils.map(el => norm(el)),
    mainSearch: norm(recipe.name)
  };
  for (let index in recipe.ingredients) {
    element.ingredients.push(norm(recipe.ingredients[index].ingredient));
    element.mainSearch += `§${norm(recipe.ingredients[index].ingredient)}`;
  }
  element.mainSearch += `§${norm(recipe.description)}`
  searchableTable.push(element);
}
