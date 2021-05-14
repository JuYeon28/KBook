
const sessionUtil = require('../../utility/sessionUtil');

module.exports = function (app) {

    /* Web Page Handler */
    let pageList = [

        /* Index Page */
        ['/', index, sessionUtil.sConstant.LEVEL_ALL],
        ['/login', login, sessionUtil.sConstant.LEVEL_ALL],
        ['/user', user, sessionUtil.sConstant.LEVEL_USER],
        ['/favorite', favorite, sessionUtil.sConstant.LEVEL_USER],
        ['/detail', detail, sessionUtil.sConstant.LEVEL_ALL],
        ['/registerBook', registerBook, sessionUtil.sConstant.LEVEL_USER],
        ['/editBook', editBook, sessionUtil.sConstant.LEVEL_USER],
        ['/chat', chat, sessionUtil.sConstant.LEVEL_USER],
    ];

    /* set Web Page Handler */
    pageList.forEach(list => {
        if (list[2] === sessionUtil.sConstant.LEVEL_ALL) {
            app.get(list[0], list[1]);
        } else {
            app.get(list[0],
                sessionUtil.pageReadSession(list[2]),
                list[1]);
        }
    });
}

function index(req, res) {

    let msg = undefined;
    let department = undefined;

    let userInfo = req.session.userInfo;
    if (userInfo === undefined) {
        msg = '로그인이 필요합니다';
    } else {
        msg = userInfo.mUserID + '님 환영합니다';
        department = userInfo.mDepartment;
    }
    res.render('index', { userLogInStatus: msg, userDepartment: department });
}

function login(req, res) {

    let userInfo = req.session.userInfo;
    if (userInfo === undefined) {
        res.render('login');
    } else {
        return res.redirect('/');
    }
}

function user(req, res) {

    let msg = '';
    let userInfo = req.session.userInfo;
    msg = userInfo.mUserID + '님 환영합니다';

    res.render('user', { userLogInStatus: msg });
}

function favorite(req, res) {
    let msg = '';
    let userInfo = req.session.userInfo;
    msg = userInfo.mUserID + '님 환영합니다';
    res.render('favorite', { userLogInStatus: msg });
}

function detail(req, res) {

    let bookId = req.query.id;

    let msg = '';

    let userInfo = req.session.userInfo;
    if (userInfo === undefined) {
        msg = '로그인이 필요합니다';
    } else {
        msg = userInfo.mUserID + '님 환영합니다';
    }
    res.render('detail', { userLogInStatus: msg, selectedBookId: bookId });
}

function registerBook(req, res) {
    let msg = '';
    let userInfo = req.session.userInfo;
    msg = userInfo.mUserID + '님 환영합니다';

    res.render('registerBook', { userLogInStatus: msg });
}

function editBook(req, res) {

    let bookId = req.query.id;

    let msg = '';
    let userInfo = req.session.userInfo;
    msg = userInfo.mUserID + '님 환영합니다';

    res.render('editBook', { userLogInStatus: msg, selectedBookId: bookId });
}

function chat(req, res) {

    let chatId = req.query.id;
    let userInfo = req.session.userInfo;
    let userId = userInfo.mUserID;

    res.render('chat', { selectedUserId: userId, selectedChatId: chatId });
}

