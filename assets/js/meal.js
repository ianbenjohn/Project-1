let search;
let mealsArray = [];
let mealSelectionArray = [];

const mealSearch = (searchTerm) => {
    $.ajax({
        url: "https://www.themealdb.com/api/json/v1/1/search.php?s="+searchTerm,
        method: "GET"
    }).then(function(response){
        mealsArray = response.meals;
        console.log(mealsArray);
        /* display meal options from user search */
        $('#search-results').empty();
        $('#search-results-container').attr('style', 'display: block;');
        if (mealsArray === null) {
            const searchFailedMsg = $('<p>').text('Sorry, no results were found. Try another search.');
            $('#search-results').append(searchFailedMsg);
        } else {
            /* Update search history listing with count of recipes returned */
            const recipesReturnedCount = `${searchTerm} (${mealsArray.length})`;
            // console.log(searchTerm);
            /* Get the search history object and update the count for this search */
            let searchHistory = JSON.parse(localStorage.getItem('search_history'));
            searchHistory[searchTerm].text = recipesReturnedCount;
            // console.log(searchHistory[searchTerm]);
            /* Save the history again */
            localStorage.setItem('search_history', JSON.stringify(searchHistory));

            const historyElement = document.querySelector('[data-search=' + searchTerm + ']');
            // console.log(historyElement);
            historyElement.innerHTML = recipesReturnedCount;

            /* Print each search result */
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
        }
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