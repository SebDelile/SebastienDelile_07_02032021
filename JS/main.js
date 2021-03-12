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

const gridRecipes = document.querySelector(".recipe__grid");
export const gridIngredients = document.getElementById("list-ingredients");
export const gridAppliances = document.getElementById("list-appliances");
export const gridUstensils = document.getElementById("list-ustensils");
const inputIngredients = document.getElementById("input-ingredients");
const inputAppliances = document.getElementById("input-appliances");
const inputUstensils = document.getElementById("input-ustensils");
const wrapperTagSearch = document.getElementsByClassName("tagsearch__wrapper");
export const wrapperSelectedTag = document.querySelector(".tag__wrapper");
const tagSearchButtons = document.getElementsByClassName("tagsearch__list__button");

//--------------------------------------------------------------------------------------------
//--------------------------------- Global variables -----------------------------------------
//--------------------------------------------------------------------------------------------

//the dualLists used as intermediate stage for actualization during filtering
export let listRecipes = new DualLinkedList("recipes");
export let listIngredients = new DualLinkedList("ingredients");
export let listAppliances = new DualLinkedList("appliances");
export let listUstensils = new DualLinkedList("ustensils");


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
  tagsImport(recipe);
  //fills the table to be searched in by the algoritm
  searchedTableFilling(recipe);
}


//--------------------------------------------------------------------------------------------
//--------------------------------- Event listeners ------------------------------------------
//--------------------------------------------------------------------------------------------

//manages the opening/closing of the tags search suggestions : focus in the wrapper or click on the icon
for (let wrapper of wrapperTagSearch) {
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
for (let button of tagSearchButtons) {
  button.addEventListener("click", function (event) {
    const tagname = event.target.textContent;
    const category = event.target.dataset.category;
    let list;
    switch (category) {
      case "ingredients":
        list = listIngredients;
        break;
      case "appliances":
        list = listAppliances;
        break;
      case "ustensils":
        list = listUstensils;
        break;
    }
    //const category = event.target.parentNode.parentNode.getAttribute("id").slice(5) //id of the grandparent <ul> is "list-****", so slice leaves the correcte category name
    tagSelection(tagname, list);
  });
}

