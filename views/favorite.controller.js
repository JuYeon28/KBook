angular
    .module('favoriteApp', ['ngCookies'])
    .controller('FavoriteController', ['$scope', '$http', '$cookies', FavoriteController]);

function FavoriteController($scope, $http, $cookies) {

    var favoriteVM = this;
    favoriteVM.changeBookCategory = changeBookCategory;
    favoriteVM.onSelectedCategory = onSelectedCategory;
    favoriteVM.bookCategoryList = [];
    favoriteVM.bookItemList = [];
    favoriteVM.filteringBookItemList = [];
    favoriteVM.selectedBookCategory;

    favoriteVM.bookItemList = [];

    favoriteVM.onClickLogOut = () => {
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

    favoriteVM.onDeleteFavoriteBook = (bookId) => {
        $http.post('/httpAPI/deleteFavoriteBookInfo', {
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
    
    function changeBookCategory() {
        console.log(this.selectedBookCategory);

        favoriteVM.filteringBookItemList = [];

        let bookLength = favoriteVM.bookItemList.length;
        for (let i = 0; i < bookLength; i++) {

            if (this.selectedBookCategory.id == 1 || favoriteVM.bookItemList[i].book_category.category_id == this.selectedBookCategory.id) {
                favoriteVM.filteringBookItemList.push(favoriteVM.bookItemList[i]);
            }
        }
    }

    function onSelectedCategory(id) {

        let bookCategoryLength = favoriteVM.bookCategoryList.length;
        for (let i = 0; i < bookCategoryLength; i++) {
            if (favoriteVM.bookCategoryList[i].id == id) {
                favoriteVM.selectedBookCategory = favoriteVM.bookCategoryList[i];
            }
        }

        favoriteVM.filteringBookItemList = [];

        let bookLength = favoriteVM.bookItemList.length;
        for (let i = 0; i < bookLength; i++) {

            if (favoriteVM.selectedBookCategory.id == 1 || favoriteVM.bookItemList[i].book_category.category_id == favoriteVM.selectedBookCategory.id) {
                favoriteVM.filteringBookItemList.push(favoriteVM.bookItemList[i]);
            }
        }

        setTimeout(function () {
            $('.selectpicker').selectpicker('refresh');
        }, 10)
    }

    function loadBookList() {
        $http.get('/httpAPI/getUserFavoriteBookInfoList')
            .then(function (res) {
                if (res.data.r === true) {

                    favoriteVM.bookItemList = res.data.d;
                    favoriteVM.filteringBookItemList = res.data.d;

                    console.log(favoriteVM.bookItemList);
                }
            }, function (err) {
                console.log(err);
            });
    }

    function loadBookCategory() {
        $http.get('/httpAPI/getBookCategoryInfoList')
            .then(function (res) {
                if (res.data.r === true) {

                    favoriteVM.bookCategoryList = res.data.d;
                    favoriteVM.selectedBookCategory = favoriteVM.bookCategoryList[0];

                    setTimeout(function () {
                        $('.selectpicker').selectpicker('refresh');
                    }, 10)
                }
            }, function (err) {
                console.log(err);
            });
    }

    // Initialize
    angular.element(document).ready(function () {
        loadBookCategory();
        loadBookList();
    });
}	