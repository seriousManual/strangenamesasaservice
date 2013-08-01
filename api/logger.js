var util = require('util');

var winston = require('winston');

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
    timestamp: true
});

module.exports = winston;