import * as model from './model';
import { TIMEOUT_SEC } from './config';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';

import '.././sass/main.scss';

import '.././img/favicon.png';
import '.././img/logo.png';

if (module.hot) module.hot.accept;

const controlRecipes = async function () {
  try {
    // 1) Load from # in the page url
    const id = window.location.hash.slice(1);
    if (!id) return;

    // 2) Set Spinner until task is done and fulfilled
    recipeView.renderSpinner();

    // 3) Load Recipe
    await model.loadRecipe(id);

    // 4) Render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 1) Take search value from input element if there isnt then return
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();

    // 2) Load data from API and take them from state Object
    await model.loadSearchResults(query);

    // 3) Render Results
    resultsView.render(model.state.search.results);
  } catch (err) {
    resultsView.renderError(
      `Searching recipes took too long! Timeout after ${TIMEOUT_SEC} seconds`
    );
  }
};

controlSearchResults();

const init = function () {
  // Set eventHandler to recipe Component
  recipeView.addHandlerRender(controlRecipes);

  // Set eventHandler to search button
  searchView.addHandlerSearch(controlSearchResults);
};
init();
