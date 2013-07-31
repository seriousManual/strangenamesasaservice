function Loader() {

}

Loader.prototype.load = function(holder, path) {
    holder.addWord('house', 'en');
    holder.addWord('car', 'en');
    holder.addWord('drum', 'en');
    holder.addWord('flower', 'en');
};

module.exports = Loader;