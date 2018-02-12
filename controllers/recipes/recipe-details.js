import * as RecipeListController from './recipes-list.js';
import * as RecipesService from './recipes-service.js';

function getFirstRecipeKey(obj) {
    for (var key in obj) {
        return key;
    }
}

function renderDefaultRecipe(recipes, key) {
    var firstRecipe = recipes[key];
    $('#recipe-image').attr("src", firstRecipe.imgUrl);
    $('#recipe-time').text(firstRecipe.readyIn);
    $('#recipe-title').text(firstRecipe.name).attr('data-key', key);
    $('#recipe-decription').text(firstRecipe.description)

    var $ingrList = $('#ingredients-list');
    $ingrList.empty()
    firstRecipe.ingredients.forEach(function (ingr) {
        var $li = $('<li>');
        var $spn = $('<span>').text(ingr);
        $li.append($spn);
        $ingrList.append($li);
    })
}

export function init(recipes) {

    //rendering a particular recipe, in this case the first recipe in an object
    renderDefaultRecipe(recipes, getFirstRecipeKey(recipes));
    // manage recipe: registering the eventlisteners for creating, removing and editing a recipe;
    registerManageRecepeEvents()
    //autocomplete search in the header
    findRecipe(recipes);
}

// manage recipe: registering the eventlisteners for creating, removing and editing a recipe;
function registerManageRecepeEvents() {
    registerEdit();
    registerAdd();
    registerRemove();
}
function registerRemove(){
    $('#remove-recipe').on('click', function () {
        var result = confirm("Want to delete?");

        if (result) {
            var recipeKey = $('#recipe-title').attr('data-key');
            RecipesService.deleteRecipe(recipeKey);
            alert('Recipe successefully deleted! Reload the page!')
            location.reload();
        }
    })
}
function registerEdit(){
    $("#edit-recipe").on('click', function () {
        $('#modalEdit').show();

        var title = $('#recipe-title').text();
        var desc = $('#recipe-decription').text();
        var imgUrl = $('#recipe-image').attr('src');
        var readyIn = $('#recipe-time').text();
        var ingr = (function () {
            var optionTexts = [];

            $("#ingredients-list li span").each(function () {
                optionTexts.push($(this).text())
            })
            var text = optionTexts.join('\n');
            return text
        })();

        $('#title-edit').val(title);
        $('#readyin-edit').val(readyIn);
        $('#image-url-edit').val(imgUrl);
        $('#description-edit').val(desc);
        $('#ingredients-edit').val(ingr)
        $('#edit-recipe-image').attr('src', imgUrl);


        $('#edit-real-recipe').on('click', function () {
            var obj = {};
            obj['description'] = $('#description-edit').val();
            obj['ingredients'] = $('#ingredients-edit').val().split('\n');
            obj['imgUrl'] = $('#image-url-edit').val();
            obj['name'] = $('#title-edit').val();
            obj['readyIn'] = $('#readyin-edit').val();

            var key = $('#recipe-title').attr('data-key');

            RecipesService.editRecipe(key, obj).then(function () {
                $('#modalEdit').hide();
                alert('Recipe Successefully edited. Reload The Page!')
                location.reload();
            });

        })

        $('#image-url-edit').change(function () {
            var srcImg = $(this).val();
            $('#edit-recipe-image').attr('src', srcImg)
        });

        $('#close-edit').on('click', function () {
            $('#modalEdit').hide();

        })
    })
}
function registerAdd() {
    $('#add-recipe').on('click', function () {
        $('#myModal').show();

        $('#add-real-recipe').on('click', function () {
            var name = $('#title-input').val();
            var readyIn = "Ready in " + $('#readyin-input').val();
            var img = $('#image-url-input').val();
            var desc = $('#description-input').val();
            var ingr = $('#ingredients-input').val();
            ingr = ingr.split("\n");

            RecipesService.createRecipe({
                name: name,
                description: desc,
                ingredients: ingr,
                readyIn: readyIn,
                imgUrl: img
            }).then(function (msg) {
                alert('Recipe was created successefully ! Reload the page!');
                location.reload();

                // $('#myModal').hide();
                console.log(msg);
            }).catch(function (err) {
                console.log(err);
            });
        });

        $('#image-url-input').change(function () {
            var srcImg = $(this).val();
            $('#add-recipe-image').attr('src', srcImg)
        });
        $('#close-add').on('click', function () {
            $('#myModal').hide();
        });
    });
}

//autocomplete search in the header
function findRecipe(recipes) {
    $('#find-recipe').on('click', function () {
        var title = $('#search-recipe').val();
        for (var key in recipes) {
            if (recipes[key].name.trim() == title.trim()) {
                renderDefaultRecipe(recipes, key);
                break;
            }
        }
    })
}