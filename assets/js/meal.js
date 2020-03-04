let search;
let mealsArray = [];
let mealSelectionArray = [];
let searchContainerEl = $('#search-results-container');
let recipeEl = $("#recipe");

const mealSearch = (search) => {
    $.ajax({
        url: "https://www.themealdb.com/api/json/v1/1/search.php?s="+search,
        method: "GET"
    }).then(function(response){
        let searchResultEl = $('#search-results');
        mealsArray = response.meals;

        /* display meal options from user search */
        searchResultEl.empty();
        searchContainerEl.attr('style', 'display: block;');
        recipeEl.attr("style", "display: none;");
        
        for (obj of mealsArray){
            const resultElement = $('<div>').attr('class', 'column is-3');
            const resultLink = $('<a id="' + obj.idMeal + '">');
            const resultImg = $('<img>').attr('width', '200');
            resultImg.attr('src', obj.strMealThumb);
            const resultPara = $('<p>').text(obj.strMeal);
            
            resultLink.attr("onclick", "recipeSelected(event)");
            resultLink.append(resultImg);
            resultLink.append(resultPara);
            resultElement.append(resultLink);
            /* Place the new elements for the recipe on the page */
            $('#search-results').append(resultElement);
        };
    });
};


function recipeSelected(event) {
    if(event.target.localName === "img" || event.target.localName === "p"){
        mealSelection(event.target.parentNode.id);
    }else{
        mealSelection(event.target.id);
    }    
}

const mealSelection = (selMealID) => {
    let selMealObj = mealsArray.find(mealsArray => mealsArray.idMeal === selMealID);
    var mealTitleEl = $("#title");
    var mealImgEl = $("#recipe_img");
    var ingredientEl = $("#ingredient");
    var measurementEl = $("#measurement");
    var instructionsEl = $("#instructions");

    searchContainerEl.attr('style', 'display: none;');
    recipeEl.attr("style", "display: block;");
    ingredientEl.empty();
    measurementEl.empty();

    mealTitleEl.text(selMealObj.strMeal);
    mealImgEl.attr("src", selMealObj.strMealThumb);

    instructionsEl.text(selMealObj.strInstructions);
    
    for (let i = 1; i <= 20; i++){
        const ingredient = selMealObj["strIngredient" + i];
        const measurement = selMealObj["strMeasure" + i];

        if(ingredient !== "" && ingredient !== null){
            var ingredientListItem = $("<li>");

            ingredientListItem.text(ingredient);
            ingredientEl.append(ingredientListItem);
            
            var measurementListItem = $("<li>");
            
            measurementListItem.text(measurement);
            measurementEl.append(measurementListItem);

            mealSelectionArray.push({"ingredient": ingredient, "quantity": measurement});
        }else{
            break;
        };
    };
    getNutrition(mealSelectionArray);
};