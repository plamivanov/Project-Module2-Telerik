
var databaseLink = 'https://bulteam9.firebaseio.com/recipes/'

export function getAllRecipes(calbackFun) {
    $.ajax({
        url: databaseLink + '.json',
        type: "GET",
        success: function (data) {
          calbackFun(data);
        },
        error: function(error) {
          alert("error: no connection!");
          // calbackFun(error);
        }
      });
}

export function createRecipe(data,callbackfn) {
    $.ajax({
        url: databaseLink+'.json',
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log('Recipe was created successefully')
            callbackfn('Successefully created!')
        },
        error: function(error) {
          // alert("Error: "+ error);
          callbackfn('Your are not allowed to write on the database!');
        }
      });
}

export function deleteRecipeById(_id,calbackFun) {
    $.ajax({
        url: databaseLink+_id+'.json',
        type: "DELETE",
        success: function (data) {
          console.log("on success delete recipe id" + data)
          calbackFun('successefully deleted');
          // alert("success");
        },
        error: function(error) {
          console.log('error with delte in deltereRecipeId');
          // alert("error: "+error);
          calbackFun('Error with delete!You are not allowed to delete!');
        }
      });
}

export function editRecipe(_id,data,callbackfn) {
    $.ajax({
        url: databaseLink+_id+'.json',
        type: "PUT",
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
          callbackfn('Successefully edited!')
        },
        error: function(error) {
          callbackfn(error);
        }
      });
}
