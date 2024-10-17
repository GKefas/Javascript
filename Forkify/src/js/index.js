import * as model from './model';
import recipeView from './views/recipeView';
import '.././sass/main.scss';

import '.././img/favicon.png';
import '.././img/logo.png';

const controlRecipes = async function () {
  try {
    // Load from # in the page url
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Spinner until task is done and fulfilled
    recipeView.renderSpinner();

    // 1) Loading Recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
