var fs = require('fs');
var path = require('path');

var seq = require('seq');

var logger = require('../logger');

function _getLanguage(filePath) {
    return path.basename(filePath, '.txt');
}

function _readFile(file, holder, callback) {
    fs.readFile(file, function(error, content) {
        if(error) {
            logger.error('could not read file: ' + file);
            return callback();
        }

        content = content.toString().split('\n');
        var language = _getLanguage(file);

        content.forEach(function(word) {
            holder.addWord(word.trim().toLowerCase(), language);
        });

        callback();
    })
}

function load(holder, dirPath) {
    var loadStopwatch = logger.startTimer();

    fs.readdir(dirPath, function(error, files) {
        if(error) {
            return logger.error('could not open directory: ' + dirPath)
        }

        var chain = seq();

        files.forEach(function(file) {
            chain.par(function() {
                _readFile(path.join(dirPath, file), holder, this);
            });
        });

        chain.seq(function() {
            loadStopwatch.done('finished loading for: ' + dirPath);
        });
    });
}


module.exports.load = load;