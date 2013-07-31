var errors = require('../errors');

function Dispatcher(nouns, adjectives) {
    this._nouns = nouns;
    this._adjectives = adjectives;
}

Dispatcher.prototype.name = function(language) {
    var noun, adjective;
    noun = this._nouns.get(language);
    adjective = this._adjectives.get(language);

    if(!noun || !adjective) {
        throw new errors.LanguageNotFoundError(language);
    }

    return adjective + ' ' + noun;
};

Dispatcher.prototype.alliteration = function(language, letter) {
    var adjective, noun;

    adjective = this._adjectives.get(language, letter || null);

    if(adjective) {
        noun = this._nouns.get(language, adjective.substr(0,1));
    }

    if(!adjective || !noun) {
        throw new errors.LanguageNotFoundError(language);
    }

    return adjective + ' ' + noun;
};

Dispatcher.prototype.languages = function() {
    return this._nouns.languages();
};

module.exports = Dispatcher;