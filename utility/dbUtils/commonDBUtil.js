var systemConfig = require('../../config/systemConfig');
var mysql = require('mysql');
var async = require('async');
const userDBUtil = require('./user/userDBUtil');
const bookDBUtil = require('./user/bookDBUtil');

module.exports.connect = function (next) {

    /* Initialize DB */
    global.db = mysql.createConnection({
        host: systemConfig.db.host,
        user: systemConfig.db.user,
        password: systemConfig.db.password,
        database: systemConfig.db.database,
        multipleStatements: true
    });

    global.db.connect(function (err) {

        if (err) {
            console.error(err);
            return next(false);
        }

        /* Initialize DB */
        async.waterfall([
            function (callback) {
                userDBUtil.createUserTable(function (result) {
                    if (result === true) {
                        callback(null);
                    } else {
                        callback("User DB initialization failed");
                    }
                });
            },
            function (callback) {
                bookDBUtil.createBookTable(function (result) {
                    if (result === true) {
                        callback(null);
                    } else {
                        callback("Book DB initialization failed");
                    }
                });
            },
            function (callback) {
                bookDBUtil.createBookCategoryTable(function (result) {
                    if (result === true) {
                        callback(null);
                    } else {
                        callback("Book Category DB initialization failed");
                    }
                });
            },
            function (callback) {
                bookDBUtil.createBookStatusTable(function (result) {
                    if (result === true) {
                        callback(null);
                    } else {
                        callback("Book Status initialization failed");
                    }
                });
            },
            function (callback) {
                bookDBUtil.createBookFavoriteTable(function (result) {
                    if (result === true) {
                        callback(null);
                    } else {
                        callback("Book Favorite initialization failed");
                    }
                });
            },
            function (callback) {
                userDBUtil.createUserChatList(function (result) {
                    if (result === true) {
                        callback(null);
                    } else {
                        callback("User Chat List initialization failed");
                    }
                });
            }
        ], function (err) {
            if (err) {
                console.error(err);
                next(false);
            }
            else {
                next(true);
            }
        });
    });
}