angular
    .module('registerBookApp', ['ngCookies'])
    .controller('RegisterBookController', ['$scope', '$http', '$cookies', RegisterBookController]);

function RegisterBookController($scope, $http, $cookies) {

    var registerBookVM = this;
    registerBookVM.selectedBookImageFile = undefined;

    $scope.onSelectedBookImage = () => {
        let selectedFile = $('#REGISTER_BOOK_INPUT_BookImage')[0].files[0];
        if (!selectedFile) {
            return;
        }

        var reader = new FileReader();
        reader.onload = function (e) {
            $('#REGISTER_BOOK_INPUT_BookImageTemp').attr('src', e.target.result);
        }
        reader.readAsDataURL(selectedFile);

        $('#REGISTER_BOOK_INPUT_BookImageName').text(selectedFile.name);
        registerBookVM.selectedBookImageFile = selectedFile;
    };

    registerBookVM.onClickLogOut = () => {
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

    registerBookVM.onFileSelectBookImage = () => {
        $('#REGISTER_BOOK_INPUT_BookImage').click();
    }

    registerBookVM.onClickRegisterBook = () => {

        let bookName = $('#REGISTER_BOOK_NAME').val();
        if (bookName.length === 0) {
            return alert('책 제목을 입력해주세요.');
        }

        let bookContent = $('#REGISTER_BOOK_CONTENT').val();
        if (bookContent.length === 0) {
            return alert('책 내용을 입력해주세요.');
        }

        let bookPrice = $('#REGISTER_BOOK_PRICE').val();
        if (bookPrice.length === 0) {
            return alert('책 금액을 입력해주세요.');
        }

        let bookStatus = $("#REGISTER_BOOK_STATUS option:selected").val();
        if (bookStatus.length === 0) {
            return alert('책 상태를 선택해주세요.');
        }

        let bookCategory = $("#REGISTER_BOOK_CATEGORY option:selected").val();
        if (bookCategory.length === 0) {
            return alert('책 카테고리를 선택해주세요.');
        }

        let bookPublish = $("#REGISTER_BOOK_PUBLISH").val();
        if (bookPublish.length === 0) {
            return alert('출간일을 입력해주세요.');
        }

        if (registerBookVM.selectedBookImageFile === undefined) {
            return alert('선택된 책 이미지가 없습니다.');
        }

        let fd = new FormData();
        fd.append('book_name', bookName);
        fd.append('book_content', bookContent);
        fd.append('book_price', bookPrice);
        fd.append('book_status_id', bookStatus);
        fd.append('book_category_id', bookCategory);
        fd.append('publish_time', bookPublish);
        fd.append('bookImageFile', registerBookVM.selectedBookImageFile);

        $http.post('/httpAPI/addBook', fd, {
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



    // Initialize
    angular.element(document).ready(function () {
        
    });
}	