var Dispatcher = require('./words/Dispatcher');
var Holder = require('./words/Holder');
var Loader = require('./words/Loader');
var errors = require('./errors');

var myLoader = new Loader();

function bootstrap() {
    var nounHolder = new Holder();
    var adjectiveHolder = new Holder();

    myLoader.load(nounHolder, __dirname + '/../resources/nouns');
    myLoader.load(adjectiveHolder, __dirname + '/../resources/adjectives');

    return new Dispatcher(nounHolder, adjectiveHolder);
}

function getLanguage(req) {
    var languages = req.acceptedLanguages;

    if(languages.length > 0) {
        return languages[0].match(/^[^\-]*/)[0];
    }

    return null;
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

    app.get('/api/name', function(req, res, next) {
        var language = getLanguage(req);

        if(!language) {
            throw new errors.LanguageNotSuppliedError();
        }

        sendName(myDispatcher.name(language), language, res);
    });

    app.get('/api/alliteration/:letter?', function(req, res, next) {
        var language = getLanguage(req);

        if(!language) {
            throw new errors.LanguageNotSuppliedError();
        }

        sendName(myDispatcher.alliteration(language, req.params.letter || null), language, res);
    });

    app.get('/api/languages', function(req, res, next) {
        res.send(200, JSON.stringify(myDispatcher.languages()));
    });

    app.get('/api/*', function(req, res, next) {
        throw new errors.NotFoundError(req.path);
    });

    app.all('/api/*', function(req, res, next) {
        throw new errors.MethodNotSupportedError(req.method);
    });

    app.use(sendError);
}

module.exports.install = install;