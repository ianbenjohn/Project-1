/* Food groups from Nutritionix API
 https://docs.google.com/document/d/1_q-K-ObMTZvO0qUEAxROrN3bwMujwAN25sLHwJzliK0/edit#bookmark=id.o2dyqyfryvuc
*/
const foodGroups = {
    1: 'dairy',
    2: 'protein',
    3: 'fruit',
    4: 'vegetable',
    5: 'grain',
    6: 'fat',
    7: 'legume',
    8: '',
    9: '',
};

/* Get nutrition facts from Nutritionix API
    https://docs.google.com/document/d/1_q-K-ObMTZvO0qUEAxROrN3bwMujwAN25sLHwJzliK0/edit
*/
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
    const settings = {
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
    }
    $.ajax(settings).done(function(response) {
        /* Call function to print the ingredients and nutrition from the response */
        printIngredients(response);
    });
};

/* Display ingredients on page */
const printIngredients = (ingredientResponse) => {
    const nutritionBodyEl = $('#nutrition_body');
    nutritionBodyEl.empty();

    /* Define total amounts to be added up in the loop */
    let totalCalories = 0;
    const totalCaloriesEl = $('#total_cal');
    let totalWeight = 0;
    const totalWeightEl = $('#total_weight');

    /* Loop over ingredients in response and print them */
    for (let i=0; i<ingredientResponse.foods.length; i++) {
        const nutritionIngredientRow = $('<tr>');

        /* Quantity */
        const quantityData = $('<td>').text(ingredientResponse.foods[i].serving_qty);
        nutritionIngredientRow.append(quantityData);
        const quantityType = $('<td>').text(ingredientResponse.foods[i].serving_unit);
        nutritionIngredientRow.append(quantityType);

        /* Ingredient name */
        const foodName = $('<td>').text(ingredientResponse.foods[i].food_name);
        nutritionIngredientRow.append(foodName);

        /* Calories */
        const thisCalories = ingredientResponse.foods[i].nf_calories;
        totalCalories += thisCalories;
        const caloriesData = $('<td>').text(thisCalories);
        nutritionIngredientRow.append(caloriesData);

        /* Weight */
        const thisWeight = ingredientResponse.foods[i].serving_weight_grams;
        totalWeight += thisWeight;
        const weightData = $('<td>').text(thisWeight);
        nutritionIngredientRow.append(weightData);

        /* Get the food group from our object using the tag data */
        const foodGroup = foodGroups[ingredientResponse.foods[i].tags.food_group]
        const foodGroupEl = $('<td>').text(foodGroup);
        nutritionIngredientRow.append(foodGroupEl);
        nutritionBodyEl.append(nutritionIngredientRow); 
    };

    /* Update totals on page */
    totalCaloriesEl.text(`${totalCalories.toFixed(0)} cal`);
    totalWeightEl.text(`${totalWeight.toFixed(2)} g`);
};