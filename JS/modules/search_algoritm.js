//--------------------------------------------------------------------------------------------
//----------------------------------- imports(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

import { searchableTable, tagsCategories } from "../main.js";

//--------------------------------------------------------------------------------------------
//----------------------------- Intermediate stage(s) ----------------------------------------
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

//the method to search in the table is related to the filtering algorithm
//here is a naive method just to have something while testing other features

//it returns true if there is a match, and false if there is no match
export function searchAlgoritm(recipeId, searchIn, criteria) {
  const recipeData = searchableTable[recipeId];
  //console.log(searchIn)
  if (searchIn === "all") {
    // criteria is searchInputs (ie. all mainSearch entries + all selected tags) and all inputs have to match the recipes info
    //first : the tag (should be quicker)
    for (let category in tagsCategories) {
      for (let item of criteria[category]) {
        if (!recipeData[category].includes(item)) {
          return false;
        }
      }
    }
    //second : the mainSearch inputs
    for (let word of criteria.mainSearch) {
      let match = false;
      for (let key in recipeData.mainSearch) {
        if (recipeData.mainSearch[key].includes(word)) {
          match = true;
        }
      }
      if (!match) {
        return false;
      }
    }
  } else {
    //this is a slight criterion only to be searched in the corresponding category, criteria is a string
    switch (searchIn) {
      case "ingredients":
      case "appliances":
      case "ustensils":
        if (!recipeData[searchIn].includes(criteria)) {
          return false;
        }
        break;
      case "mainSearch":
        let match = false;
        for (let key in recipeData.mainSearch) {
          if (recipeData.mainSearch[key].includes(criteria)) {
            match = true;
          }
        }
        return match
    }
  }
  //there was no false earlier : it's a full match !
  return true;
}
