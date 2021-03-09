//--------------------------------------------------------------------------------------------
//------------------------------ Import from modules -----------------------------------------
//--------------------------------------------------------------------------------------------

import { recipes } from "./modules/recipes_table.js";
import { recipeElementGenerator } from "./modules/recipe_element_generator.js";
import { tagsTablesGenerator } from "./modules/tags_tables_generator.js";
import { displayedStatusUpdate } from "./modules/displayed_status_update.js";
import { searchTableGenerator } from "./modules/search_table_generator.js";
import {searchAlgoritm} from "./modules/search_algoritm.js";

//--------------------------------------------------------------------------------------------
//----------------------------------- DOM elements -------------------------------------------
//--------------------------------------------------------------------------------------------

const recipesGrid = document.querySelector(".recipe__grid");
//the two tables being the same as the page display (used as intermediate stage for actualization during filtering)
export var displayedRecipes = [];
export var hiddenRecipes = [];
//same for each of the tag's categories
export var displayedIngredients = [];
export var hiddenIngredients = [];
export var displayedAppliances = [];
export var hiddenAppliances = [];
export var displayedUstensils = [];
export var hiddenUstensils = [];

//--------------------------------------------------------------------------------------------
//--------------------------------- Data loading ------------------------------------------
//--------------------------------------------------------------------------------------------

for (let recipe of recipes) {
  //imports the recipes from the json table, creates the html elements and inserts in the DOM
  recipesGrid.append(recipeElementGenerator(recipe));
  //fills the displayed table with all the recipe's id
  displayedRecipes.push(recipe.id);
  //generate the 3 lists of tags
  tagsTablesGenerator(recipe);
  //builds the table to be searched in by the algoritm
  searchTableGenerator(recipe);
}


//--------------------------------------------------------------------------------------------
//--------------------------------- Event listeners ------------------------------------------
//--------------------------------------------------------------------------------------------
