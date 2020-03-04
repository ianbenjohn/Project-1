let search;
let mealsArray = [];
let mealSelectionArray = [];

const mealSearch = (search) => {
    $.ajax({
        url: "https://www.themealdb.com/api/json/v1/1/search.php?s="+search,
        method: "GET"
    }).then(function(response){
        mealsArray = response.meals;
        // console.log(mealsArray);
        /* display meal options from user search */
        $('#search-results').empty();
        $('#search-results-container').attr('style', 'display: block;');
        for (obj of mealsArray){
            // console.log(obj);
            // console.log("Meal ID: " + obj.idMeal);
            // console.log("Meal title: " + obj.strMeal);
            // console.log("Meal thumbnail: " + obj.strMealThumb);

            const recipeElement = $('<div>').attr('class', 'column is-3');
            const recipeLink = $('<a>');
            const recipeImg = $('<img>').attr('width', '200');
            recipeImg.attr('src', obj.strMealThumb);
            const recipePara = $('<p>').text(obj.strMeal);
            /* Place the new elements for the recipe on the page */
            $('#search-results').append(recipeElement);
            recipeElement.append(recipeLink);
            recipeLink.append(recipeImg);
            recipeLink.append(recipePara);
        };
        //hook to ingredients list
        //mealSelection("52773");
    });
};

const mealSelection = (selMealID) => {
    let selMealObj = mealsArray.find(mealsArray => mealsArray.idMeal === selMealID);

    console.log("Meal title: " + selMealObj.strMeal);
    console.log("Meal thumbnail: " + selMealObj.strMealThumb);
    for (let i = 1; i <= 20; i++){
        const ingredient = selMealObj["strIngredient" + i];
        const measurement = selMealObj["strMeasure" + i];
        if(ingredient !== "" && ingredient !== null){
            console.log("Ingredient: " + measurement + " of " + ingredient);
            mealSelectionArray.push({"ingredient": ingredient, "quantity": measurement});
        };
    };
};

const getIngredientListArray = () => {
    return mealSelectionArray;
};