var dedupe = require('dedupe');

function Holder() {
    this._words = {};
    this._letters = [];
}

Holder.prototype._getLanguageCluster = function(language, create) {
    if(this._words[language]) {
        return this._words[language];
    } else if(create) {
        this._words[language] = {};

        return this._words[language];
    }

    return null;
};

Holder.prototype._addToLetterList = function(word) {
    var letter = word.substr(0, 1);

    this._letters.push(letter);
    this._letters = dedupe(this._letters);
};

Holder.prototype._addToIndex = function(cluster, word) {
    var first = word.substr(0, 1);

    if(!cluster[first]) {
        cluster[first] = [];
    }

    cluster[first].push(word);
};

Holder.prototype._getRandomElement = function(collection) {
    if(!collection || collection.length === 0) {
        return null;
    }

    return collection[parseInt(Math.random() * collection.length, 10)];
};

Holder.prototype.get = function(language, letter) {
    var cluster = this._getLanguageCluster(language, false);

    if(!cluster) {
        return null;
    }

    if(!letter) {
        letter = this._getRandomElement(this._letters);
    }

    return this._getRandomElement(cluster[letter]);
};

Holder.prototype.addWord = function(word, language) {
    var cluster = this._getLanguageCluster(language, true);

    this._addToIndex(cluster, word);
    this._addToLetterList(word);
};

Holder.prototype.languages = function() {
    return [].concat(this._letters);
};

module.exports = Holder;