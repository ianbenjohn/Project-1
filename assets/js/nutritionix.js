const getNutrition = (ingredients) => {
    let ingredientStory = '';
    const queryUrl = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
    const NutritionixAppID = '3cff7c33';
    const NutritionixAppKey = 'bc57bf3815504c053f18cfd02f2518c9';
    const headerData = `Content-Type:application/json, x-app-id:${NutritionixAppID}, x-app-key:${NutritionixAppKey}`;
    for (ingredient of ingredients) {
        ingredientStory += `${ingredient.quantity} ${ingredient.ingredient},`
    };
    $.ajax({
        url: queryUrl,
        headers: headerData,
        request: 'GET',
        data:
            {
                query: ingredientStory,
            },
    }).then(console.log(response));
};