module.exports = {

    ROLE_REGISTERED: 1,
    ROLE_AUTHOR: 2,
    ROLE_ADMIN: 3,

    USER_TOKEN_NAME: 'authorization',

    USER_BANNED_ACTIVE: 3,

    POST_ALLOWED_ALL: 1,
    POST_ALLOWED_BY_SUBSCRIPTION_ONLY: 2,
    POST_ALLOWED_BY_SUBSCRIPTION_AND_PURCHASE: 3,

    POST_TYPES: {
        POST_ALLOWED_ALL: 'Увидеть могут все',
        POST_ALLOWED_BY_SUBSCRIPTION_ONLY: 'Доступ только по подписке',
        POST_ALLOWED_BY_SUBSCRIPTION_AND_PURCHASE: 'Доступ по подписке и по единоразовой покупке'
    },

    Subscriptions: {
        Created: 0,
        Published: 1,
        Deleted: 2,
        UserBanned: 3,
        Editing: 4,
    },

    SubscribedUser: {
        Active: 1,
        NotActive: 2
    },

    Posts: {
        Created: 0,
        Published: 1,
        Deleted: 2,
        UserBanned: 3,
        Editing: 4
    },

    Products: {
        Created: 0,
        Published: 1,
        Deleted: 2,
        UserBanned: 3,
        Editing: 4
    },

    ModerationRights: {
        NotRights: 0,
        OnlyProducts: 1,
        OnlySubscriptions: 2,
        OnlyPosts: 3,
        All: 4
    },

    OrderTypes: {
        Product: 1,
        Subscription: 2,
        PostPurchase: 3,
        Ads: 4
    },

    StatusOrder: {
        Create: 1,
        Process: 2,
        Payed: 3
    },

    ReferralActive: {
        Active: 1,
        NotActive: 2
    },

    ReferralTargetType: {
        Product: 1,
        Subscription: 2
    },

    ReferralLevels: {
        First: 1,
        Second: 2,
        Third: 3,
        Fourth: 4,
        Fifth: 5,
        Sixth: 6,
        Seventh: 7,
        Eighth: 8,
        Ninth: 9,
        Tenth: 10,

    },

    CommentResolution: {
        Allow: 1,
        Ban: 2
    },

    CommentStatus: {
        Created: 0,
        Active: 1,
        Deleted: 2
    },

    CommentType: {
        Product: 1,
        Subscription: 2,
        Post: 3
    },

    TargetType: {
        Product: 1,
        Subscription: 2,
        Post: 3,
        Ads: 4
    },

    LikeStatus: {
        Active: 1,
        Delete: 2,
    },

    LikeType: {
        Product: 1,
        Subscription: 2,
        Post: 3
    },

    RepostType: {
        Wall: 1,
        Message: 2
    },

    RepostActive: {
        Active: 1,
        Delete: 2
    },

    FavoriteType: {
        Likes: 1,
        Comments: 2,
        Reposts: 3,
        Favorites: 4
    },
}