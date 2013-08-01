var path = require('path');

var express = require('express');

var routes = require('./api/routes');
var slashRedir = require('./slashRedir');

var app = express();
app.use(express.logger());
app.use(slashRedir());
app.use(express.static(path.join(__dirname, '/page'), {redirect:true}));

routes.install(app);

app.listen(8080);