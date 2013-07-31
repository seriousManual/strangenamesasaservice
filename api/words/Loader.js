var fs = require('fs');
var path = require('path');

function Loader() {

}

Loader.prototype._getLanguage = function(filePath) {
    return path.basename(filePath, '.txt');
};

Loader.prototype._readFile = function(file, holder) {
    var that = this;

    fs.readFile(file, function(error, content) {
        if(error) {
            return console.error('could not read file: ' + file);
        }

        var content = content.toString().split('\n');
        var language = that._getLanguage(file);

        content.forEach(function(word) {
            holder.addWord(word, language);
        });
    })
}

Loader.prototype.load = function(holder, path) {
    var that = this;

    fs.readdir(path, function(error, files) {
        if(error) {
            return console.error('could not open directory ' + path);
        }

        files.forEach(function(file) {
            that._readFile(path + '/' + file, holder);
        });
    });
};

module.exports = Loader;