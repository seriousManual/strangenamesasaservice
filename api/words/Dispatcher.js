function Dispatcher(nouns, adjectives) {
    this._nouns = nouns;
    this._adjectives = adjectives;
}

Dispatcher.prototype.name = function(language) {
    return 'dramatic penguine';
};

Dispatcher.prototype.palindrome = function(language, letter) {
    return 'pragmatic prom';
};

module.exports = Dispatcher;