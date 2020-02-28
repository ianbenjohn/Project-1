var search = "Teriyaki";
var mealsArray = [];
var mealSelectionArray = [];

$.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/search.php?s="+search,
    method: "GET"
}).then(function(response){
    mealsArray = response.meals;
    console.log(mealsArray);
    //display meal options from user search
    for (obj in mealsArray){
        console.log(obj);
        console.log("Meal ID: " + obj.idMeal);
        console.log("Meal title: " + obj.strMeal);
        console.log("Meal thumbnail: " + obj.strMealThumb);
    };
    mealSelection("52773");
});

function mealSelection(selMealID){
    var selMealObj = mealsArray.find(mealsArray => mealsArray.idMeal === selMealID);

    console.log("Meal title: " + selMealObj.strMeal);
    console.log("Meal thumbnail: " + selMealObj.strMealThumb);
    for (var i = 1; i <= 20; i++){
        var ingredient = selMealObj["strIngredient" + i];
        var measurement = selMealObj["strMeasure" + i];
        if(ingredient !== "" && ingredient !== null){
            console.log("Ingredient: " + measurement + " of " + ingredient);
            mealSelectionArray.push({"ingredient": ingredient, "quantity": measurement});
        }
    }
}

function getIngredientListArray(){
    return mealSelectionArray;
}