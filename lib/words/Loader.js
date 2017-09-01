var fs = require('fs');
var path = require('path');

var seq = require('seq');

function _getLanguage(filePath) {
    return path.basename(filePath, '.txt');
}

function _readFile(file, holder, callback) {
    fs.readFile(file, function (error, content) {
        if (error) {
            return callback(error);
        }

        content = content.toString().split('\n');
        var language = _getLanguage(file);

        content.forEach(function (word) {
            holder.addWord(word.trim().toLowerCase(), language);
        });

        callback();
    })
}

function load(holder, dirPath, callback) {

    fs.readdir(dirPath, function (error, files) {
        if (error) {
            return callback(error)
        }

        var chain = seq();

        files.forEach(function (file) {
            chain.par(function () {
                _readFile(path.join(dirPath, file), holder, this);
            });
        });

        chain.seq(callback)
    });
}


module.exports.load = load;