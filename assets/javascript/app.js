var heroes = ["Captain America", "Iron Man", "Batman", "Superman", "Wonder Woman", "Supergirl", "Batwoman", "Captain Marvel", "Scarlet Witch", "Green Arrow"];

//making buttons with each hero in the array
function heroButtons() {
    for (var i = 0; i < heroes.length; i++) {
        var heroButton = $("<button>");
        heroButton.text(heroes[i]);
        heroButton.addClass("button-info");
        // heroButton.attr("type", button);
        heroButton.attr("data-hero", heroes[i]);
        
        $("#hero-buttons").append(heroButton);
    }
}

heroButtons();

$("button").on("click",function() {
    $("#hero-gifs").empty();
    var hero = $(this).attr("data-hero");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=0LyjiCGGMQTlRTQFwza9IRdPl84tP33Y&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        var results = response.data;

        for (var j = 0; j < results.length; j++) {
            var rating = results[j].rating;
            var p = $("<p>").text("Rating: " + rating);
            var heroImage = $("<img>");
            heroImage.attr("src", results[j].images.fixed_height.url);;
            // heroImage.prepend(p);
            $("#hero-gifs").append(p);
            $("#hero-gifs").append(heroImage);
        }
    })
})