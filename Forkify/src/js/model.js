const state = {
  recipe: {},
};

const loadRecipe = async function (id) {
  try {
    const urlAPI = 'https://forkify-api.herokuapp.com/api/v2/recipes/';
    const res = await fetch(urlAPI + id);
    const data = await res.json();

    // Structure from returned api call Json object:
    // data : {
    //    data : {
    //       recipe : {
    //          ....
    //       }
    //    }
    //    status : ""
    // }
    // Guard clause about rejected Promise with ok = false
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
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
    alert(err);
  }
};

export { state, loadRecipe };
