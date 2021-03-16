//--------------------------------------------------------------------------------------------
//----------------------------------- imports(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

import { searchedInputs, mainSearchInput, listRecipes, listIngredients, listAppliances, listUstensils } from "../main.js";
import { norm } from "./utils.js";
import { searchAlgoritm } from "./search_algoritm.js";
import { searchTag} from "./search_tag.js"

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
  if (category === "mainSearch") {
    //update the field keeping previous input in a buffer
    const previousInput = searchedInputs.mainSearch.join(" ");
    if (mainSearchInput.value.length >= 3) {
      searchedInputs.mainSearch = norm(mainSearchInput.value)
        .split(" ")
        .filter((el) => el !== "");
    } else {
      searchedInputs.mainSearch = "";
    }
    const actualInput = searchedInputs.mainSearch.join(" ");
    //compare previous with actual input(s)
    if (actualInput.includes(previousInput)) {
      //undisplayed elements cannot match this stricter criterion, but displayed element could not match it
      mode = "moreStrict";
    } else if (actualInput.includes(previousInput)) {
      //all of displayed element match this less strict criterion, but some of undisplayed element could now match it
      mode = "lessStrict";
    } else {
      //criterion changes too much to use the previous work, need to filter all the list from the start
      mode = "tooDifferent";
    }
  } else {
    //ingredients, appliances or ustensils
    switch (type) {
      case "add":
        mode = "moreStrict";
        break;
      case "remove":
        mode = "lessStrict";
        break;
      default:
      //error
    }
  }

  //updates the recipe list an then the tags lists (including updating of the visibility of elements)
  listRecipes.updateList(searchAlgoritm, mode, category);
  listIngredients.updateList(searchTag, mode, "ingredients");
  listAppliances.updateList(searchTag, mode, "appliances");
  listUstensils.updateList(searchTag, mode, "ustensils");
}
