# <font color="green"> <b> First </b> </font>

## 개발환경

* Web
  * angularJS framework
* Server
  * NodeJS
* Cache Server
  * Redis
* DB
  * MySQL
  
## 개발환경 세팅

* NodeJS 설치(64bit)
  * version = v6.10.0 : [다운](https://nodejs.org/download/release/v6.10.0/node-v6.10.0-x64.msi)
  
* MySQL 설치(community)
  * version = v5.7.26.0 : [다운](https://dev.mysql.com/downloads/file/?id=485751)
	* 로그인 필요 없음 => No thanks, just start my download
	
* Redis-Server 무설치(portable)
  * version = v3.2.100 : [다운](https://github.com/microsoftarchive/redis/releases/download/win-3.2.100/Redis-x64-3.2.100.zip)
  	* 압축 풀기 -> redis-server.exe 실행
  
## 구동방법

/project/first/

[수동]
1. DB Table 생성
	* mySql Database 생성 sql = [create database first;]
	
2. Redis-Server 실행
	* /project/first/Redis-Server/Redis-x64-3.2.100/redis-server.exe
	
3. Node Module 설치
	* npm install
	
4. Node 실행
	* set NODE_ENV=production&&node app.js

[자동]
1. Start-Service.bat 실행

## 기능요구사항


```
1. 로그인 페이지
	1.1 회원가입 기능(학번(아이디), 비밀번호, 연락처, 단과대학, 이메일)
	1.2 로그인 기능(학번(아이디), 비밀번호)
	1.3 회원정보 수정(연락처, 단과대학, 이메일)
	
2. 메인 페이지 (대쉬보드)
	2.1 검색 기능(책 이름 검색)
	2.2 카테고리 선택 기능(전체, 디자인대학, 과학기술대학, 의료생명대학, 인문사회융합대학, 힐링바이오공유대학, 교양)
	2.3 상품 선택(상세보기) 기능
	2.4 판매하기
	2.5 개인정보
	2.6 로그아웃
	
3. 상품 상세 페이지
	3.1 판매자 정보 확인 기능
	3.2 상품 정보 확인 기능(카테고리, 제목, 상세설명, 금액, 사진, 책명, 책의 상태)
	3.3 찜하기 기능
	3.4 채팅 기능
	
4. 판매자 페이지(개인페이지)
	4.1 개인정보 확인 기능
	4.2 판매중인 물품
	4.3 판매내역(사용자가 상태 변경(판매완료))
	4.4 판매등록 기능(카테고리, 제목, 상세설명, 금액, 사진, 책명, 책의 상태)
	4.5 삭제, 수정 기능
	4.6 채팅 목록 확인, 채팅 삭제 기능
	
```


## Server Directory구조

/project/first/

	.
	├── config                  
	│   └── systemConfig.js     // 환경설정 파일
	│
	├── installer               // 설치파일
	│
	├── logs                    // log 파일
	│
	├── public                  // 정적파일
	│   ├── ...
	│    ...
	│
	├── routes                  // 라우팅 처리
	│   ├── api                 // API 라우팅
	│   │   └── httpAPI.js      // web
	│   │   
	│   ├── page                // Page 라우팅
	│   │   └── httpAPI.js      // web
	│   │   
	│   └── route.js            // API, Page 라우팅 등록
	│
	├── services                // 서비스
	│   └── webService.js       // http 모듈 초기화
	│
	├── utility                 // 유틸
	│   └── dbManager           // DB API
	│   
	│
	├── views                   // 템플릿 엔진 관련 뷰 폴더
	│   │
	│   ├── pc                  // PC (view(ejs), controller(js))
	│   │   
	│   ├── index.ejs           // index.ejs view
	│   └── index.js            // index.js controller
	│
	├── app.js                  // 프로젝트 초기화(service, manager)
	│
	└── package.json            // npm 모듈 정의



## DB Table 구조
[확정]* user Table(user_tb)

| id | user_id(PK) | password | email | phone | department | authorize |
|:--:|:-----------:|:---:|:-----:|:-----:|:----------:|:---------:|
|int|varchar|varchar|varchar|varchar|varchar|int|
|1|test|test|test@test.com|01098765432|컴퓨터공학|1|

[확정]* book_categoty Table(book_categoty_tb)

| id | book_category_id(PK) | category_name |
|:--:|:--------------------:|:-------------:|
|int|int|varchar|
|1|1|전체 카테고리|
|2|2|디자인대학|
|3|3|과학기술대학|
|4|4|의료생명대학|
|5|5|인문사회융합대학|
|6|6|힐링바이오공유대학|
|7|7|교양|

[확정]* book Table(book_tb)

| book_id(PK) | category_id | name | content | price | user_id | picture_address | publish_time | status_id | sell |
|:-----------:|:-----------:|:----:|:-------:|:-----:|:-------:|:---------------:|:------------:|:---------:|:----:|
|int|int|varchar|varchar|int|varchar|datetime|int|int|int|


[확정]* book_status Table(book_status_tb)

| id | book_status_id(PK) | book_status_name |
|:--:|:------------------:|:----------------:|
|int|int|varchar|
|1|1|최상등급|
|2|2|상등급|
|3|3|중상등급|
|4|4|중등급|
|5|5|중하등급|
|6|6|하등급|

[확정]* book_favorite Table(book_favorite_tb)

| id(PK)| book_id | user_id |
|:--:|:-------:|:-------:|
|int|int|int|
