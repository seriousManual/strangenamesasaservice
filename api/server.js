var express = require('express');

var routes = require('./routes');

var app = express();

app.use(express.static(__dirname + '/page'));

routes.install(app);

app.listen(8080);