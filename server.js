var path = require('path');

var express = require('express');

var routes = require('./api/routes');

var app = express();
app.use(function(req, res, next) {
    console.log( 'Incoming: ' + req.path );
    next();
});
app.use(express.static(path.join(__dirname, '/page')));

routes.install(app);

app.listen(8080);