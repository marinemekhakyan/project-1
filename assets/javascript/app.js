$(document).ready(function () {
    $(".display-4").on("click", function () {
        window.location.href = 'index.html';
    })
})


var ingredients = "";
var cuisine = "";

var groceryStore = $("#grocery-store");

$("#second-page").hide();
$("#map").hide();
$("#third-page").hide();

window.addEventListener('load', function () {
    new Glider(document.querySelector('.glider'), {
        slidesToShow: 1,
        draggable: true,
        dots: '#dots',
        speed: 100,
        arrows: {
            prev: '.glider-prev',
            next: '.glider-next'
        }
    });
})

//calling the initMap function to show the initial map page before user input. 

function initMap(lat, lng) {
    console.log('has been called');

    //if zip code is not provided, default location is Australia or whatever other lat/long we choose here
    if (!lat || !lng) {
        lat = -33.867;
        lng = 151.195;
    }

    //creating a variable for the user location and passing in above parameters
    var userLocation = new google.maps.LatLng(lat, lng);

    infowindow = new google.maps.InfoWindow();

    //
    map = new google.maps.Map(
        document.getElementById('map'), { center: userLocation, zoom: 15 }
    );
    //creating a pin with built-in geometry object
    createMarker({
        geometry: {
            location: {
                lat: lat,
                lng: lng
            }
        }
    });

    //calling the nearbyStores function (below) and passing in the lattitude and longitude to get an ajax response. This is another way of doing an ajax call. Below in the function we skip the ".then" part by adding return before $.ajax
    nearbyPlaces(lat, lng)
        .then(function (response) {

            //looping through the results array returned from the ajax call to display nearby stores
            for (var i = 0; i < response.results.length; i++) {
                var item = response.results[i]; //creating a variable to hold each result and to later pin on the map with createMarker function
                console.log(item);
                createMarker(item);
            }
        });
}
//actual pin dropping function

function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    //we probably won't need this part but it allows to add content to a specific place when clicked on its pin
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

//ajax call for Google Places API 
function nearbyPlaces(lat, lng) {

    return $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lng + "&radius=1500&type=store&keyword=grocery&key=AIzaSyAxLgF8nGcZXFMMIAzR9FOFtFXZtem5YlQ",
        method: "GET",
        dataType: "json"
    });
}

$(document).ready(function () {

    //creating variables for running the Google Geocode API
    var map;
    var service;
    var infowindow;

    $(".zip-submit").on("click", function (event) {
        event.preventDefault();

        var zipInput = $("#zip-input").val();
        //console.log(zipInput);
        //ajax call for Google Geocoding API

        $.ajax({
            url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipInput + "&key=AIzaSyAxLgF8nGcZXFMMIAzR9FOFtFXZtem5YlQ",
            method: "GET",
            dataType: "json",
        }).then(function (response) {
            // console.log(response);
            var lat = response.results[0].geometry.location.lat;
            var long = response.results[0].geometry.location.lng;
            // console.log('long:', long)
            // console.log('lat:', lat)
            initMap(lat, long);
        })

        $("#second-page").hide();
        $("#third-page").show();
        $("#map").show();
    });

    $(".main-button").on("click", function (event) {
        event.preventDefault();
        $("#main-container").hide();
        $(".carousel").hide();
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

                if (response.results[i].thumbnail === "") {
                    img.attr("src", "../images/carrots.jpg")
                }

                //Look into indexOf.. Same as index, take out of the array or splice

                //creating a new div
                var colDiv = $("<div>");

                //putting these in a column of three
                colDiv.attr("class", "col-md-4");

                var thumbnailDiv = $("<a>");
                thumbnailDiv.attr("class", "thumbnail");
                thumbnailDiv.attr("href", response.results[i].href);
                thumbnailDiv.attr("target", "_blank");

                var img = $("<img>");
                img.attr("src", response.results[i].thumbnail);
                img.attr("class", "results-img")
                console.log(response.results[i].thumbnail)

                var recipeTitle = $("<p>");
                recipeTitle.attr("class", "title");
                recipeTitle = response.results[i].title;
                console.log(recipeTitle)

                var listIngredients = $("<p>");
                listIngredients.attr("class", "ingredients");
                listIngredients = response.results[i].ingredients;

                $("#second-page").prepend(rowDiv.append(colDiv.append(recipeTitle)));
                $("#second-page").prepend(rowDiv.append(colDiv.append(thumbnailDiv.append(img))));
                $("#second-page").prepend(rowDiv.append(colDiv.append(listIngredients)));
            }
        })
    });

    $(".slider").slick({

        // normal options...
        infinite: false,

        // the magic
        responsive: [{

            breakpoint: 1230,
            settings: {
                slidesToShow: 1,
                infinite: true,
                width: 80,
            }

        }, {

            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                dots: true
            }

        }, {

            breakpoint: 300,
            settings: "unslick" // destroys slick

        }]
    });

})

