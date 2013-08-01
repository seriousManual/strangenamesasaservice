var $waiting = $('<img>').attr('src', '/img/waiting.gif');

function callAPI(category, url, container) {
    container.removeClass('errorClass');
    container.html('<img src="/img/waiting.gif">');

    ga('send', 'event', 'tryit', category, url);

    $.get(url)
        .done(function(data) {
                setTimeout(function() {
                    container.text(JSON.stringify(data));
                }, 2000);

        })
        .fail(function(data, state, message) {
            container.addClass('errorClass');
            container.text(message);
        })
}

$(document).ready(function() {
    $('#getName').click(callAPI.bind(null, 'name', '/api/name', $('#getNameRes')));
    $('#getAlliteration').click(callAPI.bind(null, 'alliteration', '/api/alliteration', $('#getAlliterationRes')));
    $('#getAlliterationLetter').click(function() {
        var letter = $('#letter').val();

        if(letter) {
            callAPI('alliterationLetter', '/api/alliteration/' + letter, $('#getAlliterationLetterRes'));
        }
    });
});