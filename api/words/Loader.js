var fs = require('fs');

function Loader() {

}

Loader.prototype._getLanguage = function(path) {
    console.log( path.match(/^(.*)\.(.*)$/));

    return 'en';
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
    })

    holder.addWord('house', 'en');
    holder.addWord('car', 'en');
    holder.addWord('drum', 'en');
    holder.addWord('flower', 'en');
};

module.exports = Loader;