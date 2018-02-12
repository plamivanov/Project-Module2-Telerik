import * as DbService from '../../services/db-service/database-service.js';

export function createRecipe(recipeDataObj) {
    return new Promise(function(resolve, reject) {
        DbService.createRecipe(recipeDataObj,function(data) {
            if (data == 'Successefully created!' ) {
                resolve('The recipes was saved successfully!');
            } else {
                reject(data);
                alert('Your are not allowed to write on the database!');
            }
        });
    });
}

export function editRecipe(id,obj) {
    return new Promise(function(resolve, reject) {
        DbService.editRecipe(id,obj,function(data) {
            if (data == 'Successefully edited!') {
                resolve('The recipes was saved successfully!');
            } else {
                reject('Recipe was not edited.You are not allowed to edit!');
                alert('You are not allowed to edit')
            }
        });
    });
}
export function getRecipes() {
    return new Promise(function(resolve, reject) {
        DbService.getAllRecipes(function(data){
            if (data) {
                resolve(data);
            } else {
                reject('error accessing the data from firebase');
            }
        });
    });
}

export function deleteRecipe(id) {
    return new Promise(function(resolve, reject) {
        DbService.deleteRecipeById(id, function(data) {
            console.log('delterRecipe' + data);
            if (data == 'successefully deleted') {
                resolve(`The recipe was deleted successfully!`);
                
            } else {
                // console.log(data);
                reject(data);
            }
        });
    });
}

