const moment = require('moment');
const crypto = require('crypto');
const dbConstant = require('../dbConstant');
const multer = require('multer');
const jimp = require('jimp');
var async = require('async');

module.exports.createBookTable = createBookTable;
module.exports.createBookCategoryTable = createBookCategoryTable;
module.exports.createBookStatusTable = createBookStatusTable;
module.exports.createBookFavoriteTable = createBookFavoriteTable;
module.exports.getBookCategoryInfoList = getBookCategoryInfoList;
module.exports.getBookInfoList = getBookInfoList;
module.exports.getUserBookInfoList = getUserBookInfoList;
module.exports.getBookInfo = getBookInfo;
module.exports.insertFavoriteBookInfo = insertFavoriteBookInfo;
module.exports.deleteFavoriteBookInfo = deleteFavoriteBookInfo;
module.exports.addBook = addBook;
module.exports.deleteBook = deleteBook;
module.exports.editBook = editBook;
module.exports.editBookIncludeImage = editBookIncludeImage;
module.exports.getUserFavoriteBookInfoList = getUserFavoriteBookInfoList;
module.exports.searchAllBook = searchAllBook;


function createBookTable(next) {

    let sql = 'CREATE TABLE IF NOT EXISTS ' + dbConstant.TB_BOOK + ' (\
        `book_id` INT NOT NULL AUTO_INCREMENT,\
        `book_category_id` INT NOT NULL,\
        `book_name` VARCHAR(255) NOT NULL,\
        `book_price` INT NOT NULL,\
        `book_status_id` INT NOT NULL,\
        `book_content` VARCHAR(255) NOT NULL,\
        `user_id` VARCHAR(16) NOT NULL,\
        `picture_address` VARCHAR(255) NOT NULL,\
        `publish_time` DATETIME NOT NULL,\
        `sell` TINYINT(1) NOT NULL,\
        PRIMARY KEY (`book_id`),\
        UNIQUE KEY `book` (`user_id`,`book_category_id`,`book_name`,`book_price`,`book_status_id`,`book_content`,`picture_address`,`publish_time`))  DEFAULT CHARSET=utf8;;'

    global.db.query(sql, (err, results, fields) => {
        if (err) {
            console.log(err);
        }

        let bookInfoList = [
            {
                book_id: 1,
                category_id: 3,
                book_name: '알고리즘 문제 해결 전략',
                book_content: '<알고리즘 문제 해결 전략>은 새로운 알고리즘 책입니다. 종이에 적힌 의사코드를 외우며 알고리즘을 배우는 대신, 해당 알고리즘을 적용해 푸는 프로그래밍 문제들을 직접 풀어보며 알고리즘 설계 기법과 자료 구조에 대해 배울 수 있도록 구성되어 있습니다. 풀이 과정은 독자가 글쓴이의 머릿속에서 일어난 문제 해결 과정을 최대한 이해할 수 있도록 설명되어 있습니다. 그래서 독자는 예전에는 피상적으로 이해하던 알고리즘과 자료 구조에 대해 이들이 어떻게 사용되는지, 왜 그렇게 되었는지에 대해 직관적으로 이해할 수 있게 됩니다.',
                book_price: 50000,
                user_id: 'test',
                picture_address: 'img/product/product-1.jpg',
                publish_time: '2008-01-02 00:00:00',
                book_status_id: 1,
                sell: 1
            },
            {
                book_id: 2,
                category_id: 3,
                book_name: '케라스 창시자에게 배우는 딥러닝',
                book_content: '케라스 창시자이자 구글 딥러닝 연구원인 저자는 ‘인공 지능의 민주화’를 강조한다. 이 책 역시 많은 사람에게 딥러닝을 전달하는 또 다른 방법이며, 딥러닝 이면의 개념과 구현을 가능하면 쉽게 이해할 수 있게 하는 데 중점을 두었다. 1부에서는 딥러닝, 신경망, 머신 러닝의 기초를, 2부에서는 컴퓨터 비전, 텍스트, 시퀀스, 생성 모델을 위한 딥러닝 같은 실전 딥러닝을 설명한다. 이외에도 딥러닝을 언제 적용하는지, 한계는 무엇인지, 저자가 생각하는 딥러닝의 방향과 비전까지 엿볼 수 있다. 또한, 실제 사용하는 확장 가능한 다양한 예제를 수록했으며, 수학 장벽을 없애고자 수학적 표기 없이 직관적이고 간결한 코드로 개념을 설명한다. 딥러닝을 처음부터 배우거나 이해의 폭을 넓히고자 하는 분들에게 추천한다.',
                book_price: 85000,
                user_id: 'test',
                picture_address: 'img/product/product-5.jpg',
                publish_time: '2008-01-02 00:00:00',
                book_status_id: 1,
                sell: 1
            },
            {
                book_id: 3,
                category_id: 3,
                book_name: '프로그래머를 위한 확률 통계',
                book_content: '데이터를 분석하려면 통계 개념을 잘 알고 있어야 한다. 또한, 데이터 분석 도구의 개념도 잘 알아야 한다. 이 책은 데이터를 수집하거나 패턴 및 테스트 가설을 세우는 일 등의 사례를 배우면서 데이터 분석 프로세스와 데이터 분석 방법의 이해를 하는 데 도움이 될 것이다.',
                book_price: 32000,
                user_id: 'test',
                picture_address: 'img/product/product-2.jpg',
                publish_time: '2008-01-02 00:00:00',
                book_status_id: 1,
                sell: 1
            },
            {
                book_id: 4,
                category_id: 3,
                book_name: '한 권으로 끝내는 아두이노 입문 + 실전',
                book_content: '00쪽의 분량에 130여개의 단계별 초수/중수/고수 예제 실습과 실전 프로젝트 만들까지 아두이노의 모든 것이 한 권에 담겨있습니다. 이 도서는 아두이노를 처음 접하는 왕초보자가 고수가 될 수 있는 초수/중수/고수/실전 프로젝트의 알찬 구성과 프로그램을 모르는 초보자들도 이해할 수 있게 진짜 친절하게 설명하였습니다. ',
                book_price: 20000,
                user_id: 'test',
                picture_address: 'img/product/product-6.jpg',
                publish_time: '2008-01-02 00:00:00',
                book_status_id: 1,
                sell: 1
            },
            {
                book_id: 5,
                category_id: 3,
                book_name: '파이썬 라이브러리를 활용한 머신러닝 : 사이킷런 핵',
                book_content: '현업에서 머신러닝을 연구하고 인공지능 서비스를 개발하기 위해 꼭 학위를 받을 필요는 없습니다. 사이킷런(scikit-learn)과 같은 훌륭한 머신러닝 라이브러리가 복잡하고 난해한 작업을 직관적인 인터페이스로 감싸주는 덕분이죠. 이 책에서는 사이킷런의 핵심 개발자가 복잡한 수학을 동원하지 않고 실용적으로 머신러닝을 구축하는 모든 단계를 설명합니다. 미적분, 선형대수, 확률 이론을 공부하지 않았어도 이 책을 통해 머신러닝을 활용할 수 있게 될 것입니다.',
                book_price: 28800,
                user_id: 'chat1',
                picture_address: 'img/product/product-3.jpg',
                publish_time: '2008-01-02 00:00:00',
                book_status_id: 1,
                sell: 1
            },
            {
                book_id: 6,
                category_id: 3,
                book_name: '인공지능을 위한 수학',
                book_content: '『인공지능을 위한 수학』은 인공지능 전문 서적을 볼 때, 수많은 수식에 현기증을 느끼는 분, 인공지능 알고리즘을 체계적으로 배우고 싶지만, 어떤 수학책부터 봐야 할지 막막한 분, 인공지능 알고리즘으로 모델을 만들고는 있지만, 블랙박스처럼 사용하고 있어서 이 기회에 수학을 제대로 다시 배워보고 싶은 분들을 위한 도서이다.',
                book_price: 25000,
                user_id: 'chat1',
                picture_address: 'img/product/product-7.jpg',
                publish_time: '2008-01-02 00:00:00',
                book_status_id: 1,
                sell: 1
            },
            {
                book_id: 7,
                category_id: 3,
                book_name: '핸즈온 머신러닝',
                book_content: '최근의 눈부신 혁신들로 딥러닝은 머신러닝 분야 전체를 뒤흔들고 있습니다. 이제 이 기술을 거의 모르는 프로그래머도 데이터로부터 학습하는 프로그램을 어렵지 않게 작성할 수 있습니다. ',
                book_price: 33000,
                user_id: 'chat2',
                picture_address: 'img/product/product-4.jpg',
                publish_time: '2008-01-02 00:00:00',
                book_status_id: 1,
                sell: 1
            },
            {
                book_id: 8,
                category_id: 3,
                book_name: '프로그래머를 위한 선형대수',
                book_content: '행렬식을 계산할 수는 있지만, 행렬식의 의미는 모른다? 손으로 계산하든 컴퓨터로 계산하든 식의 의미를 이해하지 못하면 무슨 소용이 있을까? 선형대수를 푸는 방법이 아니라 ‘왜 이런 결과가 나타나는가?’, ‘나타난 결과가 어떤 의미인가?’를 배운다.',
                book_price: 32000,
                user_id: 'chat2',
                picture_address: 'img/product/product-8.jpg',
                publish_time: '2008-01-02 00:00:00',
                book_status_id: 1,
                sell: 1
            },
        ];


        let idx = 0;
        async.whilst(function () {
            return bookInfoList.length > idx;
        }, function (callback) {
            sql = 'INSERT IGNORE INTO ' + dbConstant.TB_BOOK + ' (\
                book_category_id,\
                book_name,\
                book_content,\
                book_price,\
                book_status_id,\
                user_id,\
                picture_address,\
                publish_time,\
                sell) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';


            global.db.query(sql,
                [bookInfoList[idx].category_id,
                bookInfoList[idx].book_name,
                bookInfoList[idx].book_content,
                bookInfoList[idx].book_price,
                bookInfoList[idx].book_status_id,
                bookInfoList[idx].user_id,
                bookInfoList[idx].picture_address,
                bookInfoList[idx].publish_time,
                bookInfoList[idx].sell],
                (err, results, fields) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        idx++
                        callback();
                    }
                });
        });

    });

    next(true);
}

function createBookCategoryTable(next) {

    let sql = 'CREATE TABLE IF NOT EXISTS ' + dbConstant.TB_BOOK_CATEGORY + '(\
        `id` INT NOT NULL AUTO_INCREMENT,\
        `book_category_id` INT NOT NULL,\
        `category_name` VARCHAR(255) NOT NULL,\
        PRIMARY KEY (`id`),\
        UNIQUE KEY `book_category_id` (`book_category_id`))  DEFAULT CHARSET=utf8;;'

    global.db.query(sql, (err, results, fields) => {
        if (err) {
            console.log(err);
        }

        let bookCategoryInfoList = [
            { id: 1, name: '전체 카테고리' },
            { id: 2, name: '디자인대학' },
            { id: 3, name: '과학기술대학' },
            { id: 4, name: '의료생명대학' },
            { id: 5, name: '인문사회융합대학' },
            { id: 6, name: '힐링바이오공유대학' },
            { id: 7, name: '교양' }
        ];
        let idx = 0;
        async.whilst(function () {
            return bookCategoryInfoList.length > idx;
        }, function (callback) {
            sql = 'INSERT IGNORE INTO ' + dbConstant.TB_BOOK_CATEGORY + ' (book_category_id, category_name) VALUES (?, ?)';
            global.db.query(sql, [bookCategoryInfoList[idx].id, bookCategoryInfoList[idx].name], (err, results, fields) => {
                if (err) {
                    console.log(err);
                }
                else {
                    idx++
                    callback();
                }
            });
        });
    });

    next(true);
}


function createBookStatusTable(next) {

    let sql = 'CREATE TABLE IF NOT EXISTS ' + dbConstant.TB_BOOK_STATUS + '(\
        `id` INT NOT NULL AUTO_INCREMENT,\
        `book_status_id` INT NOT NULL,\
        `book_status_name` VARCHAR(255) NOT NULL,\
        PRIMARY KEY (`id`),\
        UNIQUE KEY `book_status_id` (`book_status_id`))  DEFAULT CHARSET=utf8;;'

    global.db.query(sql, (err, results, fields) => {
        if (err) {
            console.log(err);
        }

        let bookStatusInfoList = [
            { id: 1, name: '최상등급' },
            { id: 2, name: '상등급' },
            { id: 3, name: '중상등급' },
            { id: 4, name: '중등급' },
            { id: 5, name: '중하등급' },
            { id: 6, name: '하등급' }
        ];

        let idx = 0;
        async.whilst(function () {
            return bookStatusInfoList.length > idx;
        }, function (callback) {
            sql = 'INSERT IGNORE INTO ' + dbConstant.TB_BOOK_STATUS + ' (book_status_id, book_status_name) VALUES (?, ?)';
            global.db.query(sql, [bookStatusInfoList[idx].id, bookStatusInfoList[idx].name], (err, results, fields) => {
                if (err) {
                    console.log(err);
                }
                else {
                    idx++
                    callback();
                }
            });
        });

    });

    next(true);
}


function createBookFavoriteTable(next) {

    let sql = 'CREATE TABLE IF NOT EXISTS ' + dbConstant.TB_BOOK_FAVORITE + '(\
        `id` INT NOT NULL AUTO_INCREMENT,\
        `user_id` VARCHAR(45) NULL,\
        `book_id` INT NULL,\
        PRIMARY KEY (`id`),\
        UNIQUE KEY `book_id` (`user_id`,`book_id`))  DEFAULT CHARSET=utf8;;'

    global.db.query(sql, (err, results, fields) => {
        if (err) {
            console.log(err);
        }

        let favoriteBookInfoList = [
            {
                book_id: 1,
                user_id: "test"
            },
            {
                book_id: 2,
                user_id: "test",
            }
        ];

        let idx = 0;
        async.whilst(function () {
            return favoriteBookInfoList.length > idx;
        }, function (callback) {
            sql = 'INSERT IGNORE INTO ' + dbConstant.TB_BOOK_FAVORITE + ' (user_id, book_id) VALUES (?, ?)';
            global.db.query(sql, [favoriteBookInfoList[idx].user_id, favoriteBookInfoList[idx].book_id], (err, results, fields) => {
                if (err) {
                    console.log(err);
                }
                else {
                    idx++
                    callback();
                }
            });
        });
    });

    next(true);
}

function getBookInfoList(next) {
    let bookInfoList = [];

    let sql = 'SELECT \
    book.book_id,\
    book.book_category_id,\
    book.book_name,\
    book.book_status_id,\
    book.book_price,\
    book.picture_address,\
    book.publish_time,\
    book.sell,\
    book.user_id,\
    book.book_content,\
    bStatus.book_status_name,\
    category.category_name,\
    bStatus.book_status_name \
    FROM ' + dbConstant.TB_BOOK + ' AS book \
    JOIN ' + dbConstant.TB_BOOK_CATEGORY + ' AS category \
    JOIN ' + dbConstant.TB_BOOK_STATUS + ' AS bStatus \
    ON book.book_category_id = category.book_category_id \
    and book.book_status_id = bStatus.book_status_id';

    global.db.query(sql, (err, data) => {
        if (err) {
            next(false, err);
        }
        let idx = 0;
        async.whilst(
            function () {
                return idx < data.length;
            },
            function (callback) {

                bookInfoList.push({
                    book_id: data[idx].book_id,
                    book_category: {
                        category_id: data[idx].book_category_id,
                        category_name: data[idx].category_name
                    },
                    book_name: data[idx].book_name,
                    book_content: data[idx].book_content,
                    book_price: data[idx].book_price,
                    user_id: data[idx].user_id,
                    picture_address: data[idx].picture_address,
                    publish_time: data[idx].publish_time,
                    book_status: {
                        book_status_id: data[idx].book_status_id,
                        book_status_name: data[idx].book_status_name
                    },
                    sell: data[idx].sell
                });

                idx++;
                callback();
            },
            function (err) {
                if (err) {
                    next(false, err);
                }
            }
        )
        next(true, bookInfoList)
    });
}

function getUserBookInfoList(userID, next) {
    
    let bookInfoList = [];

    let sql = 'SELECT \
    book.book_id,\
    book.book_category_id,\
    book.book_name,\
    book.book_status_id,\
    book.book_price,\
    book.picture_address,\
    book.publish_time,\
    book.sell,\
    book.user_id,\
    book.book_content,\
    bStatus.book_status_name,\
    category.category_name,\
    bStatus.book_status_name \
    FROM ' + dbConstant.TB_BOOK + ' AS book \
    JOIN ' + dbConstant.TB_BOOK_CATEGORY + ' AS category \
    JOIN ' + dbConstant.TB_BOOK_STATUS + ' AS bStatus \
    ON book.book_category_id = category.book_category_id \
    AND book.book_status_id = bStatus.book_status_id \
    WHERE book.user_id = ?';

    global.db.query(sql,[bookInfo.user_id], (err, data) => {
        if (err) {
            next(false, err);
        }
        let idx = 0;
        async.whilst(
            function () {
                return idx < data.length;
            },
            function (callback) {

                bookInfoList.push({
                    book_id: data[idx].book_id,
                    book_category: {
                        category_id: data[idx].book_category_id,
                        category_name: data[idx].category_name
                    },
                    book_name: data[idx].book_name,
                    book_content: data[idx].book_content,
                    book_price: data[idx].book_price,
                    user_id: data[idx].user_id,
                    picture_address: data[idx].picture_address,
                    publish_time: data[idx].publish_time,
                    book_status: {
                        book_status_id: data[idx].book_status_id,
                        book_status_name: data[idx].book_status_name
                    },
                    sell: data[idx].sell
                });

                idx++;
                callback();
            },
            function (err) {
                if (err) {
                    next(false, err);
                }
            }
        )
        next(true, bookInfoList)
    });
}

function getBookInfo(bookInfo, next) {
    let sql = 'SELECT \
    book.book_id,\
    book.book_category_id,\
    book.book_name,\
    book.book_status_id,\
    book.book_price,\
    book.picture_address,\
    book.publish_time,\
    book.sell,\
    book.user_id,\
    book.book_content,\
    bStatus.book_status_name,\
    category.category_name,\
    bStatus.book_status_name \
    FROM ' + dbConstant.TB_BOOK + ' AS book \
    JOIN ' + dbConstant.TB_BOOK_CATEGORY + ' AS category \
    JOIN ' + dbConstant.TB_BOOK_STATUS + ' AS bStatus \
    ON book.book_category_id = category.book_category_id \
    AND book.book_status_id = bStatus.book_status_id \
    WHERE book.book_id = ?';

    global.db.query(sql, [bookInfo.id], (err, data) => {
        if (err) {
            next(false, err);
        }

        if (data.length == 0) {
            return next(false, "그런 책은 없는걸");
        }

        let result = {
            book_id: data[0].book_id,
            book_category: {
                category_id: data[0].book_category_id,
                category_name: data[0].category_name
            },
            book_name: data[0].book_name,
            book_content: data[0].book_content,
            book_price: data[0].book_price,
            user_id: data[0].user_id,
            picture_address: data[0].picture_address,
            publish_time: data[0].publish_time,
            book_status: {
                book_status_id: data[0].book_status_id,
                book_status_name: data[0].book_status_name
            },
            sell: data[0].sell
        };

        next(true, null, result)

    });

}

function getBookCategoryInfoList(next) {
    let bookCategoryInfoList = [];

    let sql = 'SELECT * FROM ' + dbConstant.TB_BOOK_CATEGORY;

    global.db.query(sql, (err, data) => {
        if (err) {
            next(false, err);
        }
        let idx = 0;
        async.whilst(
            function () {
                return idx < data.length;
            },
            function (callback) {
                bookCategoryInfoList.push({
                    id: data[idx].book_category_id,
                    name: data[idx].category_name
                });
                idx++;
                callback();
            },
            function (err) {
                if (err) {
                    next(false, err);
                }
            }
        )
        next(true, bookCategoryInfoList)
    });
}

function addBook(req, res, next) {

    bookImageUpload(req, res, function (err) {
        if (err) {
            return next(false, err);
        }

        var picAddrArray = req.files[0].path.split('\\');
        let picAddr = "";
        for (let i = 1; i < picAddrArray.length; i++) {
            picAddr += ("/" + picAddrArray[i]);
        }

        bookInfo = {};
        bookInfo.book_name = req.body.book_name;
        bookInfo.book_price = req.body.book_price;
        bookInfo.book_content = req.body.book_content;
        bookInfo.publish_time = req.body.publish_time;
        bookInfo.book_status_id = req.body.book_status_id;
        bookInfo.picture_address = picAddr;
        bookInfo.sell = 1
        bookInfo.user_id = req.session.userInfo.mUserID;
        bookInfo.book_category_id = req.body.book_category_id;

        let sql = 'INSERT IGNORE INTO ' + dbConstant.TB_BOOK + ' (\
            book_category_id,\
            book_name,\
            book_content,\
            book_price,\
            book_status_id,\
            user_id,\
            picture_address,\
            publish_time,\
            sell) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

        global.db.query(sql,
            [bookInfo.book_category_id,
            bookInfo.book_name,
            bookInfo.book_content,
            bookInfo.book_price,
            bookInfo.book_status_id,
            bookInfo.user_id,
            bookInfo.picture_address,
            bookInfo.publish_time,
            bookInfo.sell],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                }

                jimp.read(req.files[0].path, function (err, img) {
                    if (err) {
                        return next(false, err);
                    }

                    img.resize(270, 320)
                        .write(req.files[0].path);
                    next(true, '책 등록 완료')
                });
            });
    });
}

function editBook(bookInfo, next) {

    let sql = 'UPDATE ' + dbConstant.TB_BOOK + ' SET \
        book_category_id = ?, \
        book_name = ?, \
        book_content = ?, \
        book_price = ?, \
        book_status_id = ?, \
        publish_time = ?, \
        sell = ? \
        WHERE book_id = ?';

    global.db.query(sql,
        [bookInfo.category_id,
        bookInfo.book_name,
        bookInfo.book_content,
        bookInfo.book_price,
        bookInfo.book_status_id,
        bookInfo.publish_time,
        bookInfo.sell,
        bookInfo.book_id],
        (err, results, fields) => {
            if (err) {
                console.log(err);
            }
            next(true, '책 수정 완료')
        });
}

function editBookIncludeImage(req, res, next) {

    bookImageUpload(req, res, function (err) {
        if (err) {
            return next(false, err);
        }

        var picAddrArray = req.files[0].path.split('\\');
        let picAddr = "";
        for (let i = 1; i < picAddrArray.length; i++) {
            picAddr += ("/" + picAddrArray[i]);
        }

        bookInfo = {};
        bookInfo.book_name = req.body.book_name;
        bookInfo.book_price = req.body.book_price;
        bookInfo.book_content = req.body.book_content;
        bookInfo.publish_time = req.body.publish_time;
        bookInfo.book_status_id = req.body.book_status_id;
        bookInfo.picture_address = picAddr;
        bookInfo.sell = 1;
        bookInfo.user_id = req.session.userInfo.mUserID;
        bookInfo.book_category_id = req.body.book_category_id;
        bookInfo.book_id = req.body.book_id;

        let sql = 'UPDATE ' + dbConstant.TB_BOOK + ' SET \
        book_category_id = ?, \
        book_name = ?, \
        book_content = ?, \
        book_price = ?, \
        book_status_id = ?, \
        picture_address = ?, \
        publish_time = ?, \
        sell = ? \
        WHERE book_id = ?';

        global.db.query(sql,
            [bookInfo.book_category_id,
            bookInfo.book_name,
            bookInfo.book_content,
            bookInfo.book_price,
            bookInfo.book_status_id,
            bookInfo.picture_address,
            bookInfo.publish_time,
            bookInfo.sell,
            bookInfo.book_id],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                }

                jimp.read(req.files[0].path, function (err, img) {
                    if (err) {
                        return next(false, err);
                    }

                    img.resize(270, 320)
                        .write(req.files[0].path);
                    next(true, '책 수정 완료')
                });
            });
    });
}

function deleteBook(bookInfo, next) {
    let sql = 'DELETE FROM ' + dbConstant.TB_BOOK + ' WHERE book_id = ?';
    global.db.query(sql, [bookInfo.book_id], (err, results, fields) => {
        if (err) {
            return next(false, err.code);
        }

        if (results.affectedRows === 0) {
            return next(false, '이미 삭제된 책입니다.');
        }

        next(true, '책 삭제 완료');
    });
}

function insertFavoriteBookInfo(bookInfo, next) {

    let sql = 'SELECT * FROM ' + dbConstant.TB_BOOK_FAVORITE + ' WHERE user_id=? AND book_id=? ';
    global.db.query(sql, [bookInfo.user_id, bookInfo.book_id], function (err, results, fields) {
        if (err) {
            return next(false, err.code);
        }

        if (results.length === 1) {
            return next(false, '이미 찜했어요~~');
        }

        let sql = 'INSERT IGNORE INTO ' + dbConstant.TB_BOOK_FAVORITE + ' (user_id, book_id) VALUES (?, ?)';
        global.db.query(sql, [bookInfo.user_id, bookInfo.book_id], (err, results, fields) => {
            if (err) {
                next(true, err.code);
            }
            next(true, '찜 완료');
        });

    });
}

function deleteFavoriteBookInfo(bookInfo, next) {
    let sql = 'DELETE FROM ' + dbConstant.TB_BOOK_FAVORITE + ' WHERE user_id=? AND book_id=? ';
    global.db.query(sql, [bookInfo.user_id, bookInfo.book_id], (err, results, fields) => {
        if (err) {
            return next(true, err.code);
        }

        if (results.affectedRows === 0) {
            return next(false, '이미 삭제된 책입니다.');
        }

        next(true, '찜 삭제 완료');
    });
}

function getUserFavoriteBookInfoList(userInfo, next) {
    let bookFavoriteList = [];
    let sql = 'SELECT \
    bookFavorite.id, \
    book.book_id, \
    book.book_category_id, \
    book.book_name, \
    book.book_status_id, \
    book.book_price, \
    book.picture_address, \
    book.publish_time, \
    book.sell, \
    book.book_content, \
    bookFavorite.user_id, \
    bStatus.book_status_name,\
    category.category_name \
    FROM ' + dbConstant.TB_BOOK_FAVORITE + ' AS bookFavorite \
    JOIN ' + dbConstant.TB_BOOK + ' AS book \
    JOIN ' + dbConstant.TB_BOOK_CATEGORY + ' AS category \
    JOIN ' + dbConstant.TB_BOOK_STATUS + ' AS bStatus \
    ON bookFavorite.book_id = book.book_id\
    AND book.book_category_id = category.book_category_id\
    AND book.book_status_id = bStatus.book_status_id\
    WHERE bookFavorite.user_id = ?';

    global.db.query(sql, [userInfo.mUserID], (err, data) => {
        if (err) {
            next(false, err);
        }

        let idx = 0;
        async.whilst(
            function () {
                return idx < data.length;
            },
            function (callback) {
                bookFavoriteList.push({
                    id: data[idx].id,
                    book_id: data[idx].book_id,
                    book_category: {
                        category_id: data[idx].book_category_id,
                        category_name: data[idx].category_name
                    },
                    book_name: data[idx].book_name,
                    book_content: data[idx].book_content,
                    book_price: data[idx].book_price,
                    user_id: data[idx].user_id,
                    picture_address: data[idx].picture_address,
                    publish_time: data[idx].publish_time,
                    book_status: {
                        book_status_id: data[idx].book_status_id,
                        book_status_name: data[idx].book_status_name
                    },
                    sell: data[idx].sell
                });
                idx++;
                callback();
            },
            function (err) {
                if (err) {
                    next(false, err);
                }
            }
        )
        next(true, bookFavoriteList)
    });
}


function searchAllBook(bookInfo, next){
    let bookInfoList = [];
    let sql = 'SELECT \
    book.book_id,\
    book.book_category_id,\
    book.book_name,\
    book.book_status_id,\
    book.book_price,\
    book.picture_address,\
    book.publish_time,\
    book.sell,\
    book.user_id,\
    book.book_content,\
    bStatus.book_status_name,\
    category.category_name,\
    bStatus.book_status_name \
    FROM ' + dbConstant.TB_BOOK + ' AS book \
    JOIN ' + dbConstant.TB_BOOK_CATEGORY + ' AS category \
    JOIN ' + dbConstant.TB_BOOK_STATUS + ' AS bStatus \
    ON book.book_category_id = category.book_category_id \
    AND book.book_status_id = bStatus.book_status_id \
    WHERE ' + ("book.book_name LIKE '%" + bookInfo.book_name + "%'");
    
    global.db.query(sql, (err, data) => {
        if (err) {
            next(false, err);
        }
        let idx = 0;
        async.whilst(
            function () {
                return idx < data.length;
            },
            function (callback) {

                bookInfoList.push({
                    book_id: data[idx].book_id,
                    book_category: {
                        category_id: data[idx].book_category_id,
                        category_name: data[idx].category_name
                    },
                    book_name: data[idx].book_name,
                    book_content: data[idx].book_content,
                    book_price: data[idx].book_price,
                    user_id: data[idx].user_id,
                    picture_address: data[idx].picture_address,
                    publish_time: data[idx].publish_time,
                    book_status: {
                        book_status_id: data[idx].book_status_id,
                        book_status_name: data[idx].book_status_name
                    },
                    sell: data[idx].sell
                });

                idx++;
                callback();
            },
            function (err) {
                if (err) {
                    next(false, err);
                }
            }
        )
        next(true, bookInfoList)
    });
}


const bookImageUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, 'public\\img\\product');
        },
        filename: function (req, file, callback) {

            let recvData = JSON.parse(JSON.stringify(req.body));
            let originalname = file.originalname.split('.');
            let fileName = originalname[0]+"_"+req._startTime.getFullYear()+(req._startTime.getMonth()+1)+req._startTime.getDate()+req._startTime.getHours()+req._startTime.getMinutes()+req._startTime.getSeconds()+".jpg";

            callback(null, fileName);
        }
    })
}).any();