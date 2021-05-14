
var systemConfig = {};
systemConfig.db = {};
systemConfig.webServer = {};
systemConfig.passport = {};

systemConfig.db.host = 'localhost';
systemConfig.db.user = 'root';
systemConfig.db.password = '1111';
systemConfig.db.database = 'first';

systemConfig.webServer.port = process.env.PORT || 3000;

module.exports = systemConfig;
