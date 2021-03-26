//--------------------------------------------------------------------------------------------
//----------------------------------- imports(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

import { searchableTable, tableTags, total } from "../main.js";
import { norm } from "./utils.js";

//--------------------------------------------------------------------------------------------
//------------------------------- Class definition -------------------------------------------
//--------------------------------------------------------------------------------------------

class Index {
  constructor() {
    for (let i = 1; i <= 16; i++) {
      this[i] = [];
    }
  }
  insertSubWords(word) {
    //takes the word and adds each possible subword to the index (max subword.length = 15)
    const wordLength = word.length;
    for (let i = 1; i <= wordLength || i < 16; i++) {
      //i is the subword length
      const startRange = wordLength - i;
      for (let j = 0; j <= startRange; j++) {
        //j is the starting position of subword in the word
        this.addWord(word.slice(j, j + i), i);
      }
    }
    if (wordLength >= 16) {
      //no need to collect subwords bigger than 15, there won't be so many to search so they can be put together, and naively searched
      for (let entry of this[16]) {
        if (entry.includes(word)) {
          //that will make a duplicate in the table, do not push it into
          return;
        }
      }
      //not found so push it into
      this[16].push(word);
    }
  }
  dichotomicSearch(word, wordLength) {
    //return an integer if word is found or an integer +/-0.5 if word is not found (integer = last tested position in the array)
    const dictionnary = this[wordLength];
    if (dictionnary.length === 0) {
      //dictionnary is empty, add to position 0
      return -0.5;
    }
    let lowerBound = 0;
    let upperBound = dictionnary.length - 1;
    let position;
    let checking;
    while (lowerBound <= upperBound) {
      position = Math.floor((upperBound + lowerBound) / 2);
      checking = dictionnary[position].localeCompare(word);
      if (checking === 0) {
        return position;
      } else if (checking > 0) {
        upperBound = position - 1;
      } else {
        lowerBound = position + 1;
      }
    }
    //if there is no match, adds or substracts 0.5 to pass the position where the word should be added
    position += checking > 0 ? -0.5 : 0.5;
    return position;
  }
  addWord(word, wordLength) {
    const position = this.dichotomicSearch(word, wordLength);
    if (position !== Math.floor(position)) {
      //word was not found so add word to the table at this position
      if (position === -0.5) {
        this[wordLength].unshift(word);
      } else if (position > this[wordLength].length) {
        this[wordLength].push(word);
      } else {
        this[wordLength].splice(Math.ceil(position), 0, word);
      }
    }
  }
}

//--------------------------------------------------------------------------------------------
//----------------------------- Intermediate stage(s) ----------------------------------------
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

//the method to fill the table is related to the filtering algorithm
//here is a naive method just to have something while testing other features

//add the recipe's info to the table
export function searchableTableFilling(recipe) {
  let element = {
    ingredients: [], // need to eliminate quantity and unit fields, see below
    appliances: [norm(recipe.appliance)], // as a table to be consistent with other tags, even if there is only one element inside
    ustensils: recipe.ustensils.map((el) => norm(el)),
    mainSearch: new Index()
  };
  norm(recipe.name).split("_").forEach(el => element.mainSearch.insertSubWords(el));
  //let string = norm(recipe.name);
  for (let index in recipe.ingredients) {
    element.ingredients.push(norm(recipe.ingredients[index].ingredient));
    norm(recipe.ingredients[index].ingredient).split("_").forEach(el => element.mainSearch.insertSubWords(el));
    //string += norm(recipe.ingredients[index].ingredient)
  }
  norm(recipe.description).split("_").forEach(el => element.mainSearch.insertSubWords(el));
  //string += norm(recipe.description);
  /*let index = 0;
  for (let i in element.mainSearch) {
    index += parseInt(i) * element.mainSearch[i].length
  }
  total.push([string.length, index]);*/
  searchableTable.push(element);
}
