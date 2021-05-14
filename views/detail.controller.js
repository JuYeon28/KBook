angular
    .module('detailApp', ['ngCookies'])
    .controller('DetailController', ['$scope', '$http', '$cookies', DetailController]);

function DetailController($scope, $http, $cookies) {

    var detailVM = this;
    detailVM.bookInfo = {};

    detailVM.onInsertFavoriteBook = () => {
        $http.post('/httpAPI/insertFavoriteBookInfo', {
            book_id: $('#DETAIL_SELECTED_BOOK_ID').text()
        })
            .success(function (data, status, headers, config) {
                alert(data.m)
            })
            .error(function (data, status, header, config) {
                alert(data.m);
            });
    }

    detailVM.onChatBookUser = () => {

        console.log(detailVM.bookInfo);

        $http.get('/httpAPI/getChatID', {
            params: {
                toUser_id: detailVM.bookInfo.user_id
            }
        })
            .then(function (res) {
                if (res.data.r === true) {

                    let chatId = res.data.d;
                    window.open('/chat?id=' + chatId, 'window_name', 'width=570,height=640,location=no,status=no,scrollbars=yes');
                } else {
                    alert(res.data.m);
                }
            }, function (err) {
                console.log(err);
            });
    }

    detailVM.onClickLogOut = () => {
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

    function loadBookInfo(bookId) {
        $http.get('/httpAPI/getBookInfo', {
            params: {
                book_id: bookId
            }
        })
            .then(function (res) {
                if (res.data.r === true) {

                    detailVM.bookInfo = res.data.d;
                    detailVM.bookInfo.publish_Day = moment(detailVM.bookInfo.publish_time).format("YYYY-MM-DD");

                    switch (detailVM.bookInfo.book_status.book_status_id) {
                        case 1:
                            break;
                        case 2:
                            $('#DETAIL_RATING_BOOK_5').attr('style', 'display:none');
                            break;
                        case 3:
                            $('#DETAIL_RATING_BOOK_4').attr('style', 'display:none');
                            $('#DETAIL_RATING_BOOK_5').attr('style', 'display:none');
                            break;
                        case 4:
                            $('#DETAIL_RATING_BOOK_3').attr('style', 'display:none');
                            $('#DETAIL_RATING_BOOK_4').attr('style', 'display:none');
                            $('#DETAIL_RATING_BOOK_5').attr('style', 'display:none');
                            break;

                        case 5:
                        case 6:
                            $('#DETAIL_RATING_BOOK_2').attr('style', 'display:none');
                            $('#DETAIL_RATING_BOOK_3').attr('style', 'display:none');
                            $('#DETAIL_RATING_BOOK_4').attr('style', 'display:none');
                            $('#DETAIL_RATING_BOOK_5').attr('style', 'display:none');
                            break;
                    }

                    console.log(detailVM.bookInfo);
                }
            }, function (err) {
                console.log(err);
            });
    }

    // Initialize
    angular.element(document).ready(function () {

        let bookId = $('#DETAIL_SELECTED_BOOK_ID').text();
        loadBookInfo(bookId);
    });
}	