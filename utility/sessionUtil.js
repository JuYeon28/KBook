const HttpUtil = require('./httpUtil');
const crypto = require('crypto');
const async = require('async');
const util = require('util');

const sConstant = {};
sConstant.LEVEL_ALL = 10;
sConstant.LEVEL_USER = 20;
sConstant.LEVEL_ADMIN = 30;

// Declear Export Functions 
module.exports.sConstant = sConstant;
module.exports.pageReadSession = pageReadSession;
module.exports.apiReadSession = apiReadSession;

function pageReadSession(pageLevel) {
    return (req, res, next) => {

        let userInfo = req.session.userInfo;
        if (userInfo === undefined) {

            if (pageLevel == sConstant.LEVEL_USER) {
                return res.redirect('/login');
            }

            return res.redirect('/');
        }

        res.set('Cache-Control',
            'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

        return next();
    }
}

function apiReadSession(apiLevel) {
    return (req, res, next) => {

        let userInfo = req.session.userInfo;
        if (userInfo === undefined) {
            return new HttpUtil(req, res).send(false, '로그인 필요합니다', '/');
        }

        return next();
    }
}
