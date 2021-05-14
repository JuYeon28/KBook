var async = require('async');
var logger = require('./utility/logger');

global.LOG = logger.logger;

async.waterfall([
    function (callback) {
        logger.checkLogDir();

        // for Dev
        process.on('uncaughtException', function (err) {
            global.LOG.error('uncaughtException : ' + err);
        });

        /* Initialize DB */
        require('./utility/dbUtils/commonDBUtil').connect((result) => {
            if (result == true) {
                global.LOG.info("DB connection successful");
                callback(null);
            }
            else {
                callback("Failed to Initailize DB");
            }
        });
    },
    function (callback) {
        /* Initialize and Sart Web Service */
        require('./services/webService')();

        callback(null);
    },
], function (err) {
    if (err) {
        global.LOG.error(err);
        process.exit(1);
    }
}); 
