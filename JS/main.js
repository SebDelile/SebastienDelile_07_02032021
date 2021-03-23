//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

import { DualLinkedList, ListNode } from "./modules/dual_linked_list.js";
import { recipes } from "./modules/recipes_table.js";
import { recipeElementGenerator } from "./modules/recipe_element_generator.js";
import { searchableTableFilling } from "./modules/searchable_table_filling.js";
//import { searchAlgoritm } from "./modules/search_algoritm.js";
import { tagsSelectionClick, tagsSelectionInput } from "./modules/tags_selection.js";
import { tagsUpdatingAvailability, tagsUpdatingGridDisplay } from "./modules/tags_updating.js";
import { searchedInputsUpdating } from "./modules/searched_inputs_updating.js";
import { TagsTable } from "./modules/tags_table.js";
import { tagKeyboardNavigation } from "./modules/tags_keybord_nav.js";
import { norm } from "./modules/utils.js";

//--------------------------------------------------------------------------------------------
//----------------------------------- DOM elements -------------------------------------------
//--------------------------------------------------------------------------------------------

export const gridRecipes = document.querySelector(".recipe__grid");
export const gridIngredients = document.querySelector(".searchedtag__list[data-category='ingredients']");
export const gridAppliances = document.querySelector(".searchedtag__list[data-category='appliances']");
export const gridUstensils = document.querySelector(".searchedtag__list[data-category='ustensils']");
export const mainSearchInput = document.querySelector(".mainsearch__input");
export const searchedTagsInputs = document.querySelectorAll(".searchedtag__input");
const wrapperSearchedTag = document.getElementsByClassName("searchedtag__wrapper");
const searchedTagButtons = document.getElementsByClassName("searchedtag__list__button");

//--------------------------------------------------------------------------------------------
//--------------------------------- Global variables -----------------------------------------
//--------------------------------------------------------------------------------------------

//the tags categories (used to loop on these)
export const tagsCategories = { ingredients: gridIngredients, appliances: gridAppliances, ustensils: gridUstensils };

//the dualList and the table used as intermediate stages for actualization during filtering
export let listRecipes = new DualLinkedList("recipes");
export let tagsTable = new TagsTable();
tagsTable.addSubTable("ingredients");
tagsTable.addSubTable("appliances");
tagsTable.addSubTable("ustensils");

//the table to be search in during the filtering processes (both recipe and tags)
export const searchableTable = [["index0"]];
//the table containig all the criteria to filter
export let searchedInputs = { mainSearch: [], ingredients: [], appliances: [], ustensils: [] };

//--------------------------------------------------------------------------------------------
//--------------------------------- Data loading ------------------------------------------
//--------------------------------------------------------------------------------------------

//browses the JSON table to include each recipe to the page and features
for (let recipe of recipes) {
  //creates the html elements and inserts in the DOM
  gridRecipes.append(recipeElementGenerator(recipe));
  //fills the list with all the recipe's id
  listRecipes.insertAtBeginning("shown", recipe.id);
  //fills the 3 tables of tags
  for (let item of recipe.ingredients) {
    tagsTable["ingredients"].importTag(item.ingredient);
  }
  tagsTable["appliances"].importTag(recipe.appliance);
  for (let item of recipe.ustensils) {
    tagsTable["ustensils"].importTag(item);
  }
  //fills the table to be searched in by the algoritm
  searchableTableFilling(recipe);
}

//--------------------------------------------------------------------------------------------
//--------------------------------- Event listeners ------------------------------------------
//--------------------------------------------------------------------------------------------

for (let wrapper of wrapperSearchedTag) {
  const icon = wrapper.querySelector(".searchedtag__icon");
  const grid = wrapper.querySelector(".searchedtag__list");
  const input = wrapper.querySelector(".searchedtag__input");

  //on focus on input : opens the tags grid
  input.addEventListener("focus", function () {
    tagsUpdatingGridDisplay(true, input, icon, grid);
    input.classList.toggle("searchedtag__input--noshadow", true);
  });

  // each input on input resets the error status and updates the available tags
  input.addEventListener("input", function (event) {
    input.setCustomValidity("");
    tagsUpdatingAvailability(input);
    tagsUpdatingGridDisplay(true, input, icon, grid);
  });

  //manages the keyboard actions on the input (ESC, ENTER, ↓)
  input.addEventListener("keydown", function (event) {
    if (event.which === 40) {
      //down arrow ↓
      event.preventDefault();
      tagsUpdatingGridDisplay(true, input, icon, grid);
      tagKeyboardNavigation(grid);
    } else if (event.which === 27) {
      //press ESC => close the list of tags suggestion
      event.preventDefault();
      tagsUpdatingGridDisplay(false, input, icon, grid);
    } else if (event.which === 13) {
      //press ENTER => check the input and selects the corresponding tag (if it exists)
      tagsSelectionInput(input);
    }
  });

  //gives the focus to the input and toggle the grid display status
  icon.addEventListener("click", function () {
    if (icon.classList.contains("searchedtag__icon--opened")) {
      input.focus();
      tagsUpdatingGridDisplay(false, input, icon, grid);
    } else {
      input.focus(); // it will open the grid
    }
  });

  //if the container looses the focus : closes the grid
  wrapper.addEventListener("focusout", function (event) {
    if (!this.contains(event.relatedTarget)) {
      tagsUpdatingGridDisplay(false, input, icon, grid);
      input.classList.toggle("searchedtag__input--noshadow", false);
    }
  });
}

//manages the action to do with the searched tags buttons
for (let button of searchedTagButtons) {
  button.addEventListener("click", function (event) {
    tagsSelectionClick(event.target);
  });
}

//update the displayed recipes on each mainSearch Input
mainSearchInput.addEventListener("input", function (event) {
  searchedInputsUpdating("mainSearch", null, event.target.value);
});
