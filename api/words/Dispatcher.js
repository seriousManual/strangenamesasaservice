var errors = require('../errors');

function Dispatcher(nouns, adjectives) {
    this._nouns = nouns;
    this._adjectives = adjectives;
}

Dispatcher.prototype.name = function(language) {
    var noun = this._nouns.get(language);
    var adjective = this._adjectives.get(language);

    if(!noun || !adjective) {
        return null;
    }

    return adjective + ' ' + noun;
};

Dispatcher.prototype.alliteration = function(language, letter) {
    var adjective, noun;

    letter = (letter ? letter + '' : '').substr(0,1).toLowerCase();

    adjective = this._adjectives.get(language, letter || null);

    if(adjective) {
        noun = this._nouns.get(language, adjective.substr(0,1));
    }

    if(!adjective || !noun) {
        return null;
    }

    return adjective + ' ' + noun;
};

Dispatcher.prototype.languages = function() {
    return this._adjectives.languages();
};

module.exports = Dispatcher;