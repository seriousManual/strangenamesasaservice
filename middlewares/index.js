var url = require('url');
var path = require('path');

var express = require('express');

var logger = require('../api/logger');

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

function logging(req, res, next) {
    logger.info('request: ' + req.path);

    next();
}

function benchmark(req, res, next) {
    var stopWatch= logger.startTimer();

    res.on('header', function() {
        stopWatch.done('request ' + req.path + ' finished');
    });

    next();
}

function install(app) {
    app.use(logging);
    app.use(slashRedir);

    app.use(express.static(path.join(__dirname, '../page'), {redirect:true}));
    app.use(express.favicon());

    app.use(benchmark);
}

module.exports.install = install;