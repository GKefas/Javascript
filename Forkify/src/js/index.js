import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

import '.././sass/main.scss';

import '.././img/favicon.png';
import '.././img/logo.png';

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
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW Results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // 1) Update the recipe servings (in state)
  model.updateServings(newServings);

  // 2) Update the view
  recipeView.render(model.state.recipe);
};

const init = function () {
  // Set eventHandler to recipe Component
  recipeView.addHandlerRender(controlRecipes);

  // Set eventHandler to Servings +/- buttons
  recipeView.addHandlerUpdateServings(controlServings);

  // Set eventHandler to search button
  searchView.addHandlerSearch(controlSearchResults);

  // Set eventHandler to pagination buttons
  paginationView.addHandlerCLick(controlPagination);
};

init();
