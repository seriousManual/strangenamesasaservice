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

function sendError(error, req, res, next) {
    var result = {
        error: error.message
    };

    res.setHeader('Content-Type', 'application/json');
    res.send(error.statusCode, JSON.stringify(result));
}

function sendName(name, language, res) {
    var result = {
        name: name,
        language: language
    };

    res.setHeader('Content-Type', 'application/json');

    res.send(200, JSON.stringify(result));
}

function install(app) {
    var myDispatcher = bootstrap();

    app.get('/name', function(req, res, next) {
        var language = getLanguage(req);

        sendName(myDispatcher.name(language), language, res);
    });

    app.get('/alliteration/:letter?', function(req, res, next) {
        var language = getLanguage(req);

        sendName(myDispatcher.alliteration(language, req.params.letter) || null, language, res);
    });

    app.get('/languages', function(req, res, next) {
        res.send(200, JSON.stringify(myDispatcher.languages()));
    });

    app.use(sendError);
}

module.exports.install = install;

//     /name
//     /palindrome
//     /palindrome/:letter