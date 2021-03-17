//--------------------------------------------------------------------------------------------
//----------------------------------- imports(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

import {recipesList, searchableTable} from "../main.js"

//--------------------------------------------------------------------------------------------
//----------------------------- Intermediate stage(s) ----------------------------------------
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

//browse the recipeList.shown and return true if the tag is found
export function searchTag(tagname, searchIn) {
  const node = recipesList.shown.head;
  while(node) {
    if (searchableTable[node.data][searchIn].includes(tagname)) {
      return true
    }
  }
  //not found by the end of the list
  return false;

  //from tags.shown in recipesList.shown : do something if none of recipe contains the tag
  //from tags.hidden in recipeList.shown : do something if find a match
  //from tags.concat in recipes.shown : do something if none of the recipe contains the tag, else do something else
}