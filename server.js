var express = require('express');

var routes = require('./api/routes');
var middlewares = require('./middlewares');

var app = express();

middlewares.install(app);

routes.install(app);

app.listen(8080);