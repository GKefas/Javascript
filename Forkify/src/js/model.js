import { API_URL } from './config';
import { getJSON } from './helpers';
const state = {
  recipe: {},
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
    // TODO:Temp error handling
    console.error(err);
  }
};

export { state, loadRecipe };
