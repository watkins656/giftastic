$(document).ready(function () {
    var topics = ['bicycling', 'rock climbing', 'kayaking', 'motorcycle'];
    renderButtons();
    $("#more-button").on("click", function (event) {
    get10More(currentTopic);
    });
    $("#submit-button").on("click", function (event) {
        // This is not working, but it works in my other programs?
        event.preventDefault();
        var val = $('#add-form').val();
        console.log(val);
        topics.push(val)
        renderButtons();
    })
    $(document).on("click", ".gif", function (event) {
        if (this.src == this.dataset.still) {
            console.log(event.currentTarget.src);
            event.currentTarget.src = this.dataset.animated;
        }
        else if (this.src == this.dataset.animated) {
            event.currentTarget.src = this.dataset.still;
        }

        console.log(this);
    });
    $(document).on("click", ".topic-button", function (event) {

        var topic = this.id;
        currentTopic = topic;
        
        get10(topic);
    });
var currentTopic = ''
    function get10More(topic) {
        console.log(topic);
        var key = 'owN6yyuCHqBbsEIP7ri7VD0htBk10YGn';
        var q = topic;
        var limit = 20;
        var rating = 'G'
        var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${q}&limit=${limit}&offset=0&lang=en`;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            for (i = 10; i < 20; i++) {
                var still = (response.data[i].images.fixed_width_still.url);
                var animated = (response.data[i].images.fixed_width.url);
                var rating = (response.data[i].rating);
                console.log(response.data[i].images);
                var img = `<span class='gif-span'><img class='gif' src=${still} data-animated=${animated} data-still=${still} data-image=${topic + i}><p>${rating}</p></span>`;
                $('#images').prepend(img);
            }
        });

    }
    
    function get10(topic) {
        var key = 'owN6yyuCHqBbsEIP7ri7VD0htBk10YGn';
        var q = topic;
        var limit = 10;
        var rating = 'G'
        var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${q}&limit=${limit}&offset=0&lang=en`;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            for (i = 0; i < 10; i++) {
                var still = (response.data[i].images.fixed_width_still.url);
                var animated = (response.data[i].images.fixed_width.url);
                var rating = (response.data[i].rating);
                console.log(response.data[i].images);
                var img = `<span class='gif-span'><img class='gif' src=${still} data-animated=${animated} data-still=${still} data-image=${topic + i}><p>${rating}</p></span>`;
                $('#images').prepend(img);
            }
        });

    }
    
    function renderButtons() {
        $('#buttons').empty();
        topics.forEach(el => {
            var topicButton = `<button class='btn topic-button' id='${el}'>${el}</button>`;
            $('#buttons').append(topicButton);
        })
    }

});