var path = require('path');
var util = require('util');

var Dispatcher = require('./words/Dispatcher');
var Holder = require('./words/Holder');
var loader = require('./words/Loader');
var errors = require('./errors');
var logger = require('./logger');

function bootstrap() {
    var nounHolder = new Holder();
    var adjectiveHolder = new Holder();

    loader.load(nounHolder, path.join(__dirname, '/../resources/nouns'), function() {});
    loader.load(adjectiveHolder, path.join(__dirname, '/../resources/adjectives'), function() {});

    return new Dispatcher(nounHolder, adjectiveHolder);
}

function getLanguage(req) {
    var languages = req.acceptedLanguages;

    if(languages.length > 0) {
        return languages[0].match(/^[^\-]*/)[0];
    }

    return null;
}

function errorHandler(error, req, res, next) {
    if(!error.statusCode || !error.message) {
        logger.error(error.stack);

        error = new errors.InternalServerError();
    } else {
        logger.error(error.message);
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

    logger.info(util.format('Sending "%s" in "%s"', name, language));

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

        var result = myDispatcher.name(language);

        if(!result) {
            return next(new errors.LanguageNotFoundError(language));
        }

        sendName(result, language, res);
    });

    app.get('/api/alliteration/:letter?', function(req, res, next) {
        var language = getLanguage(req);
        var letter = req.params.letter || null;

        if(!language) {
            throw new errors.LanguageNotSuppliedError();
        }

        var result = myDispatcher.alliteration(language, letter);

        if(!result) {
            if(letter) {
                return next(new errors.CombinationLanguageLetterNotFoundError(letter, language));
            } else {
                return next(new errors.LanguageNotFoundError(language));
            }
        }

        sendName(result, language, res);
    });

    app.get('/api/languages', function(req, res, next) {
        res.send(200, JSON.stringify(myDispatcher.languages()));
    });

    app.get('/api/*', function(req, res, next) {
        next(new errors.NotFoundError(req.path));
    });

    app.all('/api/*', function(req, res, next) {
        next(new errors.MethodNotSupportedError(req.method));
    });

    app.use(errorHandler);
}

module.exports.install = install;