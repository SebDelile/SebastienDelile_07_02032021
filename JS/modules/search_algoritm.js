//--------------------------------------------------------------------------------------------
//----------------------------------- imports(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

import { searchableTable, tagsCategories } from "../main.js";

//--------------------------------------------------------------------------------------------
//----------------------------- Intermediate stage(s) ----------------------------------------
//--------------------------------------------------------------------------------------------

function algoBoyerMooreHorspool(needle, haystack) {
  const needleLastPos = needle.length - 1;
  const haystackLastPos = haystack.length;
  if (needleLastPos > haystackLastPos) {
    //no result possible if the needle is longer that the haystack
    return false;
  }
  if (needleLastPos === 0) {
    //no better algorithm than naive search if the needle is only 1 char
    return haystack.includes(needle);
  }
  //builds jump table : bad character rule
  let badCharRule = {};
  for (let pos = 0; pos < needleLastPos; pos++) {
    //each char creates a new property (last one is not included). If the property exists, the value is overwrited
    badCharRule[needle[pos]] = needleLastPos - pos;
  }

  //needle is a real life word (ie. it is not ABABABAB like), good suffix rule is not significant here

  //searches in the the haystack
  let i = needleLastPos; //beginning position of the search
  let j = 1; // needle is at least 2 char
  while (i <= haystackLastPos) {
    //console.log(i + " / " + haystackLastPos);
    if (needle[needleLastPos] === haystack[i]) {
      //last char of needle comparison, if it matches : test the previous char until mismatch or end of needle
      j = 1;
      while (needle[needleLastPos - j] === haystack[i - j]) {
        if (j === needleLastPos) {
          return true;
        } else {
          j++;
        }
      }
    }
    //in case of mismatch, skip several char according to the badCharRule or skip needle.length if the mismatching char is not in the table
    i += badCharRule[haystack.charAt(i)] || needleLastPos + 1;
  }
  //haystack has been entirely browsed without full match, needle is not inside
  return false;
}

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
      if (!algoBoyerMooreHorspool(word, recipeData.mainSearch)) {
        return false;
      } //else do nothing
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
        if (!algoBoyerMooreHorspool(criteria, recipeData.mainSearch)) {
          return false;
        } //else do nothing
    }
  }
  //there was no false earlier : it's a full match !
  return true;
}
