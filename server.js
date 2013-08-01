var path = require('path');
var url = require('url');

var express = require('express');

var routes = require('./api/routes');

var app = express();
app.use(express.logger());
app.use(function(req, res, next) {
    var pathname = url.parse(req.originalUrl).pathname;

    if(pathname == '/') {
        res.statusCode = 303;
        res.setHeader('Location', pathname + 'index.htm');
        res.end('Redirecting to ' + pathname + 'index.htm');
    } else {
        next();
    }
});
app.use(express.static(path.join(__dirname, '/page'), {redirect:true}));

routes.install(app);

app.listen(8080);