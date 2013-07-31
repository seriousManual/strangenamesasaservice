var Dispatcher = require('./words/Dispatcher');
var Holder = require('./words/Holder');
var Loader = require('./words/Loader');

var myLoader = new Loader();

function bootstrap() {
    var nounHolder = new Holder();
    var adjectiveHolder = new Holder();

    myLoader.load(nounHolder, __dirname + '../resources/nouns');
    myLoader.load(adjectiveHolder, __dirname + '../resources/adjectives');

    return new Dispatcher(nounHolder, adjectiveHolder);
}

function getLanguage() {
    return 'en';
}

function send(name, language, res) {
    var result = {
        name: name,
        language: language
    };

    //TODO: set response header

    res.end(JSON.stringify(result));
}

function install(app) {
    var myDispatcher = bootstrap();

    app.get('/name', function(req, res, next) {
        var language = getLanguage(req);

        send(myDispatcher.name(language), language, res);
    });

    app.get('/palindrome/:letter?', function(req, res, next) {
        var language = getLanguage(req);

        send(myDispatcher.palindrome(language, req.params.letter) || null, language, res);
    });

    app.get('/languages', function(req, res, next) {

    });
}

module.exports.install = install;

//     /name
//     /palindrome
//     /palindrome/:letter