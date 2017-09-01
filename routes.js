var path = require('path');
var util = require('util');

var Dispatcher = require('./lib/Dispatcher');
var Holder = require('./lib/words/Holder');
var loader = require('./lib/words/Loader');
var errors = require('./lib/errors');

function bootstrap() {
    var nounHolder = new Holder();
    var adjectiveHolder = new Holder();

    loader.load(nounHolder, path.join(__dirname, './resources/nouns'), () => true)
    loader.load(adjectiveHolder, path.join(__dirname, './resources/adjectives'), () => true)

    return new Dispatcher(nounHolder, adjectiveHolder);
}

function getLanguage(req) {
    return 'en' //TODO

    var languages = req.headers['accept-language'] || '';

    if (languages.length > 0) {
        return languages[0].match(/^[^\-]*/)[0];
    }

    return null;
}

function errorHandler(error, req, res, next) {
    if (!error.statusCode || !error.message) {
        error = new errors.InternalServerError();
    }

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

    res.status(200).json(result)
}

function install(app) {
    var myDispatcher = bootstrap();

    app.get('/api/name', function (req, res, next) {
        var language = getLanguage(req);

        if (!language) {
            return next(new errors.LanguageNotSuppliedError());
        }

        var result = myDispatcher.name(language);

        if (!result) {
            return next(new errors.LanguageNotFoundError(language));
        }

        sendName(result, language, res);
    });

    app.get('/api/alliteration/:letter?', function (req, res, next) {
        var language = getLanguage(req);
        var letter = req.params.letter || null;

        if (!language) {
            return next(new errors.LanguageNotSuppliedError());
        }

        var result = myDispatcher.alliteration(language, letter);

        if (!result) {
            if (letter) {
                return next(new errors.CombinationLanguageLetterNotFoundError(letter, language));
            } else {
                return next(new errors.LanguageNotFoundError(language));
            }
        }

        sendName(result, language, res);
    });

    app.get('/api/languages', function (req, res, next) {
        res.status(200).json(myDispatcher.languages())
    });

    app.get('/api/*', function (req, res, next) {
        next(new errors.NotFoundError(req.path));
    });

    app.all('/api/*', function (req, res, next) {
        next(new errors.MethodNotSupportedError(req.method));
    });

    app.use(errorHandler);
}

module.exports.install = install;