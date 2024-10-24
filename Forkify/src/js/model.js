import { API_URL, RES_PER_PAGE, API_KEY } from './config';
import { AJAX } from './helpers';
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

const createRecipeObject = function (data) {
  const { recipe } = data.data;

  // Removing _ and Replace with Camel Notation keys of Object
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    bookmarked: false,
    ...(recipe.key && { key: recipe.key }),
  };
};

const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${API_KEY}`);

    // Structure from returned api call Json object:
    // data : {
    //    data : {
    //       recipe : {
    //          ....
    //       }
    //    }
    //    status : ""
    // }

    state.recipe = createRecipeObject(data);

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
    const data = await AJAX(`${API_URL}/?search=${query}&key=${API_KEY}`);

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
        ...(recipe.key && { key: recipe.key }),
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

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

const addBookmark = function (recipe) {
  // Add bookmark to state
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

const removeBookmark = function (id) {
  // Delete bookmark based on ID
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};

const uploadRecipe = async function (newRecipe) {
  try {
    // 1) Take Out ingredients of newRecipe Object to store them as Array
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      // Chain map over filtered array with ingredients Array : [ingredient-{i}][value]
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());

        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format'
          );

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    // 2) Send Post request
    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);

    // 3) Store to state if there is success Promise
    state.recipe = createRecipeObject(data);

    // 4) Add this new recipe to bookmarks
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

// TODO: ONLY FOR DEVELOPMENT
const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
clearBookmarks();

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

export {
  state,
  loadRecipe,
  loadSearchResults,
  getSearchResultsPage,
  updateServings,
  addBookmark,
  removeBookmark,
  uploadRecipe,
};
