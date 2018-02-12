import {init as recipesListInit} from './recipes-list.js';
import {init as recipesDetailsInit} from './recipe-details.js';
import {getRecipes} from './recipes-service.js';

export function init() {

    getRecipes().then(function (result) {
        $('#modal-and-button').load('./views/recipes/recipes-list.html',function(){
            $(this).ready(function(){
                recipesListInit(result); 

            })
        })

        $('.recipe-details-component').load('./views/recipes/recipe-details.html',function(){
            $(this).ready(function(){
                recipesDetailsInit(result); 
            })
        })
    })
   
}

