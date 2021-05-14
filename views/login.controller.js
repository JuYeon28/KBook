angular
    .module('loginApp', ['ngCookies'])
    .controller('LogInController', ['$scope', '$http', '$cookies', LogInController]);

function LogInController($scope, $http, $cookies) {

    var loginVM = this;

    loginVM.mUserID = '';
    loginVM.mPassWord = '';

    loginVM.mRegisterUserID = '';
    loginVM.mRegisterPassWord = '';
    loginVM.mRegisterRePassWord = '';
    loginVM.mRegisterEmail = '';
    loginVM.mRegisterPhone = '';
    loginVM.mRegisterDepartment = '';

    loginVM.onClickLogIn = () => {

        if (loginVM.mUserID.length == 0) {
            return alert('사용자 ID를 입력해주세요.');
        }

        if (loginVM.mPassWord.length == 0) {
            return alert('비밀번호를 입력해주세요.');
        }

        $http.post('/httpAPI/userLogIn', {
            mUserID: loginVM.mUserID,
            mPassWord: loginVM.mPassWord
        })
            .success(function (data, status, headers, config) {
                if (data.r === true) {

                    nextTargetUrl = data.d;
                    location.replace(nextTargetUrl);

                } else {
                    alert(data.m);
                }
            })
            .error(function (data, status, header, config) {
                alert(data.message);
            });
    }

    loginVM.onClickRegister = () => {

        if (loginVM.mRegisterUserID.length == 0) {
            return alert('사용자 ID를 입력해주세요.');
        }

        if (loginVM.mRegisterPassWord.length == 0) {
            return alert('비밀번호를 입력해주세요.');
        }

        if (loginVM.mRegisterPassWord !== loginVM.mRegisterRePassWord) {
            return alert('비밀번호가 일치하지 않습니다.');
        }

        if (loginVM.mRegisterEmail.length == 0) {
            return alert('E-Mail 입력해주세요.');
        }

        if (loginVM.mRegisterPhone.length == 0) {
            return alert('연락처를 입력해주세요.');
        }

        if (loginVM.mRegisterDepartment.length == 0) {
            return alert('단과대학을 입력해주세요.');
        }

        $http.post('/httpAPI/addUserInfo', {
            mUserID: loginVM.mRegisterUserID,
            mPassWord: loginVM.mRegisterPassWord,
            mEmail: loginVM.mRegisterEmail,
            mPhone: loginVM.mRegisterPhone,
            mDepartment: loginVM.mRegisterDepartment
        })
            .success(function (data, status, headers, config) {
                alert(data.m);
                
                loginVM.mRegisterUserID = '';
                loginVM.mRegisterPassWord = '';
                loginVM.mRegisterRePassWord = '';
                loginVM.mRegisterEmail = '';
                loginVM.mRegisterPhone = '';
                loginVM.mRegisterDepartment = '';
            })
            .error(function (data, status, header, config) {
                alert(data.m);
            });
    }
}

// Initialize
angular.element(document).ready(function () {

});