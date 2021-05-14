var systemConfig = require('../config/systemConfig');
var express = require('express');
var ejs = require('ejs');
var app = express();

module.exports = function () {
    //var https = require('https');

    var path = require('path');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var session = require('express-session');
    var redis = require('redis');
    var redisStore = require('connect-redis')(session);
    var client = redis.createClient();
    var bodyParser = require('body-parser');
    var helmet = require('helmet');

    /* View Engine Setup */
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../views'));

    /* Disable View Cache */
    app.disable('view cache');

    /* Minimize Html code for client */
    app.set('minimizeHtml', 'false');

    /* No cache */
    app.use(helmet.noCache());

    /* Etc Setup */
    app.use(logger('dev'));
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
    app.use(cookieParser());
    app.use(session({
        secret: 'secret_key',
        store: new redisStore({
            host: "127.0.0.1",
            port: 6379,
            client: client,
            prefix : "session:",
            db : 0
        }),
        saveUninitialized: false, // don't create session until something stored,
        resave: true // don't save session if unmodified
    }));
    
    client.on('connect', function() {
        global.LOG.info("Redis connection successful");
    });
    
    client.on("error", function (err) {
        global.LOG.error(err);
        process.exit(1);
    });

    app.use('/', express.static(path.join(__dirname, '../public')));
    app.locals.pretty = true;

    app.set('port', systemConfig.webServer.port);
    var server = app.listen(app.get('port'), function () {
        global.LOG.info('Express server listening on port ' + server.address().port);
    });

    /* Start Web Socket */
    var socketIo = require('socket.io');
    const io = new socketIo(server);
    global.socketIo = io;

    /* Routes Setup */
    require('../routes/route')(app, io);

    /* Error Handler */
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}