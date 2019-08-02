$("#buttonArea").on("click", ".btn", function () {
    var x = $(this).attr("data");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=AIzaSyB6yootXbI653xumq1b48N-PYvx-87cNQE&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"

    }).done(function (response) {
        console.log(response);

        var results = response.data;
    
