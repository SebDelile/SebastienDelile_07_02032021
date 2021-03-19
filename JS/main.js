//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

import { DualLinkedList, ListNode } from "./modules/dual_linked_list.js";
import { recipes } from "./modules/recipes_table.js";
import { recipeElementGenerator } from "./modules/recipe_element_generator.js";
import { searchableTableFilling } from "./modules/searchable_table_filling.js";
//import { searchAlgoritm } from "./modules/search_algoritm.js";
import { tagSelectionClick, tagSelectionInput } from "./modules/tag_selection.js";
import { tagsUpdatingAvailability, tagsUpdatingGridDisplay } from "./modules/tags_updating.js";
import { searchedInputsUpdating } from "./modules/searched_inputs_updating.js";
import { TagsTable } from "./modules/tags_table.js";
import {tagKeyboardNavigation} from "./modules/tags_keybord_nav.js"
import { norm } from "./modules/utils.js";

//--------------------------------------------------------------------------------------------
//----------------------------------- DOM elements -------------------------------------------
//--------------------------------------------------------------------------------------------

export const gridRecipes = document.querySelector(".recipe__grid");
const gridTags = document.getElementsByClassName("searchedtag__list");
export const gridIngredients = document.querySelector(".searchedtag__list[data-category='ingredients']");
export const gridAppliances = document.querySelector(".searchedtag__list[data-category='appliances']");
export const gridUstensils = document.querySelector(".searchedtag__list[data-category='ustensils']");
export const mainSearchInput = document.querySelector(".mainsearch__input");
export const searchedTagsInputs = document.querySelectorAll(".searchedtag__input");
const wrapperSearchedTag = document.getElementsByClassName("searchedtag__wrapper");
export const selectedTags = document.querySelector(".selectedtag");
//export const searchedTagItems = document.getElementsByClassName(".searchedtag__list__item");
const searchedTagButtons = document.getElementsByClassName("searchedtag__list__button");

//--------------------------------------------------------------------------------------------
//--------------------------------- Global variables -----------------------------------------
//--------------------------------------------------------------------------------------------

//the tags categories (used to loop on these)
export const tagsCategories = ["ingredients", "appliances", "ustensils"];
export const tagsCategoriesRelatedHtml = { ingredients: gridIngredients, appliances: gridAppliances, ustensils: gridUstensils };

//the dualList and table used as intermediate stage for actualization during filtering
export let listRecipes = new DualLinkedList("recipes");
export let tagsTable = new TagsTable();
tagsTable.addSubTable("ingredients");
tagsTable.addSubTable("appliances");
tagsTable.addSubTable("ustensils");

//the table to be search in during the filtering processes (both recipe and tags)
export const searchableTable = [["index0"]];
//the table containig all the constraint to filter
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

//manages the opening/closing of the tags search suggestions : focus in the wrapper or click on the icon
for (let wrapper of wrapperSearchedTag) {
  wrapper.addEventListener("focusin", function () {
    wrapper.querySelector(".searchedtag__list").style.display = "grid";
    tagsUpdatingGridDisplay(wrapper.querySelector(".searchedtag__input"));
  });
  wrapper.addEventListener("focusout", function (event) {
    if (!this.contains(event.relatedTarget)) {
      wrapper.querySelector(".searchedtag__list").style.display = "none";
      this.querySelector(".searchedtag__input").style.width = "";
    }
  });
  //gives focus to the input when click on the icon
  wrapper.querySelector(".searchedtag__icon").addEventListener("click", function (event) {
    event.target.parentNode.querySelector(".searchedtag__input").focus();
  });
}

for (let grid of gridTags) {
  grid.addEventListener("focusin", function () {
    tagKeyboardNavigation(grid);
  });
}

for (let searchedTagsInput of searchedTagsInputs) {
  searchedTagsInput.addEventListener("input", function (event) {
    //removes the tags that do not fit the input
    tagsUpdatingAvailability(event.target);
    tagsUpdatingGridDisplay(event.target);
  });
  //on tagsearch input validation : click on tag if it exists, else displays error
  searchedTagsInput.addEventListener("keydown", function (event) {
    event.target.setCustomValidity("");
    if (event.which === 13) {//press enter 
      tagSelectionInput(event.target);
    }
  });
}

//gives the actions to do when a tag is choosen in the list of suggestions
for (let button of searchedTagButtons) {
  button.addEventListener("click", function (event) {
    tagSelectionClick(event.target);
  });
}

//update the recipes lits on each mainSearch Input
mainSearchInput.addEventListener("input", function (event) {
  searchedInputsUpdating("mainSearch", null, event.target.value);
});
