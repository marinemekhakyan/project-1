var ingredients = "";
var cuisine = "";

// new Glider(document.querySelector('.glider'), {
//     slidesToShow: 1,
//     draggable: true,
//     dots: '#dots',
//     arrows: {
//       prev: '.glider-prev',
//       next: '.glider-next'
//     }
//   });


$(document).ready(function () {
    
    $("#second-page").hide();

    $(".btn").on("click", function (event) {
        event.preventDefault();
        $("#main-container").hide();
        $("#second-page").show();
        
        cuisine = $("#cuisine-input").val().trim();
        ingredients = $("#user-ingredients").val().trim();
        
        var queryURL = ("https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?i=" + ingredients + "&q=" + cuisine + "&p=1");
        
        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "json",
        }).then(function (response) {
            console.log(response);
            
            // var results = response.data;
            var rowDiv = $("<div>");
            rowDiv.addClass("row");

            //will loop through 9 images
            for (var i = 0; i < 9; i++) {
               
                //creating a new div
                var colDiv = $("<div>");

                //putting these in a column of three
                colDiv.attr("class","col-md-4");
    
                var thumbnailDiv = $("<a>");
                thumbnailDiv.attr("class", "thumbnail");
                thumbnailDiv.attr("href", response.results[i].href);
                thumbnailDiv.attr("target", "_blank");

    
                var img = $("<img>");
                img.attr("src", response.results[i].thumbnail);
                console.log(response.results[i].thumbnail)

                var recipeTitle = $("<p>");
                recipeTitle.attr("class", "title");
                recipeTitle = response.results[i].title;
                console.log(recipeTitle)

                var listIngredients = $("<p>");
                listIngredients.attr("class", "ingredients");
                listIngredients = response.results[i].ingredients;
                
                $("#second-page").append(rowDiv.append(colDiv.append(recipeTitle)));
                $("#second-page").append(rowDiv.append(colDiv.append(thumbnailDiv.append(img))));
                $("#second-page").append(rowDiv.append(colDiv.append(listIngredients)));
            }
            

        
        })



    });
})
