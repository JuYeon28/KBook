angular
    .module('userApp', ['ngCookies'])
    .controller('UserController', ['$scope', '$http', '$cookies', UserController]);

function UserController($scope, $http, $cookies) {

    var userVM = this;
    userVM.bookItemList = [];
    userVM.chatItemList = [];

    userVM.userInfo = {};

    userVM.onClickLogOut = () => {
        $http.post('/httpAPI/userLogOut', {
        })
            .success(function (data, status, headers, config) {
                nextTargetUrl = data.d;
                location.replace(nextTargetUrl);
            })
            .error(function (data, status, header, config) {
                alert(data.m);
            });
    }

    userVM.onClickEditBook = (bookId) => {
        location.href = '/editBook?id=' + bookId;
    }

    userVM.onClickDeleteBook = (bookId) => {
        var deleteConfirm = confirm("정말 삭제하시겠습니까? [주의] 복구할 수 없습니다.");
        if (deleteConfirm == true) {

            $http.post('/httpAPI/deleteBook', {
                book_id: bookId
            })
                .success(function (data, status, headers, config) {
                    alert(data.m);
                    location.reload();
                })
                .error(function (data, status, header, config) {
                    alert(data.m);
                });
        }
    }

    userVM.onClickDeleteChat = (chatId) => {
        var deleteConfirm = confirm("정말 삭제하시겠습니까? [주의] 복구할 수 없습니다.");
        if (deleteConfirm == true) {

            $http.post('/httpAPI/deleteChat', {
                chat_id: chatId
            })
                .success(function (data, status, headers, config) {
                    alert(data.m);
                    location.reload();
                })
                .error(function (data, status, header, config) {
                    alert(data.m);
                });
        }
    }

    userVM.onClickChat = (chatId) => {
        window.open('/chat?id=' + chatId, 'window_name', 'width=570,height=640,location=no,status=no,scrollbars=yes');
    }

    userVM.onClickSellView = () => {
        $('#USER_SELL_VIEW').attr('style', 'display:block');
        $('#USER_CHAT_VIEW').attr('style', 'display:none');
        $('#USER_INFO_VIEW').attr('style', 'display:none');
    }

    userVM.onClickChatView = () => {
        $('#USER_SELL_VIEW').attr('style', 'display:none');
        $('#USER_CHAT_VIEW').attr('style', 'display:block');
        $('#USER_INFO_VIEW').attr('style', 'display:none');
    }

    userVM.onClickInfoView = () => {
        $('#USER_SELL_VIEW').attr('style', 'display:none');
        $('#USER_CHAT_VIEW').attr('style', 'display:none');
        $('#USER_INFO_VIEW').attr('style', 'display:block');
    }

    userVM.onClickEditUser = () => {

        if (userVM.mEditUserID.length == 0) {
            return alert('사용자 ID를 입력해주세요.');
        }

        if (userVM.mEditPassWord.length == 0) {
            return alert('비밀번호를 입력해주세요.');
        }

        if (userVM.mEditPassWord !== userVM.mEditRePassWord) {
            return alert('비밀번호가 일치하지 않습니다.');
        }

        if (userVM.mEditEmail.length == 0) {
            return alert('E-Mail 입력해주세요.');
        }

        if (userVM.mEditPhone.length == 0) {
            return alert('연락처를 입력해주세요.');
        }

        if (userVM.mEditDepartment.length == 0) {
            return alert('단과대학을 입력해주세요.');
        }

        $http.post('/httpAPI/editUserInfo', {
            mUserID: userVM.mEditUserID,
            mEmail: userVM.mEditEmail,
            mPhone: userVM.mEditPhone,
            mDepartment: userVM.mEditDepartment,
            mPassWord: userVM.mEditPassWord
        })
            .success(function (data, status, headers, config) {
                alert(data.m);
                location.reload();
            })
            .error(function (data, status, header, config) {
                alert(data.m);
            });
    }

    function loadBookList() {
        //$http.get('/httpAPI/getUserBookInfoList')
        $http.get('/httpAPI/getBookInfoList')
            .then(function (res) {
                if (res.data.r === true) {

                    userVM.bookItemList = res.data.d;

                    console.log(userVM.bookItemList);
                }
            }, function (err) {
                console.log(err);
            });
    }

    function loadUserInfo() {
        $http.get('/httpAPI/getUserInfo')
            .then(function (res) {
                if (res.data.r === true) {

                    userVM.userInfo = res.data.d;

                    userVM.mEditUserID = userVM.userInfo.mUserID;
                    userVM.mEditEmail = userVM.userInfo.mEmail;
                    userVM.mEditDepartment = userVM.userInfo.mDepartment;
                    userVM.mEditPhone = userVM.userInfo.mPhone;
                    userVM.mEditPassWord = "";
                    userVM.mEditRePassWord = "";

                    console.log(userVM.userInfo);
                }
            }, function (err) {
                console.log(err);
            });
    }

    function loadUserChatList() {
        $http.get('/httpAPI/getUserChatInfoList')
            .then(function (res) {
                if (res.data.r === true) {

                    userVM.chatItemList = res.data.d;

                    for (let i = 0; i < userVM.chatItemList.length; i++) {

                        let chatHistoryList = userVM.chatItemList[i].chatHistory;
                        if (chatHistoryList.length != 0) {

                            let colorCode = Math.round(Math.random() * 0xFFFFFF).toString(16);
                            let userCode = userVM.chatItemList[i].toUserID.charAt(0);
                            userVM.chatItemList[i].recentImage = 'http://placehold.it/75/' + colorCode + ' /fff&text=' + userCode;
                            userVM.chatItemList[i].recentMessage = chatHistoryList[chatHistoryList.length - 1].message;
                            userVM.chatItemList[i].recentDate = moment(chatHistoryList[chatHistoryList.length - 1].date).format("YYYY-MM-DD HH:mm:ss");
                        }
                    }

                    console.log(userVM.chatItemList);
                }
            }, function (err) {
                console.log(err);
            });
    }

    // Initialize
    angular.element(document).ready(function () {
        loadBookList();
        loadUserInfo();
        loadUserChatList();
    });
}
