angular
    .module('editBookApp', ['ngCookies'])
    .controller('EditBookController', ['$scope', '$http', '$cookies', EditBookController]);

function EditBookController($scope, $http, $cookies) {

    var editBookVM = this;
    editBookVM.selectedBookImageFile = undefined;

    editBookVM.bookInfo = {};

    $scope.onSelectedBookImage = () => {
        let selectedFile = $('#EDIT_BOOK_INPUT_BookImage')[0].files[0];
        if (!selectedFile) {
            return;
        }

        var reader = new FileReader();
        reader.onload = function (e) {
            $('#EDIT_BOOK_INPUT_BookImageTemp').attr('src', e.target.result);
        }
        reader.readAsDataURL(selectedFile);

        $('#EDIT_BOOK_INPUT_BookImageName').text(selectedFile.name);
        editBookVM.selectedBookImageFile = selectedFile;
    };

    editBookVM.onClickLogOut = () => {
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

    editBookVM.onFileSelectBookImage = () => {
        $('#EDIT_BOOK_INPUT_BookImage').click();
    }

    editBookVM.onClickEditeBook = () => {

        let bookName = $('#EDIT_BOOK_NAME').val();
        if (bookName.length === 0) {
            return alert('책 제목을 입력해주세요.');
        }

        let bookContent = $('#EDIT_BOOK_CONTENT').val();
        if (bookContent.length === 0) {
            return alert('책 내용을 입력해주세요.');
        }

        let bookPrice = $('#EDIT_BOOK_PRICE').val();
        if (bookPrice.length === 0) {
            return alert('책 금액을 입력해주세요.');
        }

        let bookStatus = $("#EDIT_BOOK_STATUS option:selected").val();
        if (bookStatus.length === 0) {
            return alert('책 상태를 선택해주세요.');
        }

        let bookCategory = $("#EDIT_BOOK_CATEGORY option:selected").val();
        if (bookCategory.length === 0) {
            return alert('책 카테고리를 선택해주세요.');
        }

        let bookPublish = $("#EDIT_BOOK_PUBLISH").val();
        if (bookPublish.length === 0) {
            return alert('출간일을 입력해주세요.');
        }

        if (editBookVM.selectedBookImageFile === undefined) {

            $http.post('/httpAPI/editBook', {
                category_id: bookCategory,
                book_name: bookName,
                book_content: bookContent,
                book_price: bookPrice,
                book_status_id: bookStatus,
                publish_time: bookPublish,
                book_id: editBookVM.bookInfo.book_id
            })
                .success(function (data, status, headers, config) {
                    alert(data.m);
                    location.replace('/');
                })
                .error(function (data, status, header, config) {
                    alert(data.m);
                });

        } else {

            let fd = new FormData();
            fd.append('book_name', bookName);
            fd.append('book_content', bookContent);
            fd.append('book_price', bookPrice);
            fd.append('book_status_id', bookStatus);
            fd.append('book_category_id', bookCategory);
            fd.append('publish_time', bookPublish);
            fd.append('bookImageFile', editBookVM.selectedBookImageFile);
            fd.append('book_id', editBookVM.bookInfo.book_id);
            
            $http.post('/httpAPI/editBookIncludeImage', fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
                .success(function (data, status, headers, config) {
                    alert(data.m);
                    location.replace('/');
                })
                .error(function (data, status, header, config) {
                    alert(data.m);
                });
        }
    }

    function loadBookInfo(bookId) {
        $http.get('/httpAPI/getBookInfo', {
            params: {
                book_id: bookId
            }
        })
            .then(function (res) {
                if (res.data.r === true) {

                    editBookVM.bookInfo = res.data.d;
                    console.log(editBookVM.bookInfo);

                    $('#EDIT_BOOK_NAME').val(editBookVM.bookInfo.book_name);
                    $('#EDIT_BOOK_CONTENT').val(editBookVM.bookInfo.book_content);
                    $('#EDIT_BOOK_PRICE').val(editBookVM.bookInfo.book_price);

                    $("#EDIT_BOOK_STATUS").val(editBookVM.bookInfo.book_status.book_status_id).change();
                    $("#EDIT_BOOK_CATEGORY").val(editBookVM.bookInfo.book_category.category_id).change();

                    $("#EDIT_BOOK_PUBLISH").val(moment(editBookVM.bookInfo.publish_time).format("YYYY-MM-DD"));

                    var nameSplit = editBookVM.bookInfo.picture_address.split('/');

                    $('#EDIT_BOOK_INPUT_BookImageName').text(nameSplit[2]);
                    $('#EDIT_BOOK_INPUT_BookImageTemp').attr('src', editBookVM.bookInfo.picture_address);
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