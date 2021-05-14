const async = require('async');
const UserClass = require('../../models/UserClass');
const HttpUtil = require('../../utility/httpUtil');
const sessionUtil = require('../../utility/sessionUtil');
const userDBUtil = require('../../utility/dbUtils/user/userDBUtil');
const bookDBUtil = require('../../utility/dbUtils/user/bookDBUtil');
const multer = require('multer');
const moment = require('moment');

var expressApp = undefined;

module.exports = function (app) {

    expressApp = app;

    /* HTTP Web API Handler */
    let httpGETList = [
        ['/getBookCategoryInfoList', getBookCategoryInfoList, sessionUtil.sConstant.LEVEL_ALL],
        ['/getBookInfoList', getBookInfoList, sessionUtil.sConstant.LEVEL_ALL],
        ['/getUserFavoriteBookInfoList', getUserFavoriteBookInfoList, sessionUtil.sConstant.LEVEL_USER],
        ['/getBookInfo', getBookInfo, sessionUtil.sConstant.LEVEL_ALL],
        ['/getUserBookInfoList', getUserBookInfoList, sessionUtil.sConstant.LEVEL_USER],
        ['/getUserInfo', getUserInfo, sessionUtil.sConstant.LEVEL_USER],
        ['/getUserChatInfoList', getUserChatInfoList, sessionUtil.sConstant.LEVEL_USER],
        ['/getChatInfo', getChatInfo, sessionUtil.sConstant.LEVEL_USER],
        ['/getChatID', getChatID, sessionUtil.sConstant.LEVEL_USER],

    ];

    let httpPOSTList = [
        ['/userLogIn', userLogIn, sessionUtil.sConstant.LEVEL_ALL],
        ['/userLogOut', userLogOut, sessionUtil.sConstant.LEVEL_USER],
        ['/addUserInfo', addUserInfo, sessionUtil.sConstant.LEVEL_ALL],
        ['/editUserInfo', editUserInfo, sessionUtil.sConstant.LEVEL_USER],
        ['/insertFavoriteBookInfo', insertFavoriteBookInfo, sessionUtil.sConstant.LEVEL_USER],
        ['/deleteFavoriteBookInfo', deleteFavoriteBookInfo, sessionUtil.sConstant.LEVEL_USER],
        ['/addBook', addBook, sessionUtil.sConstant.LEVEL_USER],
        ['/deleteBook', deleteBook, sessionUtil.sConstant.LEVEL_USER],
        ['/editBook', editBook, sessionUtil.sConstant.LEVEL_USER],
        ['/editBookIncludeImage', editBookIncludeImage, sessionUtil.sConstant.LEVEL_USER],
        ['/updateUserInfo', updateUserInfo, sessionUtil.sConstant.LEVEL_USER],
        ['/searchAllBook', searchAllBook, sessionUtil.sConstant.LEVEL_ALL],
        ['/insertUserChatInfo', insertUserChatInfo, sessionUtil.sConstant.LEVEL_ALL],
        ['/deleteChat', deleteChat, sessionUtil.sConstant.LEVEL_USER],

    ];

    /* set Web API Handler */
    httpGETList.forEach(list => {
        if (list[2] === sessionUtil.sConstant.LEVEL_ALL) {
            app.get('/httpAPI' + list[0], list[1]);
        } else {
            app.get('/httpAPI' + list[0],
                sessionUtil.apiReadSession(list[2]),
                list[1]);
        }
    });

    httpPOSTList.forEach(list => {
        if (list[2] === sessionUtil.sConstant.LEVEL_ALL) {
            app.post('/httpAPI' + list[0], list[1]);
        } else {
            app.post('/httpAPI' + list[0],
                sessionUtil.apiReadSession(list[2]),
                list[1]);
        }
    });
}

module.exports.registerWebSocket = function (socket) {

    /* HTTP WebSocket API Handler */
    let httpSocketList = [];

    /* set Web Socket Handler */
    httpSocketList.forEach(list => {
        socket.on(list[0], (data) => {
            /* callBack */
            list[1](data);
        });
    });
}

/* Get Handlers */
function getBookCategoryInfoList(req, res) {

    bookDBUtil.getBookCategoryInfoList(function (result, data) {
        if (result == false) {
            return new HttpUtil(req, res).send(false, null, null);
        }

        new HttpUtil(req, res).send(true, null, data);
    });
}

function getBookInfoList(req, res) {

    bookDBUtil.getBookInfoList(function (result, data) {
        if (result == false) {
            return new HttpUtil(req, res).send(false, null, null);
        }

        new HttpUtil(req, res).send(true, null, data);
    });
}

function getUserBookInfoList(req, res) {

    let userInfo = req.session.userInfo;

    bookDBUtil.getUserBookInfoList(userInfo.mUserID, function (result, data) {
        if (result == false) {
            return new HttpUtil(req, res).send(false, null, null);
        }
        new HttpUtil(req, res).send(true, null, data);
    });
}

function getUserInfo(req, res) {
    let userInfo = req.session.userInfo;

    userDBUtil.getUserInfo(userInfo.mUserID, (result, data, msg) => {
        if (result === false) {
            return new HttpUtil(req, res).send(false, msg, null);
        }

        new HttpUtil(req, res).send(true, null, data);
    });
}

function getUserFavoriteBookInfoList(req, res) {
    let userInfo = req.session.userInfo;

    bookDBUtil.getUserFavoriteBookInfoList(userInfo, function (result, data) {
        if (result == false) {
            return new HttpUtil(req, res).send(false, null, null);
        }

        new HttpUtil(req, res).send(true, null, data);
    });
}

/* Post Handlers */
function userLogIn(req, res) {

    let recvData = JSON.parse(JSON.stringify(req.body));
    let userID = recvData.mUserID;
    let password = recvData.mPassWord;

    userDBUtil.checkPassWord(userID, password, (result, userInfo, msg) => {
        if (result === false) {
            return new HttpUtil(req, res).send(false, msg);
        }

        req.session.userInfo = {};
        req.session.userInfo = userInfo;
        new HttpUtil(req, res).send(true, null, '/');
    });
}

function userLogOut(req, res) {
    req.session.destroy();
    new HttpUtil(req, res).send(true, null, '/');
}

function addUserInfo(req, res) {
    let recvData = JSON.parse(JSON.stringify(req.body));
    let userInfo = {};
    userInfo.mUserID = recvData.mUserID;
    userInfo.mPassWord = recvData.mPassWord;
    userInfo.mEmail = recvData.mEmail;
    userInfo.mPhone = recvData.mPhone;
    userInfo.mDepartment = recvData.mDepartment;

    userDBUtil.insertUserInfo(userInfo, (result, msg) => {
        if (result === false) {
            return new HttpUtil(req, res).send(false, msg, null);
        }
        new HttpUtil(req, res).send(true, msg, null);
    });
}

function editUserInfo(req, res) {
    let recvData = JSON.parse(JSON.stringify(req.body));
    let userInfo = {};
    userInfo.mUserID = recvData.mUserID;
    userInfo.mEmail = recvData.mEmail;
    userInfo.mPhone = recvData.mPhone;
    userInfo.mDepartment = recvData.mDepartment;
    userInfo.mPassWord = recvData.mPassWord;

    userDBUtil.updateUserInfo(userInfo, (result, msg) => {
        if (result === false) {
            return new HttpUtil(req, res).send(false, msg, null);
        }
        req.session.userInfo = userInfo;
        new HttpUtil(req, res).send(true, msg, null);
    });
}

function insertFavoriteBookInfo(req, res) {
    let recvData = JSON.parse(JSON.stringify(req.body));
    let userInfo = req.session.userInfo;
    let bookInfo = {};
    bookInfo.user_id = userInfo.mUserID;
    bookInfo.book_id = recvData.book_id;

    bookDBUtil.insertFavoriteBookInfo(bookInfo, function (result, msg) {
        if (result == false) {
            return new HttpUtil(req, res).send(false, msg, null);
        }
        new HttpUtil(req, res).send(true, msg, null);
    });
}

function deleteFavoriteBookInfo(req, res) {
    let recvData = JSON.parse(JSON.stringify(req.body));
    let userInfo = req.session.userInfo;
    let bookInfo = {};

    bookInfo.user_id = userInfo.mUserID;
    bookInfo.book_id = recvData.book_id;

    bookDBUtil.deleteFavoriteBookInfo(bookInfo, function (result, msg) {
        if (result == false) {
            return new HttpUtil(req, res).send(false, msg, null);
        }
        new HttpUtil(req, res).send(true, msg, null);
    });
}

function getBookInfo(req, res) {
    let recvData = JSON.parse(JSON.stringify(req.query));
    let bookInfo = {};
    bookInfo.id = recvData.book_id;

    bookDBUtil.getBookInfo(bookInfo, function (result, msg, data) {
        if (result == false) {
            return new HttpUtil(req, res).send(false, msg, null);
        }
        new HttpUtil(req, res).send(true, null, data);
    });
}

function addBook(req, res) {
    bookDBUtil.addBook(req, res, function (result, msg) {
        if (result == false) {
            return new HttpUtil(req, res).send(false, msg, null);
        }

        new HttpUtil(req, res).send(true, msg, null);
    });
}

function editBook(req, res) {

    let bookInfo = {};

    bookInfo.book_id = req.body.book_id;
    bookInfo.category_id = req.body.category_id;
    bookInfo.book_name = req.body.book_name;
    bookInfo.book_content = req.body.book_content;
    bookInfo.book_price = req.body.book_price;
    bookInfo.book_status_id = req.body.book_status_id;
    bookInfo.picture_address = req.body.picture_address;
    bookInfo.publish_time = req.body.publish_time;
    bookInfo.sell = 1;

    bookDBUtil.editBook(bookInfo, function (result, msg) {
        if (result == false) {
            return new HttpUtil(req, res).send(false, msg, null);
        }

        new HttpUtil(req, res).send(true, msg, null);
    });
}

function editBookIncludeImage(req, res) {

    bookDBUtil.editBookIncludeImage(req, res, (result, msg) => {
        if (result == false) {
            return new HttpUtil(req, res).send(false, msg, null);
        }

        new HttpUtil(req, res).send(true, msg, null);
    });
}


function deleteBook(req, res) {
    let recvData = JSON.parse(JSON.stringify(req.body));
    let userInfo = req.session.userInfo;
    let bookInfo = {};
    bookInfo.user_id = userInfo.mUserID;
    bookInfo.book_id = recvData.book_id;

    bookDBUtil.deleteBook(bookInfo, function (result, msg) {
        if (result == false) {
            return new HttpUtil(req, res).send(false, msg, null);
        }
        new HttpUtil(req, res).send(true, msg, null);
    });
}

function updateUserInfo(req, res) {
    let recvData = JSON.parse(JSON.stringify(req.body));

    let userInfo = {};
    userInfo.mUserID = recvData.mUserID;
    userInfo.mPassWord = recvData.mPassWord;
    userInfo.mEmail = recvData.mEmail;
    userInfo.mPhone = recvData.mPhone;
    userInfo.mDepartment = recvData.mDepartment;
    userInfo.MAuthorize = false;

    userDBUtil.updateUserInfo(userInfo, function (result, msg) {
        if (result == false) {
            return new HttpUtil(req, res).send(false, msg, null);
        }

        new HttpUtil(req, res).send(true, msg, null);
    });
}

function searchAllBook(req, res) {
    let bookInfo = {};
    bookInfo.book_name = req.body.book_name;

    bookDBUtil.searchAllBook(bookInfo, function (result, data) {
        if (result == false) {
            return new HttpUtil(req, res).send(false, null, null);
        }

        new HttpUtil(req, res).send(true, null, data);
    });
}

function getUserChatInfoList(req, res) {
    
    let userInfo = req.session.userInfo;

    userDBUtil.getUserChatInfoList(userInfo.mUserID, function (result, data) {
        if (result == false) {
            return new HttpUtil(req, res).send(false, null);
        }

        new HttpUtil(req, res).send(true, null, data);
    });

}

function getChatInfo(req, res) {
    let chatInfo = {};
    chatInfo.chat_id = req.query.chat_id;

    userDBUtil.getChatInfo(chatInfo.chat_id, function (result, data) {
        if (result == false) {
            return new HttpUtil(req, res).send(false, null);
        }

        new HttpUtil(req, res).send(true, null, data);
    });
}

function getChatID(req, res) {

    let recvData = JSON.parse(JSON.stringify(req.query));
    let userInfo = req.session.userInfo;

    let chatInfo = {};
    chatInfo.to_user_id = recvData.toUser_id;
    chatInfo.user_id = userInfo.mUserID;
    chatInfo.date = moment().format('YYYY-MM-DD HH:mm:ss');

    if (userInfo.mUserID == chatInfo.to_user_id) {
        return new HttpUtil(req, res).send(false, '자신과 채팅 할 수 없습니다', null);
    }

    userDBUtil.getChatID(chatInfo, function (result, data) {
        if (result == false) {
            return new HttpUtil(req, res).send(false, null, null);
        }

        new HttpUtil(req, res).send(true, null, data);
    });

}

function insertUserChatInfo(req, res) {

    let recvData = JSON.parse(JSON.stringify(req.body));
    let userInfo = req.session.userInfo;

    let chatInfo = {};

    chatInfo.user_id = userInfo.mUserID;
    chatInfo.to_user_id = recvData.toUserID;
    chatInfo.date = moment().format('YYYY-MM-DD HH:mm:ss');
    chatInfo.message = recvData.message;

    userDBUtil.insertUserChatInfo(chatInfo, function (result, msg) {
        if (result == false) {
            return new HttpUtil(req, res).send(false, msg, null);
        }

        let sendMessage = {
            user: userInfo.mUserID,
            toUser : recvData.toUserID,
            time: chatInfo.date,
            message: chatInfo.message
        }

        new HttpUtil(req, res).send(true, null, sendMessage);

        global.socketIo.emit('ChatMessageEvent', sendMessage);
    });
}

function deleteChat(req, res) {

    let recvData = JSON.parse(JSON.stringify(req.body));
    let userInfo = req.session.userInfo;

    let chatInfo = {};
    chatInfo.user_id = userInfo.mUserID;
    chatInfo.chat_id = recvData.chat_id;

    userDBUtil.deleteUserChatInfo(chatInfo, function (result, msg) {
        if (result == false) {
            return new HttpUtil(req, res).send(false, msg, null);
        }

        let msgOK = '삭제 완료';
        new HttpUtil(req, res).send(true, msgOK, null);
    });
}
