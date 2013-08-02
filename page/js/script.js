function callAPI(category, url, container) {
    container.removeClass('errorClass');
    container.html('<img src="/img/waiting.gif">');

    ga('send', 'event', 'tryit', category, url);

    var ajaxCall = $.get(url)
        .done(function(data) {
            container.text(JSON.stringify(data));
        })
        .fail(function(data, state, message) {
            container.addClass('errorClass');
            container.text(ajaxCall.responseText);
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