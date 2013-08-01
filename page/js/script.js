function callAPI(url, container) {
    $.get(url, function(data) {
        container.text(JSON.stringify(data));
    });
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