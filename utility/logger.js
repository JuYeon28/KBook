// Logger
// from https://stackoverflow.com/questions/8393636/node-log-in-a-file-instead-of-the-console

const winston = require('winston');
const winstonRotator = require('winston-daily-rotate-file');
const moment = require('moment');
var fs = require('fs');
const logDir = 'logs';

const consoleConfig = [
    new winston.transports.Console({
        'colorize': true
    })
];

const createLogger = new winston.Logger({
    'transports': consoleConfig
});

const timeFormatFunc = function () {
    'use strict';
    return moment().format('YYYY-MM-DD HH:mm:ss');
};

const infoLogger = createLogger;
infoLogger.add(winstonRotator, {    
    'level': 'info',
    'filename': logDir + '/server-%DATE%.log',
    'timestamp': timeFormatFunc,
    'datePattern': 'YYYY-MM-DD',
    'json': false,
    'prepend': true    
});

const checkLogDir = function () {
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }
};

module.exports = {
    'logger': infoLogger,
    'checkLogDir': checkLogDir
};