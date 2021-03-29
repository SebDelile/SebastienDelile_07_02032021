//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

import { ListRecipes, ListNode } from "./modules/list_recipes_class.js";
import { recipes } from "./modules/recipes_table.js";
import { recipeElementGenerator } from "./modules/recipe_element_generator.js";
import { searchableTableFilling } from "./modules/searchable_table_filling.js";
import { tagsSelectionClick, tagsSelectionInput } from "./modules/tags_selection.js";
import { tagsUpdatingAvailability, tagsUpdatingGridDisplay } from "./modules/tags_updating.js";
import { criteriaUpdating } from "./modules/criteria_updating.js";
import { TableTags } from "./modules/table_tags_class.js";
import { tagKeyboardNavigation } from "./modules/tags_keybord_nav.js";

//--------------------------------------------------------------------------------------------
//----------------------------------- DOM elements -------------------------------------------
//--------------------------------------------------------------------------------------------

export const gridRecipes = document.querySelector(".recipe__grid");
export const gridIngredients = document.querySelector(".searchedtag__grid[data-category='ingredients']");
export const gridAppliances = document.querySelector(".searchedtag__grid[data-category='appliances']");
export const gridUstensils = document.querySelector(".searchedtag__grid[data-category='ustensils']");
export const mainSearchInput = document.querySelector(".mainsearch__input");
export const searchedTagsInputs = document.querySelectorAll(".searchedtag__input");
const wrapperSearchedTag = document.getElementsByClassName("searchedtag__wrapper");
const searchedTagButtons = document.getElementsByClassName("searchedtag__grid__button");

//--------------------------------------------------------------------------------------------
//--------------------------------- Global variables -----------------------------------------
//--------------------------------------------------------------------------------------------

//the tags categories and their related grid html element (used to loop on these with for..in or for..of)
export const tagsCategories = { ingredients: gridIngredients, appliances: gridAppliances, ustensils: gridUstensils };

//the dualList and the table used as intermediate stages for actualization during filtering
//these classes contains most of the methods used to perform the filtering process
export let listRecipes = new ListRecipes("recipes");
export let tableTags = new TableTags();
tableTags.addSubTable("ingredients");
tableTags.addSubTable("appliances");
tableTags.addSubTable("ustensils");

//the table to be search in during the filtering processes (both recipe and tags), to be filled during data loading section.
//Index 0 is used to avoid data on index 0 and so to make the index to correspond to the recipe's ID
export const searchableTable = [["index0"]];
//the table containig all the criteria to filter
export let criteria = { mainSearch: [], ingredients: [], appliances: [], ustensils: [] };

//--------------------------------------------------------------------------------------------
//------------------------------------ Data loading ------------------------------------------
//--------------------------------------------------------------------------------------------

//browses the JSON table to include each recipe to the page and to initiate the list and table
for (let recipe of recipes) {
  //creates the html elements and inserts in the DOM
  gridRecipes.append(recipeElementGenerator(recipe));
  //fills the list with all the recipe's id
  listRecipes.insertAtBeginning("shown", recipe.id);
  //fills the 3 tables of tags
  for (let item of recipe.ingredients) {
    tableTags["ingredients"].importTag(item.ingredient);
  }
  tableTags["appliances"].importTag(recipe.appliance);
  for (let item of recipe.ustensils) {
    tableTags["ustensils"].importTag(item);
  }
  //fills the table to be searched in by the algoritm
  searchableTableFilling(recipe);
}

//--------------------------------------------------------------------------------------------
//--------------------------------- Event listeners ------------------------------------------
//--------------------------------------------------------------------------------------------

//update the displayed recipes on each input in the mainSearch bar
mainSearchInput.addEventListener("input", function (event) {
  criteriaUpdating("mainSearch", null, event.target.value);
});

//Events on the tags search area (lot of them)
for (let wrapper of wrapperSearchedTag) {
  const icon = wrapper.querySelector(".searchedtag__icon");
  const grid = wrapper.querySelector(".searchedtag__grid");
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

  //manages the keyboard actions on special inputs (ESC, ENTER, ↓)
  input.addEventListener("keydown", function (event) {
    if (event.which === 40) {
      //down arrow ↓
      event.preventDefault();
      tagsUpdatingGridDisplay(true, input, icon, grid);
      tagKeyboardNavigation(grid);
    } else if (event.which === 27) {
      //press ESC => close the grid of tags suggestion
      event.preventDefault();
      tagsUpdatingGridDisplay(false, input, icon, grid);
    } else if (event.which === 13) {
      //press ENTER => check the input and selects the corresponding tag (if it exists)
      tagsSelectionInput(input);
    }
  });

  //manages the action on click on the icon : gives the focus to the input and toggle the grid display status
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
      //console.log("event focusout main.js")
    }
  });
}

//deletes the selected tag when clicked
for (let button of searchedTagButtons) {
  button.addEventListener("mousedown", function (event) {
    console.log("event mousedown")
    event.preventDefault();
  });
  button.addEventListener("click", function (event) {
    console.log("event click before main.js")
    tagsSelectionClick(event.target);
    console.log("event click after main.js")
  });
}

document.addEventListener("focusin", function(event) {
  console.group(`focus moved to`);
  console.log(event.target);
  console.groupEnd()
})