var express = require('express');

var routes = require('./routes');
var middlewares = require('./middlewares');
var argv = require('optimist').argv;

var port = argv.port || 8080;

var app = express();

app.enable('trust proxy');

middlewares.install(app);
routes.install(app);

app.listen(port);

console.log('running on ' + port);