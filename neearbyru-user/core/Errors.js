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

class SubdomainAlreadyTaken extends BadRequestError {

    static STATUS_TEXT = 'Subdomain already taken';
    static CODE = 'SUBDOMAIN_ALREADY_TAKEN';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = null, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(SubdomainAlreadyTaken.STATUS, SubdomainAlreadyTaken.CODE, _message, _data);
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
    static STATUS_TEXT = 'User not found';
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

class UserNoRights extends BadRequestError {
    static STATUS_TEXT = 'User not enough right';
    static CODE = 'USER_NOT_ENOUGH_RIGHT';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = UserNoRights.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, UserNoRights.CODE, UserNoRights.STATUS_TEXT);
    }
}

class UserDeleted extends BadRequestError {
    static STATUS_TEXT = 'User deleted';
    static CODE = 'USER_DELETED';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = UserDeleted.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, UserDeleted.CODE, UserDeleted.STATUS_TEXT);
    }
}

class UserIsBanned extends BadRequestError {
    static STATUS_TEXT = 'User banned';
    static CODE = 'USER_BANNED';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = UserIsBanned.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
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

class InsufficientRole extends UnAuthorized {
    constructor(data = 'User role is insufficient to use this method') {
        super(data);
    }
}

class NotChatAuthor extends BadRequestError {
    static STATUS_TEXT = 'User not author chat';
    static CODE = 'USER_NOT_AUTHOR_CHAT';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = null, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, NotChatAuthor.CODE, NotChatAuthor.STATUS_TEXT);
    }
}

class NotMessageAuthor extends BadRequestError {
    static STATUS_TEXT = 'User not author message';
    static CODE = 'USER_NOT_AUTHOR_MESSAGE';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = NotMessageAuthor.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, NotMessageAuthor.CODE, NotMessageAuthor.STATUS_TEXT);
    }
}

class ChatNotFound extends BadRequestError {
    static STATUS_TEXT = 'Chat not found';
    static CODE = 'CHAT_NOT_FOUND';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = ChatNotFound.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, ChatNotFound.CODE, ChatNotFound.STATUS_TEXT);
    }
}

class MessageNotFound extends BadRequestError {
    static STATUS_TEXT = 'Message in chat not found';
    static CODE = 'MESSAGE_IN_CHAT_NOT_FOUND';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = MessageNotFound.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, MessageNotFound.CODE, MessageNotFound.STATUS_TEXT);
    }
}

class UserInChat extends BadRequestError {
    static STATUS_TEXT = 'The user is already in the chat';
    static CODE = 'THE_USER_IS_ALREADY_IN_THE_CHAT';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = null, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, UserInChat.CODE, UserInChat.STATUS_TEXT);
    }
}

class UserNotIsChat extends BadRequestError {
    static STATUS_TEXT = 'User not in chat';
    static CODE = 'USER_NOT_IS_CHAT';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = UserNotIsChat.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, UserNotIsChat.CODE, UserNotIsChat.STATUS_TEXT);
    }
}

class MessageDeleted extends BadRequestError {
    static STATUS_TEXT = 'This message has been deleted';
    static CODE = 'THIS_MESSAGE_HAS_BEEN_DELETED';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = MessageDeleted.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, MessageDeleted.CODE, MessageDeleted.STATUS_TEXT);
    }
}

class ProductNotFound extends BadRequestError {
    static STATUS_TEXT = 'Product not found';
    static CODE = 'PRODUCT_NOT_FOUND';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = ProductNotFound.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, ProductNotFound.CODE, ProductNotFound.STATUS_TEXT);
    }
}

class AdsNotFound extends BadRequestError {
    static STATUS_TEXT = 'Ads not found';
    static CODE = "ADS_NOT_FOUND";

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = AdsNotFound.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, AdsNotFound.CODE, AdsNotFound.STATUS_TEXT);
    }
}

class AdsDelete extends BadRequestError {
    static STATUS_TEXT = 'Ads already deleted';
    static CODE = "ADS_ALREADY_DELETED";

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = AdsDelete.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, AdsDelete.CODE, AdsDelete.STATUS_TEXT);
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

class AdsNotPaid extends BadRequestError {
    static STATUS_TEXT = 'Ads not paid';
    static CODE = "ADS_NOT_PAID";

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = AdsNotPaid.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, AdsNotPaid.CODE, AdsNotPaid.STATUS_TEXT);
    }
}

class AdsAlreadyPublished extends BadRequestError {
    static STATUS_TEXT = 'Ads already published';
    static CODE = "ADS_ALREADY_PUBLISHED";

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = AdsAlreadyPublished.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, AdsAlreadyPublished.CODE, AdsAlreadyPublished.STATUS_TEXT);
    }
}

class AdsNoMethodPaying extends BadRequestError {
    static STATUS_TEXT = 'Ads no payment method selected';
    static CODE = "ADS_NO_PAYMENT_METHOD_SELECTED";

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = AdsNoMethodPaying.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, AdsNoMethodPaying.CODE, AdsNoMethodPaying.STATUS_TEXT);
    }
}

class UserAlreadyFollowing extends BadRequestError {
    static STATUS_TEXT = 'You are already following this author';
    static CODE = 'YOU_ARE_ALREADY_FOLLOWING_THIS_AUTHOR';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = UserAlreadyFollowing.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, UserAlreadyFollowing.CODE, UserAlreadyFollowing.STATUS_TEXT);
    }
}

class UserNotFollowing extends BadRequestError {
    static STATUS_TEXT = 'You are already following this author';
    static CODE = 'YOU_ARE_ALREADY_FOLLOWING_THIS_AUTHOR';

    /**
     * @param {?Object} _data
     */
    constructor(_data = UserNotFollowing.STATUS_TEXT) {
        super(_data, UserNotFollowing.CODE, UserNotFollowing.STATUS_TEXT);
    }
}

class CannotFollowYourself extends BadRequestError {
    static STATUS_TEXT = 'You cannot follow yourself';
    static CODE = 'YOU_ARE_ALREADY_FOLLOWING_THIS_AUTHOR';

    /**
     * @param {?Object} _data
     */
    constructor(_data = CannotFollowYourself.STATUS_TEXT) {
        super(_data, CannotFollowYourself.CODE, CannotFollowYourself.STATUS_TEXT);
    }
}

class TargetNotFound extends BadRequestError {
    static STATUS_TEXT = 'Target not found';
    static CODE = 'TARGET_NOT_FOUND';

    /**
     * @param {?Object} _data
     */
    constructor(_data = TargetNotFound.STATUS_TEXT) {
        super(_data, TargetNotFound.CODE, TargetNotFound.STATUS_TEXT);
    }
}

class ComplaintNotFound extends BadRequestError {
    static STATUS_TEXT = 'Not found';
    static CODE = 'NOT_FOUND';

    /**
     * @param {?Object} _data
     */
    constructor(_data = ComplaintNotFound.STATUS_TEXT) {
        super(_data, ComplaintNotFound.CODE, ComplaintNotFound.STATUS_TEXT);
    }
}

class IncorrectModerationRights extends BadRequestError {
    static STATUS_TEXT = 'Incorrect moderation rights';
    static CODE = 'INCORRECT_MODERATION_RIGHTS';

    /**
     * @param {?Object} _data
     */
    constructor(_data = IncorrectModerationRights.STATUS_TEXT) {
        super(_data, IncorrectModerationRights.CODE, IncorrectModerationRights.STATUS_TEXT);
    }
}

class OrderNotFound extends BadRequestError {
    static STATUS_TEXT = 'Order not found';
    static CODE = 'ORDER_NOT_FOUND';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = null, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, OrderNotFound.CODE, OrderNotFound.STATUS_TEXT);
    }
}

class NotEnoughBalance extends BadRequestError {
    static STATUS_TEXT = 'Not enough balance';
    static CODE = 'NOT_ENOUGH_BALANCE';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = NotEnoughBalance.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, NotEnoughBalance.CODE, NotEnoughBalance.STATUS_TEXT);
    }
}

class FavoriteNotFound extends BadRequestError {
    static STATUS_TEXT = 'Favorite not found';
    static CODE = 'FAVORITE_NOT_FOUND';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = FavoriteNotFound.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, FavoriteNotFound.CODE, FavoriteNotFound.STATUS_TEXT);
    }
}

class NotAuthorThisFavorite extends BadRequestError {
    static STATUS_TEXT = 'You not author this target in favorites';
    static CODE = 'NOT_AUTHOR_THIS_FAVORITE';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = NotAuthorThisFavorite.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, NotAuthorThisFavorite.CODE, NotAuthorThisFavorite.STATUS_TEXT);
    }
}

class RepostNotFound extends BadRequestError {
    static STATUS_TEXT = 'Repost not found';
    static CODE = 'REPOST_NOT_FOUND';

    /**
     * @param {?Object} _data
     * @param {?string} _code
     * @param {?string} _message
     */
    constructor(_data = RepostNotFound.STATUS_TEXT, _code = BadRequestError.CODE, _message = BadRequestError.STATUS_TEXT) {
        super(_data, RepostNotFound.CODE, RepostNotFound.STATUS_TEXT);
    }
}

module.exports = {
    BadRequestError, ServiceError, ValidationError,
    InvalidCredentials, InvalidSession, SessionExpired,
    UnAuthorized, AccountIsNotVerified, UserNotFound,
    RecoveryTokenNotFound, InsufficientRole, NotChatAuthor,
    NotMessageAuthor, ChatNotFound, MessageNotFound,
    MessageDeleted, UserNotIsChat, ProductNotFound,
    AdsDelete, AdsNotPaid, AdsNotFound,
    AdsAlreadyPublished, UserAlreadyFollowing, UserNotFollowing,
    CannotFollowYourself, UserNoRights, UserDeleted,
    UserIsBanned, TargetNotFound, IncorrectModerationRights,
    OrderNotFound, NotEnoughBalance, AdsNoMethodPaying,
    NotAuthorThisTarget, SubdomainAlreadyTaken, ComplaintNotFound,
    FavoriteNotFound, RepostNotFound
}