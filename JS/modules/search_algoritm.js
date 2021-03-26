//--------------------------------------------------------------------------------------------
//----------------------------------- imports(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

import { searchableTable, tagsCategories } from "../main.js";

//--------------------------------------------------------------------------------------------
//----------------------------- Intermediate stage(s) ----------------------------------------
//--------------------------------------------------------------------------------------------

function indexationSearch(word, dictionnary) {
  const wordLength = word.length;
  if (wordLength >= 16) {
    //bigger word are not cut into subword, do naive serach in the table of big words
    for (let entry of dictionnary[16]) {
      if (entry.includes(word)) {
        return true;
      }
    }
    return false;
  } else {
    //do the dichotomic search of word into the subwords of the dictionnary
    const test = dictionnary.dichotomicSearch(word, wordLength);
    if (test === Math.floor(test)) {
      return true;
    } else {
      return false;
    }
  }
}

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

//the method to search in the table is related to the filtering algorithm
//here is a indexation method searching in a preprocessed dictionnary

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
      if (!indexationSearch(word, recipeData.mainSearch)) {
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
        return indexationSearch(criteria, recipeData.mainSearch);
    }
  }
  //there was no false earlier : it's a full match !
  return true;
}
