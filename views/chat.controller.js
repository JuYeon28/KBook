
var globalSocket = io();

angular
    .module('chatApp', ['ngCookies'])
    .controller('ChatController', ['$scope', '$http', '$cookies', ChatController]);

function ChatController($scope, $http, $cookies) {

    var chatVM = this;
    chatVM.selectedUserId = undefined;
    chatVM.selectedToUserId = undefined;
    chatVM.selectedChatId = undefined;

    chatVM.currentTime = moment().format('MMMM Do YYYY') + ' ' + moment().format('dddd');

    var myMessage =
        `
        <li class="left clearfix">
            <span class="chat-img pull-left">
                <img src="http://placehold.it/50/55C1E7/fff&text=%USER_INDEX%" alt="User Avatar" class="img-circle" />
            </span>
            <div class="chat-body clearfix">
                <div class="header">
                    <strong class="primary-font">%USER%</strong>
                    <small class="pull-right text-muted">
                        <span class="glyphicon glyphicon-time"></span> %TIME%
                    </small>
                </div>
                <p>%MESSAGE%</p>
            </div>
        </li>
        `;

    var userMessage =
        `
        <li class="right clearfix">
                <span class="chat-img pull-right">
                    <img src="http://placehold.it/50/FA6F57/fff&text=%USER_INDEX%" alt="User Avatar" class="img-circle" />
                </span>
                <div class="chat-body clearfix">
                    <div class="header">
                        <small class=" text-muted">
                            <span class="glyphicon glyphicon-time"></span> %TIME%
                        </small>
                    <strong class="pull-right primary-font">%USER%</strong>
                </div>
                <p>%MESSAGE%</p>
            </div>
        </li>
        `;

    function makeMessage(inoutMessage, index, user, time, message) {

        inoutMessage = inoutMessage.replace("%USER_INDEX%", index);
        inoutMessage = inoutMessage.replace("%USER%", user);
        inoutMessage = inoutMessage.replace("%TIME%", time);
        inoutMessage = inoutMessage.replace("%MESSAGE%", message);

        $('#CHAT_MESSAGE').append(inoutMessage);

    }

    chatVM.onClickSend = () => {

        let chatMessage = $('#CHAT_INPUT_MESSAGE').val();
        if (chatMessage.length == 0) {
            return alert('메시지를 입력해주세요.');
        }

        $http.post('/httpAPI/insertUserChatInfo', {
            toUserID: chatVM.chatInfo.toUserID,
            message: $('#CHAT_INPUT_MESSAGE').val()
        })
            .success(function (data, status, headers, config) {
                if (data.r === true) {

                    let index = data.d.user.charAt(0);
                    let user = data.d.user;
                    let time = data.d.time;
                    let message = data.d.message;

                    makeMessage(myMessage, index, user, time, message);

                    $('#CHAT_MESSAGE_VIEW').animate({ scrollTop: $('#CHAT_MESSAGE_VIEW').prop("scrollHeight") }, 500);
                    $('#CHAT_INPUT_MESSAGE').val('');

                } else {
                    alert(data.m);
                }
            })
            .error(function (data, status, header, config) {
                alert(data.message);
            });

    }

    function loadChatInfo(chatId) {
        $http.get('/httpAPI/getChatInfo', {
            params: {
                chat_id: chatId
            }
        })
            .then(function (res) {
                if (res.data.r === true) {

                    chatVM.selectedToUserId = res.data.d.toUserID;
                    chatVM.chatInfo = res.data.d;

                    for (let i = 0; i < chatVM.chatInfo.chatHistory.length; i++) {

                        let inoutMessage = undefined;
                        let index = chatVM.chatInfo.chatHistory[i].user.charAt(0);
                        let user = chatVM.chatInfo.chatHistory[i].user;
                        let time = moment(chatVM.chatInfo.chatHistory[i].date).format("YYYY-MM-DD HH:mm:ss");
                        let message = chatVM.chatInfo.chatHistory[i].message;

                        if (chatVM.selectedUserId == user) {
                            inoutMessage = myMessage;
                        } else {
                            inoutMessage = userMessage;
                        }
                        if (message !== "") {
                            makeMessage(inoutMessage, index, user, time, message);
                        }

                    }
                    
                    $('#CHAT_MESSAGE_VIEW').animate({ scrollTop: $('#CHAT_MESSAGE_VIEW').prop("scrollHeight") }, 500);
                    console.log(chatVM.chatInfo);
                }
            }, function (err) {
                console.log(err);
            });
    }

    globalSocket.on('ChatMessageEvent', function (data) {

        if (chatVM.selectedToUserId == data.user && chatVM.selectedUserId == data.toUser) {
            let inoutMessage = userMessage;
            let index = data.user.charAt(0);
            let user = data.user;
            let time = moment(data.time).format("YYYY-MM-DD HH:mm:ss");
            let message = data.message;

            if (message !== "") {
                makeMessage(inoutMessage, index, user, time, message);
                $('#CHAT_MESSAGE_VIEW').animate({ scrollTop: $('#CHAT_MESSAGE_VIEW').prop("scrollHeight") }, 500);
            }
        }
        console.log(data);
    });

    // Initialize
    angular.element(document).ready(function () {

        chatVM.selectedUserId = $('#CHAT_SELECTED_USER_ID').text();
        chatVM.selectedChatId = $('#CHAT_SELECTED_CHAT_ID').text();

        loadChatInfo(chatVM.selectedChatId);

        $(document).ready(() => {
            $('#CHAT_INPUT_MESSAGE').keypress((e) => {
                if (e.which == 13) {
                    chatVM.onClickSend();
                }
            })
        });
    });
}

