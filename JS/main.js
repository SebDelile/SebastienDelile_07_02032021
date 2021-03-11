//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

import { DualLinkedList, ListNode } from "./modules/dual_linked_list.js";
import { recipes } from "./modules/recipes_table.js";
import { recipeElementGenerator } from "./modules/recipe_element_generator.js";
import { tagsImport } from "./modules/tags_import.js";
import { searchedTableFilling } from "./modules/searched_table_filling.js";
import { searchAlgoritm } from "./modules/search_algoritm.js";
import { tagSelection } from "./modules/tag_selection.js";

//--------------------------------------------------------------------------------------------
//----------------------------------- DOM elements -------------------------------------------
//--------------------------------------------------------------------------------------------

const recipesGrid = document.querySelector(".recipe__grid");
export const ingredientsGrid = document.getElementById("list-ingredients");
export const appliancesGrid = document.getElementById("list-appliances");
export const ustensilsGrid = document.getElementById("list-ustensils");
const ingredientsInput = document.getElementById("input-ingredients");
const appliancesInput = document.getElementById("input-appliances");
const ustensilsInput = document.getElementById("input-ustensils");
const tagSearchWrappers = document.getElementsByClassName("tagsearch__wrapper");
export const selectedTagWrapper = document.querySelector(".tag__wrapper");

//--------------------------------------------------------------------------------------------
//--------------------------------- Global variables -----------------------------------------
//--------------------------------------------------------------------------------------------

//the dualLists used as intermediate stage for actualization during filtering
export let recipesList = new DualLinkedList();
export let ingredientsList = new DualLinkedList();
export let appliancesList = new DualLinkedList();
export let ustensilsList = new DualLinkedList();

//--------------------------------------------------------------------------------------------
//--------------------------------- Data loading ------------------------------------------
//--------------------------------------------------------------------------------------------

//browses the JSON table to include each recipe to the page and features
for (let recipe of recipes) {
  //creates the html elements and inserts in the DOM
  recipesGrid.append(recipeElementGenerator(recipe));
  //fills the list with all the recipe's id
  recipesList.insertAtBeginning("shown", recipe.id);
  //fills the 3 tables of tags
  tagsImport(recipe);
  //fills the table to be searched in by the algoritm
  searchedTableFilling(recipe);
}

//--------------------------------------------------------------------------------------------
//--------------------------------- Event listeners ------------------------------------------
//--------------------------------------------------------------------------------------------

//manages the opening/closing of the tags search suggestions : focus in the wrapper or click on the icon
for (let wrapper of tagSearchWrappers) {
  wrapper.addEventListener("focusin", function () {
    wrapper.querySelector(".tagsearch__list").style.display = "grid";
  });
  wrapper.addEventListener("focusout", function (event) {
    if (!this.contains(event.relatedTarget)) {
      wrapper.querySelector(".tagsearch__list").style.display = "none";
    }
  });
  wrapper.querySelector(".tagsearch__icon").addEventListener("click", function(event) {
    event.target.parentNode.querySelector(".tagsearch__input").focus()
  })
}

//gives the actions to do when a tag is choosen in the list of suggestions
for (let button of ingredientsGrid.getElementsByClassName("tagsearch__list__button")) {
  button.addEventListener("click", function (event) {
    tagSelection(event.target.textContent, "ingredients");
  });
}
for (let button of appliancesGrid.getElementsByClassName("tagsearch__list__button")) {
  button.addEventListener("click", function (event) {
    tagSelection(event.target.textContent, "appliances");
  });
}
for (let button of ustensilsGrid.getElementsByClassName("tagsearch__list__button")) {
  button.addEventListener("click", function (event) {
    tagSelection(event.target.textContent, "ustensils");
  });
}

