
angular
    .module('indexApp', ['ngCookies'])
    .controller('IndexController', ['$scope', '$http', '$cookies', IndexController]);

function IndexController($scope, $http, $cookies) {

    var indexVM = this;
    indexVM.changeBookCategory = changeBookCategory;
    indexVM.onSelectedCategory = onSelectedCategory;
    indexVM.bookCategoryList = [];
    indexVM.bookItemList = [];
    indexVM.filteringBookItemList = [];
    indexVM.selectedBookCategory;

    indexVM.bookItemList = [];

    indexVM.onClickLogOut = () => {

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

    indexVM.onClickSearch = () => {

        let searchName = $('#INDEX_BOOK_SEARCH_TEXT').val();

        $http.post('/httpAPI/searchAllBook', {
            book_name : searchName
        })
            .success(function (data, status, headers, config) {
                
                indexVM.bookItemList = data.d;
                indexVM.filteringBookItemList = data.d;
            })
            .error(function (data, status, header, config) {
                alert(data.m);
            });
    }
    
    function changeBookCategory() {
        console.log(this.selectedBookCategory);

        indexVM.filteringBookItemList = [];

        let bookLength = indexVM.bookItemList.length;
        for (let i = 0; i < bookLength; i++) {

            if (this.selectedBookCategory.id == 1 || indexVM.bookItemList[i].book_category.category_id == this.selectedBookCategory.id) {
                indexVM.filteringBookItemList.push(indexVM.bookItemList[i]);
            }
        }
    }

    function onSelectedCategory(id) {

        let bookCategoryLength = indexVM.bookCategoryList.length;
        for (let i = 0; i < bookCategoryLength; i++) {
            if (indexVM.bookCategoryList[i].id == id) {
                indexVM.selectedBookCategory = indexVM.bookCategoryList[i];
            }
        }

        indexVM.filteringBookItemList = [];

        let bookLength = indexVM.bookItemList.length;
        for (let i = 0; i < bookLength; i++) {

            if (indexVM.selectedBookCategory.id == 1 || indexVM.bookItemList[i].book_category.category_id == indexVM.selectedBookCategory.id) {
                indexVM.filteringBookItemList.push(indexVM.bookItemList[i]);
            }
        }

        setTimeout(function () {
            $('.selectpicker').selectpicker('refresh');
        }, 10)
    }

    function loadBookList() {
        $http.get('/httpAPI/getBookInfoList')
            .then(function (res) {
                if (res.data.r === true) {

                    indexVM.bookItemList = res.data.d;
                    indexVM.filteringBookItemList = res.data.d;

                    console.log(indexVM.bookItemList);
                    loadBookCategory();
                }
            }, function (err) {
                console.log(err);
            });
    }

    function loadBookCategory() {
        $http.get('/httpAPI/getBookCategoryInfoList')
            .then(function (res) {
                if (res.data.r === true) {

                    indexVM.bookCategoryList = res.data.d;
                
                    indexVM.selectedBookCategory = indexVM.bookCategoryList[0];
                    let userDepartment = $('#INDEX_USER_DEPARTMENT').text();
                    if (userDepartment !== undefined) {
                        let bookCategoryLength = indexVM.bookCategoryList.length;
                        for (let i = 0; i < bookCategoryLength; i++) {

                            if (indexVM.bookCategoryList[i].name.includes(userDepartment)) {
                                onSelectedCategory(indexVM.bookCategoryList[i].id);
                                break;
                            }
                        }
                    } 

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
        loadBookList();
        //loadBookCategory();
    });

    
}	