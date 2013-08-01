var fs = require('fs');
var path = require('path');

var seq = require('seq');

function Loader() {}

Loader.prototype._getLanguage = function(filePath) {
    return path.basename(filePath, '.txt');
};

Loader.prototype._readFile = function(file, holder, callback) {
    var that = this;

    fs.readFile(file, function(error, content) {
        if(error) {
            console.error('could not read file: ' + file);
            return callback();
        }

        content = content.toString().split('\n');
        var language = that._getLanguage(file);

        content.forEach(function(word) {
            holder.addWord(word.trim().toLowerCase(), language);
        });

        callback();
    })
};

Loader.prototype.load = function(holder, dirPath) {
    var that = this;

    console.log('loading for ' + dirPath);

    fs.readdir(dirPath, function(error, files) {
        if(error) {
            return console.error('could not open directory: ' + dirPath);
        }

        var chain = seq();

        files.forEach(function(file) {
            chain.par(function() {
                that._readFile(path.join(dirPath, file), holder, this);
            });
        });

        chain.seq(function() {
            console.log('finished loading for: ' + dirPath);
        });
    });
};

module.exports = Loader;