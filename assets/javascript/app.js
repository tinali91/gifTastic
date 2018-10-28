var heroes = ["Captain America", "Iron Man", "Batman", "Superman", "Wonder Woman", "Supergirl", "Batwoman", "Captain Marvel", "Scarlet Witch", "Green Arrow"];

//making buttons with each hero in the array
function heroButtons() {
    $("#hero-buttons").empty();
    for (var i = 0; i < heroes.length; i++) {
        var heroButton = $("<button>");
        heroButton.text(heroes[i]);
        heroButton.addClass("btn-info btn");
        // heroButton.attr("type", button);
        heroButton.attr("data-hero", heroes[i]);
        
        $("#hero-buttons").append(heroButton);
    }
}

heroButtons();

//adding a new hero to the array and populating it on the page
$("#submit-hero").on("click", function() {
    event.preventDefault();
    var newHero = $("#addHeroButton").val().trim();
    if (heroes.indexOf(newHero) <= 0) {
        heroes.push(newHero);
        heroButtons();
    } else {
        alert("That hero's already there, try a new one!")
    }
});

//adding gifs to the page when the hero buttons are clicked
$(document).on("click", ".btn-info", function() {
// $("button").on("click",function() {
    $("#hero-gifs").empty();
    var hero = $(this).attr("data-hero");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=0LyjiCGGMQTlRTQFwza9IRdPl84tP33Y&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data;
        console.log(results);

        for (var j = 0; j < results.length; j++) {
            var rating = results[j].rating;
            var newDiv = $("<div>");
            var p = $("<p>").text("Rating: " + rating);
            var heroImage = $("<img>");
            heroImage.attr("src", results[j].images.fixed_height.url);
            heroImage.attr("data-still", results[j].images.fixed_height_still.url);
            heroImage.attr("data-animate", results[j].images.fixed_height.url);
            heroImage.attr("data-state", "animate");
            heroImage.addClass("gif");
            
            newDiv.addClass("column");
            newDiv.append(p);
            newDiv.append(heroImage);

            $("#hero-gifs").append(newDiv);
            // $("#hero-gifs").append(p);
            // $("#hero-gifs").append(heroImage);
        }
    })
});

$(document).on("click",".gif", function() {
    var state = $(this).attr("data-state");
    console.log(state);
    if(state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    } else {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
})