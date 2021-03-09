export function stringFormat(string) {
    string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // remove accents and diacritics
    string = string.charAt(0).toUpperCase() + string.substr(1).toLowerCase(); // 1st char turns uppercase, other chars turn lowercase
    return string;
}