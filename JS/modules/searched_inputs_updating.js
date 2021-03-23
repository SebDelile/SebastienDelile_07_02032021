//--------------------------------------------------------------------------------------------
//----------------------------------- imports(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

import { searchedInputs, mainSearchInput, listRecipes } from "../main.js";
import { norm } from "./utils.js";
import { searchAlgoritm } from "./search_algoritm.js";
import {tagsUpdatingReset} from "./tags_updating.js"

//--------------------------------------------------------------------------------------------
//----------------------------- Intermediate stage(s) ----------------------------------------
//--------------------------------------------------------------------------------------------

function noRecipesTest () {
  const message = document.querySelector(".recipe__grid__message")
  if (listRecipes.shown.length === 0) {
    message.classList.toggle("hidden", false)
    mainSearchInput.setCustomValidity("nop");
  } else {
    message.classList.toggle("hidden", true);
    mainSearchInput.setCustomValidity("");
  }
}

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

//takes the selected constraints and updates the object passed as input for the search function
export function searchedInputsUpdating(category, type, value) {
  //clear tag input fields and initiates variables
  tagsUpdatingReset()
  let mode = "";
  let sligthCriterion = "";
  if (category === "mainSearch") {
    //update the field keeping previous input in a buffer
    const previousInputs = searchedInputs.mainSearch;
    if (value.length >= 3) {
      searchedInputs.mainSearch = norm(value)
        .split("_")
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
    const condition = `${previousInputs.length}_${actualInputs.length}`;
    switch (condition) {
      case "0_0":
        //if both arrays are empty : nothing has significally changed (maybe a space input or something that kind). Does nothing
        return;
      case "0_1":
        //all previous words are kept, only a new one is added, needs to search for this word only
        mode = "moreStrict";
        sligthCriterion = actualInputs[0];
        break;
      case "1_0":
        //a word was deleted, needs to search with all remaining criteria
        mode = "lessStrict";
        break;
      case "1_1":
        //a word was modified
        if (actualInputs[0].includes(previousInputs[0])) {
          // a char was added to the word, need to search for this word only
          mode = "moreStrict";
          sligthCriterion = actualInputs[0];
        } else if (actualInputs[0].includes(previousInputs[0])) {
          //a char was removed to the word, need to search with all remaining criteria
          mode = "lessStrict";
        } else {
          //word changed too significantly, need to restart filter from scratch
          mode = "tooDifferent";
        }
        break;
      default:
        //can occur when one word is cut in two, or two words are grouped as one, or several char are selected and deleted at once, or a copy/paste adds several char at once.
        //all these cases can't be easily treated so it needs to restart filter from scratch
        mode = "tooDifferent";
    }
  } else {
    // the change occurs by adding/removing a tag (ingredients, appliances or ustensils)
    switch (type) {
      case "add":
        //undisplayed elements cannot match this stricter criterion, but displayed element could not match it
        mode = "moreStrict";
        searchedInputs[category].push(value);
        sligthCriterion = value;
        break;
      case "remove":
        //all of displayed element match this less strict criterion, but some of undisplayed element could also now match it
        mode = "lessStrict";
        searchedInputs[category].splice(searchedInputs[category].indexOf(value), 1);
        break;
    }
  }
  //updates the recipe list and then the tags lists (including updating of the visibility of elements)
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
  }
  noRecipesTest();
  listRecipes.updateTags();
}
