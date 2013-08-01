var url = require('url');

module.exports = function() {
    return function(req, res, next) {
        var pathname = url.parse(req.originalUrl).pathname;

        if(pathname == '/') {
            res.statusCode = 303;
            res.setHeader('Location', pathname + 'index.htm');
            res.end('Redirecting to ' + pathname + 'index.htm');
        } else {
            next();
        }
    };
};