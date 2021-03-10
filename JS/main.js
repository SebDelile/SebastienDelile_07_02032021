//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

import { recipes } from "./modules/recipes_table.js";
import { recipeElementGenerator } from "./modules/recipe_element_generator.js";
import { tagsTablesGenerator } from "./modules/tags_tables_generator.js";
import { displayStatusUpdate } from "./modules/display_status_update.js";
import { searchedTableGenerator } from "./modules/searched_table_generator.js";
import {searchAlgoritm} from "./modules/search_algoritm.js";

//--------------------------------------------------------------------------------------------
//----------------------------------- DOM elements -------------------------------------------
//--------------------------------------------------------------------------------------------

const recipesGrid = document.querySelector(".recipe__grid");
//the two tables being the same as the page display (used as intermediate stage for actualization during filtering)
export var shownRecipes = [];
export var hiddenRecipes = [];
//same for each of the tag's categories
export var shownIngredients = [];
export var hiddenIngredients = [];
export var shownAppliances = [];
export var hiddenAppliances = [];
export var shownUstensils = [];
export var hiddenUstensils = [];

//--------------------------------------------------------------------------------------------
//--------------------------------- Data loading ------------------------------------------
//--------------------------------------------------------------------------------------------

for (let recipe of recipes) {
  //imports the recipes from the json table, creates the html elements and inserts in the DOM
  recipesGrid.append(recipeElementGenerator(recipe));
  //fills the displayed table with all the recipe's id
  shownRecipes.push(recipe.id);
  //generate the 3 lists of tags
  tagsTablesGenerator(recipe);
  //builds the table to be searched in by the algoritm
  searchedTableGenerator(recipe);
}


//--------------------------------------------------------------------------------------------
//--------------------------------- Event listeners ------------------------------------------
//--------------------------------------------------------------------------------------------
