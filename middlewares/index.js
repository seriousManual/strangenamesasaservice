var url = require('url');
var path = require('path');

var express = require('express');

var logger = require('../lib/logger');

function slashRedir(req, res, next) {
    var pathname = url.parse(req.originalUrl).pathname;

    if(pathname == '/') {
        res.statusCode = 303;
        res.setHeader('Location', pathname + 'index.htm');
        res.end('Redirecting to ' + pathname + 'index.htm');
    } else {
        next();
    }
}

function install(app) {
    app.use(express.logger());
    app.use(slashRedir);

    app.use(express.static(path.join(__dirname, '../page'), {redirect:true}));
}

module.exports.install = install;