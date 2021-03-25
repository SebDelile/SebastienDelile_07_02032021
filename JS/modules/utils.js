//to be used to clean the searched table, the tags and the user's input in the search bar
export function norm(str) {
  // remove accents and diacritics and punctuation (do not remove "-" and "'")
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[@&"()\[\]\{\}<>_$*%§¤€£`+=\/\\|~°;:!,?#.]/g, ""); 
  str = str.toLowerCase();
  str = str.replace(/[ ']/g, "_").replace(/œ/g,"oe").replace(/æ/g,"ae")
  return str;
}