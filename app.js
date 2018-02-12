import * as HeaderController from './controllers/core/header.js';
import * as RecipesController from './controllers/recipes/recipes.js';
// import * as DBService from './services/db-service/database-service.js';


$(function() {
    $('header').load('./views/header.html',HeaderController.init);
    $('.app-container').load('./views/recipes/recipes.html',RecipesController.init);
});
