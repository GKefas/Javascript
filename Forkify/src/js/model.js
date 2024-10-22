import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helpers';
const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    // Structure from returned api call Json object:
    // data : {
    //    data : {
    //       recipe : {
    //          ....
    //       }
    //    }
    //    status : ""
    // }
    const { recipe } = data.data;

    // Removing _ and Replace with Camel Notation keys of Object
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      bookmarked: false,
    };

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
  } catch (err) {
    throw err;
  }
};

const loadSearchResults = async function (query) {
  try {
    // 1) HTTP Request (GET)
    state.search.query = query;
    const data = await getJSON(`${API_URL}/?search=${query}`);

    // Structure from returned api call Json object:
    // data : {
    //    data : {
    //        recipes : [{...},{...}+]
    //    },
    //    status : String,
    //    results : Number
    // }
    const { recipes } = data.data;

    // 2) Removing _ and Replace with Camel Notation keys of Object and store it to state
    state.search.results = recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });

    // 3) Set page to 1
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

const updateServings = function (newServings) {
  if (Object.keys(state.recipe).length === 0) return;
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQt = oldQt * newServings / oldServings
  });
  state.recipe.servings = newServings;
};

const addBookmark = function (recipe) {
  // Add bookmark to state
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

const removeBookmark = function (id) {
  // Delete bookmark based on ID
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};

export {
  state,
  loadRecipe,
  loadSearchResults,
  getSearchResultsPage,
  updateServings,
  addBookmark,
  removeBookmark,
};
