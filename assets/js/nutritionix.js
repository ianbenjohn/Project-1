const getNutrition = (ingredients) => {
    let ingredientStory = '';
    const queryUrl = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
    const NutritionixAppID = '3cff7c33';
    const NutritionixAppKey = 'bc57bf3815504c053f18cfd02f2518c9';
    const headerData = 
        {
            'Content-Type': 'application/json', 
            'accept': 'application/json',
            'x-app-id': NutritionixAppID, 
            'x-app-key': NutritionixAppKey,
            'x-remote-user-id': '0',
            'cache-control': 'no-cache',
        };
    for (ingredient of ingredients) {
        ingredientStory += `${ingredient.quantity} ${ingredient.ingredient} and `
    };
    $.ajax({
            async: true,
            crossDomain: true,
            url: queryUrl,
            method: 'POST',
            headers: headerData,
            data: JSON.stringify(
                {
                    "query": ingredientStory,
                }
            ),
        })
    .done(function(response) {
        console.log(response);
    });
};