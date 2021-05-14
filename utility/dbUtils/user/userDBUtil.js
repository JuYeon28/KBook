const moment = require('moment');
const crypto = require('crypto');
const dbConstant = require('../dbConstant');
var async = require('async');

module.exports.createUserTable = createUserTable;
module.exports.checkPassWord = checkPassWord;
module.exports.getUserInfo = getUserInfo;
module.exports.insertUserInfo = insertUserInfo;
module.exports.updateUserInfo = updateUserInfo;
module.exports.createUserChatList = createUserChatList;
module.exports.getUserChatInfoList = getUserChatInfoList;
module.exports.insertUserChatInfo = insertUserChatInfo;
module.exports.deleteUserChatInfo = deleteUserChatInfo;
module.exports.getChatInfo = getChatInfo;
module.exports.getChatID = getChatID;

function createUserTable(next) {

    let sql = 'CREATE TABLE IF NOT EXISTS ' + dbConstant.TB_USER + ' (\
        `id` INT NOT NULL AUTO_INCREMENT,\
        `user_id` VARCHAR(255) NOT NULL,\
        `password` VARCHAR(255) NOT NULL,\
        `email` VARCHAR(255) NOT NULL,\
        `phone` VARCHAR(255) NOT NULL,\
        `department` VARCHAR(255) NOT NULL,\
        `authorize` TINYINT(1) NOT NULL,\
        PRIMARY KEY (`id`),\
        UNIQUE KEY `user_id` (`user_id`)) DEFAULT CHARSET=utf8;;'

    global.db.query(sql, (err, results, fields) => {
        if (err) {
            console.log(err);
        }

        /* insert user_tb */
        let userInfo = {};
        userInfo.mUserID = 'test';
        userInfo.mPassWord = encryptPassword('test');
        userInfo.mEmail = 'test@test.com'
        userInfo.mPhone = '01098765432';
        userInfo.mDepartment = '과학기술대학';
        userInfo.mAuthorize = true;

        sql = 'INSERT IGNORE INTO ' + dbConstant.TB_USER + ' (user_id, password, email, phone, department, authorize) VALUES (?, ?, ?, ?, ?, ?)';

        global.db.query(sql, [
            userInfo.mUserID,
            userInfo.mPassWord,
            userInfo.mEmail,
            userInfo.mPhone,
            userInfo.mDepartment,
            true], function (err, results, fields) {
                if (err) {
                    console.log(err);
                }
            });

        /* insert user_tb */
        userInfo.mUserID = 'chat1';
        userInfo.mPassWord = encryptPassword('chat1');
        userInfo.mEmail = 'chat1@chat1.com'
        userInfo.mPhone = '01098765432';
        userInfo.mDepartment = '과학기술대학';
        userInfo.mAuthorize = true;

        sql = 'INSERT IGNORE INTO ' + dbConstant.TB_USER + ' (user_id, password, email, phone, department, authorize) VALUES (?, ?, ?, ?, ?, ?)';

        global.db.query(sql, [
            userInfo.mUserID,
            userInfo.mPassWord,
            userInfo.mEmail,
            userInfo.mPhone,
            userInfo.mDepartment,
            true], function (err, results, fields) {
                if (err) {
                    console.log(err);
                }
            });

        /* insert user_tb */
        userInfo.mUserID = 'chat2';
        userInfo.mPassWord = encryptPassword('chat2');
        userInfo.mEmail = 'chat2@chat2.com'
        userInfo.mPhone = '01098765432';
        userInfo.mDepartment = '과학기술대학';
        userInfo.mAuthorize = true;

        sql = 'INSERT IGNORE INTO ' + dbConstant.TB_USER + ' (user_id, password, email, phone, department, authorize) VALUES (?, ?, ?, ?, ?, ?)';

        global.db.query(sql, [
            userInfo.mUserID,
            userInfo.mPassWord,
            userInfo.mEmail,
            userInfo.mPhone,
            userInfo.mDepartment,
            true], function (err, results, fields) {
                if (err) {
                    console.log(err);
                }
            });
    });

    next(true);
}

function createUserChatList(next) {
    let sql = 'CREATE TABLE IF NOT EXISTS ' + dbConstant.TB_USER_CHAT + ' (\
        `id` INT NOT NULL AUTO_INCREMENT,\
        `user_id` VARCHAR(255) NOT NULL,\
        `to_user_id` VARCHAR(255) NOT NULL,\
        `chat_history` MEDIUMTEXT CHARACTER SET UTF8 NULL,\
        PRIMARY KEY (`id`),\
        UNIQUE KEY `user_id` (`user_id`,`to_user_id`)) DEFAULT CHARSET=utf8;;'

    global.db.query(sql, function (err, results, fields) {
        if (err) {
            next(false);
            return;
        }

        next(true);
    });
}

function checkPassWord(userID, password, next) {

    let sql = 'SELECT * FROM ' + dbConstant.TB_USER + ' WHERE user_id=?';

    global.db.query(sql, [userID], function (err, result, fields) {
        if (err) {
            return next(false, null, err.code);
        }

        if (result.length === 0) {
            return next(false, null, '사용자 정보가 일치하지 않습니다.');
        }

        let userInfo = {};
        userInfo.mUserID = result[0].user_id;
        userInfo.mPassWord = result[0].password;
        userInfo.mEmail = result[0].email;
        userInfo.mPhone = result[0].phone;
        userInfo.mDepartment = result[0].department;
        userInfo.mAuthorize = result[0].authorize === 0 ? false : true;

        let encrypted = encryptPassword(password);

        let sql = 'SELECT STRCMP(?, ?) AS COMPARE';
        let params = [encrypted, userInfo.mPassWord];
        global.db.query(sql, params, function (err, result, fields) {
            if (err) {
                next(false, null, err.code);
                return;
            }

            if (result[0].COMPARE !== 0) {
                next(false, null, '사용자 정보가 일치하지 않습니다.');
                return;
            }

            next(true, userInfo, '');
        });
    });
}

function getUserInfo(userID, next) {
    let sql = 'SELECT * FROM ' + dbConstant.TB_USER + ' WHERE user_id=?';

    global.db.query(sql, [userID], function (err, result, fields) {
        if (err) {
            return next(false, null, err.code);
        }

        if (result.length === 0) {
            return next(false, null, '사용자 정보가 일치하지 않습니다.');
        }

        let userInfo = {};
        userInfo.mUserID = result[0].user_id;
        userInfo.mEmail = result[0].email;
        userInfo.mPhone = result[0].phone;
        userInfo.mDepartment = result[0].department;
        userInfo.mAuthorize = result[0].authorize === 0 ? false : true;

        next(true, userInfo, '');
    });
}

function insertUserInfo(userInfo, next) {
    let sql = 'SELECT * FROM ' + dbConstant.TB_USER + ' WHERE user_id=?';
    global.db.query(sql, [userInfo.mUserID], function (err, results, fields) {
        if (err) {
            return next(false, err.code);
        }

        if (results.length === 1) {
            return next(false, '이미 사용 중인 ID가 있습니다.');
        }

        userInfo.mPassWord = encryptPassword(userInfo.mPassWord);
        let sql = 'INSERT IGNORE INTO ' + dbConstant.TB_USER + ' (user_id, password, email, phone, department, authorize) VALUES (?, ?, ?, ?, ?, ?)';

        global.db.query(sql, [
            userInfo.mUserID,
            userInfo.mPassWord,
            userInfo.mEmail,
            userInfo.mPhone,
            userInfo.mDepartment,
            false], function (err, result, fields) {
                if (err) {
                    return next(false, err.code);
                }

                next(true, '회원가입 완료');
            });
    });
}

function updateUserInfo(userInfo, next) {

    userInfo.mPassWord = encryptPassword(userInfo.mPassWord);

    let sql = 'UPDATE ' + dbConstant.TB_USER + ' SET \
            password = ?, \
            email = ?, \
            phone = ?, \
            department = ?, \
            authorize = ? where user_id = ?';

    global.db.query(sql, [userInfo.mPassWord, userInfo.mEmail, userInfo.mPhone, userInfo.mDepartment, 1, userInfo.mUserID], (err, results, fields) => {
        if (err) {
            return next(false, err.code);
        }

        next(true, '사용자 정보 수정')
    });
}

function getUserChatInfoList(userID, next) {
    let sql = 'SELECT * FROM ' + dbConstant.TB_USER_CHAT + '\
        WHERE user_id = ?';

    global.db.query(sql, [userID], function (err, results, fields) {
        if (err) {
            next(false);
            return;
        }

        let chatList = [];

        for (let i = 0; i < results.length; i++) {
            let chat = {};
            chat.id = results[i].id;
            chat.userID = results[i].user_id;
            chat.toUserID = results[i].to_user_id;
            chat.chatHistory = JSON.parse(results[i].chat_history);
            chatList.push(chat);
        }

        next(true, chatList);
    });
}

function getChatInfo(chatID, next) {
    let sql = 'SELECT * FROM ' + dbConstant.TB_USER_CHAT + '\
    WHERE id = ?';

    global.db.query(sql, [chatID], function (err, results, fields) {
        if (err) {
            next(false);
            return;
        }

        let chatList = {};

        for (let i = 0; i < results.length; i++) {
            chatList.id = results[0].id;
            chatList.userID = results[0].user_id;
            chatList.toUserID = results[0].to_user_id;
            chatList.chatHistory = JSON.parse(results[0].chat_history);
        }

        next(true, chatList);
    });
}

function getChatID(chatInfo, next) {
    let sql = 'SELECT * FROM ' + dbConstant.TB_USER_CHAT + '\
    WHERE (user_id = ? AND to_user_id = ?) OR (to_user_id = ? AND user_id = ?)';

    global.db.query(sql, [chatInfo.user_id, chatInfo.to_user_id, chatInfo.user_id, chatInfo.to_user_id], function (err, results, fields) {
        if (err) {
            next(false);
            return;
        }

        switch (results.length) {
            case 0: // 둘다 없는 경우

                let fromJsonArray = [];
                let toJsonArray = [];
                let fromChat = {};
                fromChat.user = chatInfo.user_id;
                fromChat.date = chatInfo.date;
                fromChat.message = "";

                let toChat = {};
                toChat.user = chatInfo.user_id;
                toChat.date = chatInfo.date;
                toChat.message = "";

                fromJsonArray.push(fromChat);
                toJsonArray.push(toChat);

                let sql = 'START TRANSACTION; \
                INSERT IGNORE INTO ' + dbConstant.TB_USER_CHAT + ' (user_id, to_user_id, chat_history) VALUES (?, ?, ?);\
                INSERT IGNORE INTO ' + dbConstant.TB_USER_CHAT + ' (user_id, to_user_id, chat_history) VALUES (?, ?, ?);\
                COMMIT';

                let params = [chatInfo.user_id, chatInfo.to_user_id, JSON.stringify(fromJsonArray), chatInfo.to_user_id, chatInfo.user_id, JSON.stringify(toJsonArray)];

                global.db.query(sql, params, function (err, results, fields) {
                    if (err) {
                        return next(false, err.code);
                    }

                    let chatID = results[1].insertId;
                    next(true, chatID);
                });
                break;

            case 1: // 하나만 있는 경우

                if (chatInfo.user_id == results[0].user_id
                    && chatInfo.to_user_id == results[0].to_user_id) {

                    let chatID = results[0].id;
                    let toJsonArray = [];
                    let toChat = {};
                    toChat.user = chatInfo.user_id;
                    toChat.date = chatInfo.date;
                    toChat.message = "";
                    toJsonArray.push(toChat);

                    let sql = 'INSERT IGNORE INTO ' + dbConstant.TB_USER_CHAT + ' (user_id, to_user_id, chat_history) VALUES (?, ?, ?)';
                    global.db.query(sql, [chatInfo.to_user_id, chatInfo.user_id, JSON.stringify(toJsonArray)], (err, results, fields) => {
                        if (err) {
                            return next(false, err.code);
                        }

                        next(true, chatID);
                    });

                } else {

                    let chatID = undefined;
                    let fromJsonArray = [];
                    let fromChat = {};
                    fromChat.user = chatInfo.user_id;
                    fromChat.date = chatInfo.date;
                    fromChat.message = "";

                    fromJsonArray.push(fromChat);

                    let sql = 'INSERT IGNORE INTO ' + dbConstant.TB_USER_CHAT + ' (user_id, to_user_id, chat_history) VALUES (?, ?, ?);';
                    global.db.query(sql, [chatInfo.user_id, chatInfo.to_user_id, JSON.stringify(fromJsonArray)], (err, results, fields) => {
                        if (err) {
                            return next(false, err.code);
                        }

                        chatID = results.insertId;
                        next(true, chatID);
                    });
                }

                break;

            case 2: // 둘다 있는 경우

                let chatID = undefined;
                for (let i = 0; i < results.length; i++) {
                    if (chatInfo.user_id == results[i].user_id
                        && chatInfo.to_user_id == results[i].to_user_id) {

                        chatID = results[i].id;
                        break;
                    }
                }
                next(true, chatID);
                break;
        }
    });
}

function deleteUserChatInfo(chatInfo, next) {
    let sql = '\
    DELETE FROM ' + dbConstant.TB_USER_CHAT + ' WHERE user_id=? and id=?';

    let params = [chatInfo.user_id, chatInfo.chat_id];

    global.db.query(sql, params, function (err, results, fields) {
        if (err) {
            next(false, err);
        }

        next(true, '');
    });
}

function insertUserChatInfo(chatInfo, next) {

    var chathistory = {};

    async.waterfall([

        function (callback) {

            let sql = 'SELECT * FROM ' + dbConstant.TB_USER_CHAT + ' WHERE user_id = ? and to_user_id = ?';

            global.db.query(sql, [chatInfo.user_id, chatInfo.to_user_id], (err, results, fields) => {
                if (err) {
                    return callback(null, false);
                }

                if (results.length > 0) {
                    chathistory.userChat = results[0].chat_history;
                } else {
                    chathistory.userChat = "";
                }

                callback(null, chathistory);
            });
        },
        function (chathistory, callback) {

            let sql = 'SELECT * FROM ' + dbConstant.TB_USER_CHAT + '\
                WHERE user_id = ? and to_user_id = ?';

            global.db.query(sql, [chatInfo.to_user_id, chatInfo.user_id], (err, results, fields) => {
                if (err) {
                    return callback(null, false);
                }

                if (results.length > 0) {
                    chathistory.toUserChat = results[0].chat_history;
                } else {
                    chathistory.toUserChat = "";
                }
                callback(null, chathistory);
            });
        },
        function (chathistory, callback) {

            let fromJsonArray = [];
            let toJsonArray = [];

            let fromChat = {};
            fromChat.user = chatInfo.user_id;
            fromChat.date = chatInfo.date;
            fromChat.message = chatInfo.message;

            let toChat = {};
            toChat.user = chatInfo.user_id;
            toChat.date = chatInfo.date;
            toChat.message = chatInfo.message;

            if (chathistory.userChat === "" && chathistory.toUserChat === "") {

                fromJsonArray.push(fromChat);
                toJsonArray.push(toChat);

                let sql = 'START TRANSACTION; \
                INSERT IGNORE INTO ' + dbConstant.TB_USER_CHAT + ' (user_id, to_user_id, chat_history) VALUES (?, ?, ?);\
                INSERT IGNORE INTO ' + dbConstant.TB_USER_CHAT + ' (user_id, to_user_id, chat_history) VALUES (?, ?, ?);\
                COMMIT';

                let params = [chatInfo.user_id, chatInfo.to_user_id, JSON.stringify(fromJsonArray), chatInfo.to_user_id, chatInfo.user_id, JSON.stringify(toJsonArray)];

                global.db.query(sql, params, function (err, results, fields) {
                    if (err) {
                        return callback(false, err);
                    }

                    callback(true, '');
                });

            } else if (chathistory.userChat !== "" && chathistory.toUserChat !== "") {

                let sql = '\
                UPDATE '+ dbConstant.TB_USER_CHAT + ' SET chat_history = ? WHERE user_id = ? AND to_user_id = ?;\
                UPDATE '+ dbConstant.TB_USER_CHAT + ' SET chat_history = ? WHERE user_id = ? AND to_user_id = ?;';

                chathistory.userChat = JSON.parse(chathistory.userChat);
                chathistory.toUserChat = JSON.parse(chathistory.toUserChat);

                chathistory.userChat.push(fromChat);
                chathistory.toUserChat.push(toChat);


                for (let i = 0; i < chathistory.userChat.length; i++) {
                    if (chathistory.userChat[i].message === "") {
                        chathistory.userChat.splice(i, 1)
                    }
                }

                for (let i = 0; i < chathistory.toUserChat.length; i++) {
                    if (chathistory.toUserChat[i].message === "") {
                        chathistory.toUserChat.splice(i, 1)
                    }
                }

                fromJsonArray = JSON.stringify(chathistory.userChat);
                toJsonArray = JSON.stringify(chathistory.toUserChat);

                let params = [fromJsonArray, chatInfo.user_id, chatInfo.to_user_id, toJsonArray, chatInfo.to_user_id, chatInfo.user_id];

                global.db.query(sql, params, function (err, results, fields) {
                    if (err) {
                        return callback(false, err);
                    }

                    callback(true, '');
                });
            }
            else if (chathistory.userChat === "" && chathistory.toUserChat !== "") {

                fromJsonArray.push(fromChat);

                let sql = '\
                INSERT IGNORE INTO ' + dbConstant.TB_USER_CHAT + ' (user_id, to_user_id, chat_history) VALUES (?, ?, ?);\
                UPDATE '+ dbConstant.TB_USER_CHAT + ' SET chat_history = ? WHERE user_id = ? AND to_user_id = ?;';

                chathistory.toUserChat = JSON.parse(chathistory.toUserChat);
                chathistory.toUserChat.push(toChat);

                for (let i = 0; i < chathistory.toUserChat.length; i++) {
                    if (chathistory.toUserChat[i].message === "") {
                        chathistory.toUserChat.splice(i, 1)
                    }
                }

                toJsonArray = JSON.stringify(chathistory.toUserChat);

                let params = [chatInfo.user_id, chatInfo.to_user_id, JSON.stringify(fromJsonArray), toJsonArray, chatInfo.to_user_id, chatInfo.user_id];

                global.db.query(sql, params, function (err, results, fields) {
                    if (err) {
                        return callback(false, err);
                    }

                    callback(true, '');
                });
            } else if (chathistory.userChat !== "" && chathistory.toUserChat === "") {

                toJsonArray.push(toChat);

                let sql = '\
                UPDATE '+ dbConstant.TB_USER_CHAT + ' SET chat_history = ? WHERE user_id = ? AND to_user_id = ?;\
                INSERT IGNORE INTO ' + dbConstant.TB_USER_CHAT + ' (user_id, to_user_id, chat_history) VALUES (?, ?, ?);';

                chathistory.userChat = JSON.parse(chathistory.userChat);
                chathistory.userChat.push(fromChat);

                for (let i = 0; i < chathistory.userChat.length; i++) {
                    if (chathistory.userChat[i].message === "") {
                        chathistory.userChat.splice(i, 1)
                    }
                }

                fromJsonArray = JSON.stringify(chathistory.userChat);

                let params = [fromJsonArray, chatInfo.user_id, chatInfo.to_user_id, chatInfo.to_user_id, chatInfo.user_id, JSON.stringify(toJsonArray)];

                global.db.query(sql, params, function (err, results, fields) {
                    if (err) {
                        return callback(false, err);
                    }

                    callback(true, '');
                });
            }
        },
    ], function (err, msg) {
        if (err === false) {
            next(false, msg);
        } else {
            next(true, '');
        }
    });
}

function encryptPassword(pwd) {
    let key = crypto.createHash('md5').update('__FIRST__').digest('base64');
    const cipher = crypto.createCipher('aes256', key);
    let encrypted = cipher.update(pwd, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
} 