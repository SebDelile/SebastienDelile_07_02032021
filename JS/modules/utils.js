//to be used to clean the searched table, the tags and the user's input in the search bar
export function norm(str) {
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // remove accents and diacritics
  str = str.toLowerCase();
  str = str.replace(/ /gi, "_")
  return str;
}

