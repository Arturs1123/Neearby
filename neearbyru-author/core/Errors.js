const {response} = require("express");

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
    static STATUS_TEXT = 'Product not found';
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

class UserIsBanned extends BadRequestError {
    static STATUS_TEXT = 'User is banned';
    static CODE = 'USER_IS_BANNED';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = null, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, UserIsBanned.CODE, UserIsBanned.STATUS_TEXT);
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

class TargetNotFound extends BadRequestError {
    static STATUS_TEXT = 'Product not found';
    static CODE = 'PRODUCT_NOT_FOUND';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = TargetNotFound.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, TargetNotFound.CODE, TargetNotFound.STATUS_TEXT);
    }
}

class TargetBanned extends BadRequestError {
    static STATUS_TEXT = 'Target is banned';
    static CODE = 'TARGET_IS_BANNED';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = TargetBanned.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, TargetBanned.CODE, TargetBanned.STATUS_TEXT);
    }
}

class NotAuthorThisTarget extends BadRequestError {
    static STATUS_TEXT = 'You not author this target';
    static CODE = "YOU_NOT_AUTHOR_THIS_TARGET";

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = NotAuthorThisTarget.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, NotAuthorThisTarget.CODE, NotAuthorThisTarget.STATUS_TEXT);
    }
}

class SubscriptionNotFound extends BadRequestError {
    static STATUS_TEXT = 'Subscription not found';
    static CODE = 'SUBSCRIPTION_NOT_FOUND';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = null, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, SubscriptionNotFound.CODE, SubscriptionNotFound.STATUS_TEXT);
    }
}

class SubscribedUserNotFound extends BadRequestError {
    static STATUS_TEXT = 'Subscribed user not found';
    static CODE = 'SUBSCRIBED_USER_NOT_FOUND';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = null, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, SubscribedUserNotFound.CODE, SubscribedUserNotFound.STATUS_TEXT);
    }
}

class InsufficientPermission extends BadRequestError {
    static STATUS_TEXT = 'Insufficient permissions';
    static CODE = 'INSUFFICIENT_PERMISSIONS';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = null, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, InsufficientPermission.CODE, InsufficientPermission.STATUS_TEXT);
    }
}

class RedirectNotFound extends BadRequestError {
    static STATUS_TEXT = 'Redirect not found';
    static CODE = 'REDIRECT_NOT_FOUND';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = RedirectNotFound.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, RedirectNotFound.CODE, RedirectNotFound.STATUS_TEXT);
    }
}

class RedirectAlreadyDelete extends BadRequestError {
    static STATUS_TEXT = 'Redirect already delete';
    static CODE = 'REDIRECT_ALREADY_DELETE';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = RedirectAlreadyDelete.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, RedirectAlreadyDelete.CODE, RedirectAlreadyDelete.STATUS_TEXT);
    }
}

class RedirectNotAuthor extends BadRequestError {
    static STATUS_TEXT = 'You are not the author of the redirect';
    static CODE = 'YOU_NOT_THE_AUTHOR_OF_THE_REDIRECT';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = RedirectNotAuthor.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, RedirectNotAuthor.CODE, RedirectNotAuthor.STATUS_TEXT);
    }
}

class NotAuthorThisReferralTarget extends BadRequestError {
    static STATUS_TEXT = 'You not author this referral target';
    static CODE = 'YOU_NOT_AUTHOR_THIS_REFERRAL_TARGET';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = NotAuthorThisReferralTarget.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, NotAuthorThisReferralTarget.CODE, NotAuthorThisReferralTarget.STATUS_TEXT);
    }
}

class ReferralTargetNotActive extends BadRequestError {
    static STATUS_TEXT = 'Referral target not active';
    static CODE = 'REFERRAL_TARGET_NOT_ACTIVE';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = ReferralTargetNotActive.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, ReferralTargetNotActive.CODE, ReferralTargetNotActive.STATUS_TEXT);
    }
}

class ReferralTargetExists extends BadRequestError {
    static STATUS_TEXT = 'Referral target already exists';
    static CODE = 'REFERRAL_TARGET_ALREADY_EXISTS';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = ReferralTargetExists.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, ReferralTargetExists.CODE, ReferralTargetExists.STATUS_TEXT);
    }
}

class ReferralTargetNotFound extends BadRequestError {
    static STATUS_TEXT = 'Referral target not found';
    static CODE = 'REFERRAL_TARGET_NOT_FOUND';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = ReferralTargetNotFound.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, ReferralTargetNotFound.CODE, ReferralTargetNotFound.STATUS_TEXT);
    }
}

class AuthorThisReferralTarget extends BadRequestError {
    static STATUS_TEXT = 'You are the author of this referral target';
    static CODE = 'YOU_ARE_THE_AUTHOR_OF_THIS_REFERRAL_TARGET';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = AuthorThisReferralTarget.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, AuthorThisReferralTarget.CODE, AuthorThisReferralTarget.STATUS_TEXT);
    }
}

class UserCardNotFound extends BadRequestError {
    static STATUS_TEXT = 'The user did not enter his card';
    static CODE = 'THE_USER_DID_NOT_ENTER_HIS_CARD';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = UserCardNotFound.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, UserCardNotFound.CODE, UserCardNotFound.STATUS_TEXT);
    }
}

class CanNotAddComments extends BadRequestError {
    static STATUS_TEXT = 'Can not add comments';
    static CODE = 'CAN_NOT_ADD_COMMENTS';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = CanNotAddComments.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, CanNotAddComments.CODE, CanNotAddComments.STATUS_TEXT);
    }
}

module.exports = {
    BadRequestError, ServiceError, ValidationError,
    InvalidCredentials, InvalidSession, SessionExpired,
    UnAuthorized, AccountIsNotVerified, UserNotFound,
    UserIsBanned, RecoveryTokenNotFound, TargetNotFound,
    SubscriptionNotFound, SubscribedUserNotFound, InsufficientPermission,
    RedirectNotFound, RedirectNotAuthor, RedirectAlreadyDelete,
    TargetBanned, NotAuthorThisTarget, ReferralTargetNotActive,
    NotAuthorThisReferralTarget, ReferralTargetExists, ReferralTargetNotFound,
    AuthorThisReferralTarget, UserCardNotFound, CanNotAddComments
}