module.exports = {

    ACTIVE_USER_NOT_ACTIVATED: 0,
    ACTIVE_USER_ACTIVE: 1,
    ACTIVE_USER_DELETED: 2,
    ACTIVE_USER_BANNED: 3,

    ROLE_REGISTERED: 1,
    ROLE_AUTHOR: 2,
    ROLE_ADMIN: 3,

    MESSAGE_CREATE: 0,
    MESSAGE_SENT: 1,
    MESSAGE_READ: 2,
    MESSAGE_DELETE: 3,

    PriceCreateAds: 500, // цена в рублях
    PayingType: {
        Balance: 1, // оплата с баланса
        Card: 2 // оплата по карте
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

    TargetType: {
        Product: 1,
        Subscription: 2,
        Post: 3,
        Ads: 4
    },

    AdsTypes: {
        NotPayed: 0,
        Permission: 1,
        Published: 2,
        Deleted: 3,
        Editing: 4
    },

    ComplaintTarget:{
        Product: 1,
        Subscription: 2,
        Post: 3,
        Ads: 4,
        Cover: 5,
        ProfilePicture: 6,
        Message: 7,
        Comment: 8,
    },

    ComplaintType: {
        Created: 1,
        Deleted: 2,
    },

    Subscriptions: {
        Created: 0,
        Published: 1,
        Deleted: 2,
        UserBanned: 3,
    },

    Posts: {
        Created: 0,
        Published: 1,
        Deleted: 2,
        UserBanned: 3
    },

    Products: {
        Created: 0,
        Published: 1,
        Deleted: 2,
        UserBanned: 3
    },

    ModerationRights: {
       NotRights: 0,
       OnlyProducts: 1,
       OnlySubscriptions: 2,
       OnlyPosts: 3,
       All: 4
    },

    selectPeriods: {
        'day': 1,
        'yesterday': 2,
        'week': 7,
        'month': 31,
        'previousMonth': 62,
        'all': 1000
    },

    CommentType: {
        Product: 1,
        Subscription: 2,
        Post: 3
    },

    FavoriteType: {
        Likes: 1,
        Comments: 2,
        Reposts: 3,
        Favorites: 4
    },

    FavoriteTargetType: {
        Product: 1,
        Subscription: 2,
        Post: 3
    },

    FavoriteActive: {
        Active: 1,
        Delete: 2
    },

    RepostType: {
        Wall: 1,
        Message: 2
    },

    RepostActive: {
        Active: 1,
        Delete: 2
    },

     USER_ROLES: {
        'user': this.ROLE_REGISTERED,
        'author': this.ROLE_AUTHOR,
        'admin': this.ROLE_ADMIN,
    },

    NOTIFICATION_STATUSES: {
        Created: 1,
        Read: 2,
        Deleted: 3
    },

    USER_TOKEN_NAME: 'authorization',
}