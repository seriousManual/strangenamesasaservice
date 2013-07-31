var errors = require('../errors');

function Dispatcher(nouns, adjectives) {
    this._nouns = nouns;
    this._adjectives = adjectives;
}

Dispatcher.prototype.name = function(language) {
    return 'dramatic penguine';
};

Dispatcher.prototype.alliteration = function(language, letter) {
    return 'pragmatic porn';
};

Dispatcher.prototype.languages = function() {
    return ['en'];
};

module.exports = Dispatcher;