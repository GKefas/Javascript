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
    };
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

export { state, loadRecipe, loadSearchResults, getSearchResultsPage };
