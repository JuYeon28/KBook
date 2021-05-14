class LogInInfo {
    constructor() {
        this.mUserID = '';
        this.mPassWord = '';
    }

    toJSON() {
        return {
            mUserID: this.mUserID,
            mPassWord: this.mPassWord
        };
    }

    toObject(json) {
        this.mUserID = json.mUserID;
        this.mPassWord = json.mPassWord;
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {    
    module.exports.LogInInfo = LogInInfo;   
}
else {
    this.LogInInfo = new LogInInfo();
}