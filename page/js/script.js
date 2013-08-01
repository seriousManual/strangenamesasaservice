function callAPI(url, container) {
    container.removeClass('errorClass');

    $.get(url)
        .done(function(data) {
            container.text(JSON.stringify(data));
        })
        .fail(function(data, state, message) {
            container.addClass('errorClass');
            container.text(message);
        })
}

$(document).ready(function() {
    $('#getName').click(callAPI.bind(null, '/api/name', $('#getNameRes')));
    $('#getAlliteration').click(callAPI.bind(null, '/api/alliteration', $('#getAlliterationRes')));
    $('#getAlliterationLetter').click(function() {
        var letter = $('#letter').val();

        if(letter) {
            callAPI('/api/alliteration/' + letter, $('#getAlliterationLetterRes'));
        }
    });
});