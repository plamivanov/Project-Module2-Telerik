import * as RecipesService from './recipes-service.js';

export function init(data) {

    renderRecipesList(data);
    toggleRecipesFromList(data);

}

function toggleRecipesFromList(data) {
    $('.recipes-list-container').on('click', '.foodBox', function () {
        $(this).toggleClass('active').siblings().removeClass('active');

        var key = $(this).attr('data-key');
        var currentRecipe = data[key];


        $('#recipe-image').attr("src", currentRecipe.imgUrl);
        $('#recipe-time').text(currentRecipe.readyIn);
        $('#recipe-title').text(currentRecipe.name).attr('data-key', key);
        $('#recipe-decription').text(currentRecipe.description)

        $('#ingredients-list').empty();

        currentRecipe.ingredients.forEach(function (ingr) {
            var $li = $('<li>');
            var $spn = $('<span>').text(ingr);
            $li.append($spn);
            $('#ingredients-list').append($li);
        })

    });
}

function renderRecipesList(recipes) {

    var autoCompleteList = [];
    var $container = $('#easyPaginate');
    var b = true;

    for (const key in recipes) {
        var $wrapper = $('<li>').addClass('foodBox').attr('data-key', key);
        if (b == true) {
            $wrapper.addClass('active');
        }
        var $foodBoxLeft = $('<div>').addClass('leftOfTheBox');
        var $foodBoxRight = $('<div>').addClass('rightOfTheBox');

        var $title = $('<h3>').addClass('nameOfRecipe');
        var $readyIn = $('<span>');
        var $imgUrl = $('<img>').addClass('recipeImage');

        $title.text(recipes[key].name);
        $readyIn.text(recipes[key].readyIn);
        $imgUrl.attr('src', recipes[key].imgUrl);

        $foodBoxLeft.append($title).append($readyIn);
        $foodBoxRight.append($imgUrl);

        $wrapper.append($foodBoxLeft);
        $wrapper.append($foodBoxRight);

        $wrapper.appendTo($container);

        autoCompleteList.push(recipes[key].name);
        b = false;
    }

    $('#easyPaginate').easyPaginate({
        paginateElement: 'li',
        elementsPerPage: 4,
        effect: 'climb',
        firstButton: false,
        lastButton: false
    });


    // Fill autocomplete list for search
    fillAutoCompleteList(autoCompleteList);
}

function fillAutoCompleteList(array) {
    var input = document.getElementById("search-recipe");
    new Awesomplete(input, {
        list: array
    });
}
