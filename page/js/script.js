var $img = $('<img>').attr('src', '/img/waiting.gif');

function callAPI(category, url, container) {
    container.removeClass('errorClass');
    container.empty().append($img);

    var options = {
        url: url
    };

    var language = $('#langSelection').val();

    ga('send', 'event', 'tryit', category, url);

    if(language !== 'acc') {
        options.beforeSend = function(request) {
            request.setRequestHeader('Accept-Language', language);
        };
    }

    var ajaxCall = $.ajax(options)
        .done(function(data) {
            container.text(JSON.stringify(data));
        })
        .fail(function(data, state, message) {
            container.addClass('errorClass');
            container.text(ajaxCall.responseText);
        });
}

function fillLangSelect() {
    $.ajax({
        url: '/api/languages',
        dataType: 'json'
    })
    .done(function(data) {
        for(var i = 0; i < data.length; i++) {
            $('#langSelection').append(
                $('<option></option>').val(data[i]).text(data[i])
            );
        }
    });
}

function fillExample(url, container) {
    $.ajax({url: url, dataType: 'json', success: function(data) {
        console.log( data );
        container.text(data.name);
    }});
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

    fillLangSelect();
    fillExample('/api/name', $('#exampleOne'));
    fillExample('/api/alliteration', $('#exampleTwo'));
});