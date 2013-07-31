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
};

Loader.prototype.load = function(holder, dirPath) {
    var that = this;

    fs.readdir(dirPath, function(error, files) {
        if(error) {
            return console.error('could not open directory: ' + dirPath);
        }

        files.forEach(function(file) {
            that._readFile(path.join(dirPath, file), holder);
        });
    });
};

module.exports = Loader;