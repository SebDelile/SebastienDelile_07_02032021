//--------------------------------------------------------------------------------------------
//----------------------------- HTML ELEMENT TEMPLATE ----------------------------------------
//--------------------------------------------------------------------------------------------
/*
<div class="recipe__wrapper col-4">
<a class="recipe card" href="recipe-proto.html">
  <img class="recipe__img card-img-top" src="public/img/recipe-pic.jpg" alt="photo de présentation de la recette" />
  <div class="recipe__body card-body">
    <div class="recipe__header">
      <h3 class="recipe__title card-title">Titre de la recette</h3>
      <p class="recipe__clock">XXmin</p>
    </div>
    <div class="recipe__text card-text row no-gutters">
      <ul class="recipe__ingredients__list col">
        <li class="recipe__ingredients"><strong>Ingredient1:</strong> quantité</li>
        <li class="recipe__ingredients"><strong>Ingredient2:</strong> quantité</li>
        <li class="recipe__ingredients"><strong>Ingredient3:</strong> quantité</li>
      </ul>
      <p class="recipe__description col">
        Description de la recette.
      </p>
    </div>
  </div>
</a>
</div>
*/
//--------------------------------------------------------------------------------------------
//----------------------------------- Export(s) ----------------------------------------------
//--------------------------------------------------------------------------------------------

export function recipeElementGenerator(recipe) {
  let element = document.createElement("div");
  element.classList.add("recipe__wrapper", "col-4");
  element.setAttribute("id", `recipes-${recipe.id}`);
  let elementStringHTML = `
    <a class="recipe card" href="recipe-proto.html">
        <img class="recipe__img card-img-top" src="public/img/recipe-pic.jpg" alt="photo de présentation de la recette" />
        <div class="recipe__body card-body">
            <div class="recipe__header">
                <h3 class="recipe__title card-title">${recipe.name}</h3>
                <p class="recipe__clock">${recipe.time}min</p>
            </div>
            <div class="recipe__text card-text row no-gutters">
                <ul class="recipe__ingredients__list col">`;
  for (let item of recipe.ingredients) {
    const quantity = item.quantity ? `: ${item.quantity}` : "";
    const unit = item.unit ? ` ${item.unit}` : "";
    elementStringHTML += `<li class="recipe__ingredients"><strong>${item.ingredient}</strong>${quantity}${unit}</li>`;
  }
  elementStringHTML += `
                </ul>
                <p class="recipe__description col">${recipe.description}</p>
            </div>
        </div>
    </a>`;
  element.innerHTML = elementStringHTML;
  return element;
}
