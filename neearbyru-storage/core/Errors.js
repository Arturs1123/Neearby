class ServiceError extends Error {
    /**
     * @param {number} _status
     * @param {string} _code
     * @param {?string} _message
     * @param {?Object} _data
     _*/
    constructor(_status, _code, _message, _data = null) {
        super();
        this.status = _status;
        this.code = _code;
        this.message = _message;
        this.data = _data;
    }

    toResponse() {
        const returnData = {
            result: false,
            error: {
                code: this.code,
                message: this.message
            }
        };

        if(this.data){
            returnData.error.data = this.data;
        }

        return returnData;
    }

    toJSON() {
        const response = this.toResponse();

        return JSON.stringify(response);
    }
}

class BadRequestError extends ServiceError {
    static STATUS = 400;
    static STATUS_TEXT = 'Bad Request';
    static CODE = 'BAD_REQUEST';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = null, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(BadRequestError.STATUS, _code, _message, _data);
    }
}

class UnAuthorized extends ServiceError {
    static STATUS = 401;
    static STATUS_TEXT = 'Unauthorized';
    static CODE = 'UNAUTHORIZED';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = null, _code = UnAuthorized.CODE, _message = UnAuthorized.STATUS_TEXT) {
        super(UnAuthorized.STATUS, _code, _message, _data);
    }
}


class ValidationError extends BadRequestError {
    static STATUS_TEXT = 'Validation error';
    static CODE = 'VALIDATION_ERROR';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = null, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, ValidationError.CODE, ValidationError.STATUS_TEXT);
    }
}

class InvalidCredentials extends BadRequestError {
    static STATUS_TEXT = 'Invalid credentials';
    static CODE = 'INVALID_CREDENTIALS';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = null, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, InvalidCredentials.CODE, InvalidCredentials.STATUS_TEXT);
    }
}

class InvalidSession extends UnAuthorized {
    static STATUS_TEXT = 'Session was deleted on not created';
    static CODE = 'INVALID_SESSION';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = null, _code = UnAuthorized.CODE, _message = UnAuthorized.STATUS_TEXT) {
        super(_data, InvalidSession.CODE, InvalidSession.STATUS_TEXT);
    }
}

class SessionExpired extends UnAuthorized {
    static STATUS_TEXT = 'Session time expired';
    static CODE = 'INVALID_SESSION';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = null, _code = UnAuthorized.CODE, _message = UnAuthorized.STATUS_TEXT) {
        super(_data, SessionExpired.CODE, SessionExpired.STATUS_TEXT);
    }
}

class AccountIsNotVerified extends UnAuthorized {
    static STATUS_TEXT = 'Account is not verified';
    static CODE = 'ACCOUNT_DISABLED';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = null, _code = UnAuthorized.CODE, _message = UnAuthorized.STATUS_TEXT) {
        super(_data, AccountIsNotVerified.CODE, AccountIsNotVerified.STATUS_TEXT);
    }
}

class UserNotFound extends BadRequestError {
    static STATUS_TEXT = 'FileStorage not found';
    static CODE = 'USER_NOT_FOUND';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = null, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, UserNotFound.CODE, UserNotFound.STATUS_TEXT);
    }
}

class RecoveryTokenNotFound extends BadRequestError {
    static STATUS_TEXT = 'Password recovery token not found';
    static CODE = 'TOKEN_NOT_FOUND';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = null, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, RecoveryTokenNotFound.CODE, RecoveryTokenNotFound.STATUS_TEXT);
    }
}

module.exports = {
    BadRequestError, ServiceError, ValidationError,
    InvalidCredentials, InvalidSession, SessionExpired,
    UnAuthorized, AccountIsNotVerified, UserNotFound,
    RecoveryTokenNotFound
}