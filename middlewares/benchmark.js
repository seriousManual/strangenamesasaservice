var logger = require('../lib/logger');

module.exports = function benchmark(req, res, next) {
    var stopWatch= logger.startTimer();

    res.on('header', function() {
        stopWatch.done('request ' + req.path + ' finished');
    });

    next();
};