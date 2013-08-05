var dedupe = require('dedupe');

function Holder() {
    this._words = {};
}

Holder.prototype._getLanguageCluster = function(language, create) {
    if(this._words[language]) {
        return this._words[language];
    } else if(create) {
        this._words[language] = {
            index: {},
            letters: []
        };

        return this._words[language];
    }

    return null;
};

Holder.prototype._addToLetterList = function(cluster, word) {
    var letter = word.substr(0, 1);

    cluster.letters.push(letter);
    cluster.letters = dedupe(cluster.letters);
};

Holder.prototype._addToIndex = function(cluster, word) {
    var first = word.substr(0, 1);

    if(!cluster.index[first]) {
        cluster.index[first] = [];
    }

    cluster.index[first].push(word);
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
        letter = this._getRandomElement(cluster.letters);
    }

    return this._getRandomElement(cluster.index[letter]);
};

Holder.prototype.addWord = function(word, language) {
    var cluster = this._getLanguageCluster(language, true);

    this._addToIndex(cluster, word);
    this._addToLetterList(cluster, word);
};

Holder.prototype.languages = function() {
    return Object.keys(this._words);
};

module.exports = Holder;