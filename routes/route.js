const cookie = require('cookie');

module.exports = function (app, io) {

    /* Page Setup */
    require('./page/httpPage')(app);

    /* API Setup */
    require('./api/httpAPI')(app);

    /* Web Socket */
    io.set('authorization', (data, next) => {
        next(null, true);
    });

    io.on('connection', (socket) => {
    });
}