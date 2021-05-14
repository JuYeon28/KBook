'use strict';

/*
[response]
send {
    status: 200,
    data: {
        r : Boolean,
        m : String,
        d : Object
    }
}
*/

class HttpUtil {
    constructor(req, res) {
        this.req = req;
        this.res = res;

        this.HTTP_STATUS_OK = 200;
    }

    /**
     * @param {Boolean} result (Status Result - defalt true)
     * @param {String} message (Client Message - defalt null)
     * @param {Object} data (Data - default null)
     */
    send(result = true,
        message = null,
        data = null) {

        let info = {
            r: result,
            m: message,
            d: data
        }

        this.res.status(this.HTTP_STATUS_OK).send(info);
    }
}

module.exports = HttpUtil;