
var ingredients = "";
var cuisine = "";
$(document).ready(function () {
    $(".btn").on("click", function (event) {
        event.preventDefault();

        cuisine = $("#cuisine-input").val().trim();
        ingredients = $("#user-ingredients").val().trim();

        var queryURL = ("https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?i=" + ingredients + "&q=" + cuisine + "&p=1");

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        })

    });
})
