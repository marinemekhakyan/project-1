
var ingredients = "";
var cuisine = "";

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
    
                var thumbnailDiv = $("<div>");
                thumbnailDiv.attr("class", "thumbnail");
    
                var img = $("<img>");
                
                
                img.attr("src", response.results[i].thumbnail);
                console.log(response.results[i].thumbnail)

                
                
                
                $("#second-page").append(rowDiv.append(colDiv.append(thumbnailDiv.append(img))))
            }
            

        
        })


    });
})






