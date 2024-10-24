import * as model from './model';
import { MODAL_CLOSE_SECONDS } from './config';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';

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

    // 3) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 4) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 5) Load Recipe
    await model.loadRecipe(id);

    // 6) Render recipe
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
  recipeView.update(model.state.recipe);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddBookmark = function () {
  // 1.?) Add/remove the recipe as bookmarked if it isn't already
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  // Update UI
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // 1)Show load spinner
    addRecipeView.renderSpinner();

    // 2) Upload the new recipe data
    await model.uploadRecipe(newRecipe);

    // 3) Render recipe
    recipeView.render(model.state.recipe);

    // 4) Render Success message
    addRecipeView.renderMessage();

    // 5) Render bookmark View
    bookmarksView.render(model.state.bookmarks);

    // 6) Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // 7) Close form window after MODAL_CLOSE_SECONDS variable
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SECONDS * 1000);
  } catch (err) {
    addRecipeView.renderError(err);
  }
};
const init = function () {
  // Set eventHandler on load to add bookmarks from localStorage
  bookmarksView.addHandlerRender(controlBookmarks);
  // Set eventHandler to recipe Component
  recipeView.addHandlerRender(controlRecipes);

  // Set eventHandler to Servings +/- buttons
  recipeView.addHandlerUpdateServings(controlServings);

  // Set eventHandler to bookmark button
  recipeView.addHandlerAddBookmark(controlAddBookmark);

  // Set eventHandler to search button
  searchView.addHandlerSearch(controlSearchResults);

  // Set eventHandler to pagination buttons
  paginationView.addHandlerCLick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
