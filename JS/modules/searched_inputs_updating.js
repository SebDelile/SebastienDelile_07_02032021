//--------------------------------------------------------------------------------------------
//----------------------------------- imports(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

import { searchedInputs, mainSearchInput, listRecipes, listIngredients, listAppliances, listUstensils } from "../main.js";
import { norm } from "./utils.js";
import { searchAlgoritm } from "./search_algoritm.js";
import { searchTag } from "./search_tag.js";

//--------------------------------------------------------------------------------------------
//----------------------------- Intermediate stage(s) ----------------------------------------
//--------------------------------------------------------------------------------------------

//template : searchedInputs = { mainSearch: [], ingredients: [], appliances: [], ustensils: [] }

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

//takes the selected constraints and updates the object passed as input for the search function
export function searchedInputsUpdating(category, type, value) {
  let mode = "";
  let sligthCriterion = "";
  if (category === "mainSearch") {
    //update the field keeping previous input in a buffer
    const previousInputs = searchedInputs.mainSearch;
    if (value.length >= 3) {
      searchedInputs.mainSearch = norm(value)
        .split(" ")
        .filter((el) => el !== "");
    } else {
      searchedInputs.mainSearch = [];
    }
    const actualInputs = searchedInputs.mainSearch;
    //compare previous with actual inputs
    //1st : ignore all word being in both input :
    const duplicates = [];
    for (let previousInput of previousInputs) {
      if (actualInputs.includes(previousInput)) {
        duplicates.push(previousInput);
      }
    }
    previousInputs.filter((el) => !duplicates.includes(el));
    actualInputs.filter((el) => !duplicates.includes(el));
    //they are lot of cases that can be discriminated based on the array's length
    const criterion = [previousIputs.length, actualInputs.length];
    switch (criterion) {
      case [0, 0]:
        //if both arrays are empty : nothing significally changes (maybe a space input or something that kind). Do nothing
        return;
      case [0, 1]:
        //all previous words are kept, only a new one is added, need to search for this word only
        mode = "moreStrict";
        sligthCriterion = actualInputs[0];
        break;
      case [1, 0]:
        //a word was deleted, need to search with all remaining criteria
        mode = "lessStrict";
        break;
      case [1, 1]:
        //a word was modified
        if (actualInput[0].includes(previousInput[0])) {
          // a char was added to the word, need to search for this word only
          mode = "moreStrict";
          sligthCriterion = actualInputs[0];
        } else if (actualInput[0].includes(previousInput[0])) {
          //a char was removed to the word, need to search with all remaining criteria
          mode = "lessStrict";
        } else {
          //word changed too significantly, need to restart filter from scratch
          mode = "tooDifferent";
        }
        break;
      case [1, 2]:
        //one word was cut in two
      case [2, 1]:
        //two words were grouped as one
      default:
        //can occur when several char are selected and deleted at once, or a copy/paste several char at once.
        //these cases can't be easily treated so it needs to restart filter from scratch
        mode = "tooDifferent";
    }
  } else {
    // the change occurs by adding/removing a tag (ingredients, appliances or ustensils)
    switch (type) {
      case "add":
        //undisplayed elements cannot match this stricter criterion, but displayed element could not match it
        mode = "moreStrict";
        sligthCriterion = value;
        break;
      case "remove":
        //all of displayed element match this less strict criterion, but some of undisplayed element could now match it
        mode = "lessStrict";
        break;
      default:
      //error
    }
  }
  //updates the recipe list an then the tags lists (including updating of the visibility of elements)
  switch (mode) {
    case "moreStrict":
      listRecipes.updateList(searchAlgoritm, mode, category, sligthCriterion);
      break;
    case "lessStrict":
      listRecipes.updateList(searchAlgoritm, mode, "all");
      break;
    case "tooDifferent":
      listRecipes.updateList(searchAlgoritm, mode, "all");
      break;
    default:
  }
  listIngredients.updateList(searchTag, mode, "ingredients");
  listAppliances.updateList(searchTag, mode, "appliances");
  listUstensils.updateList(searchTag, mode, "ustensils");
}
