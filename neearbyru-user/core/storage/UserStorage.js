const db = require('../services/database');
const USERS_TABLE_NAME = 'users'
const SESSIONS_TABLE_NAME = 'sessions';
const TOKENS_TABLE_NAME = 'password_recovery_tokens';
const CONFIRMED_REGISTRATION_TABLE_NAME = 'registration_verification_tokens';
const COMPLAINTS_TABLE_NAME = 'complaints';
const COMMENT_TABLE_NAME = 'comments';
const PROFILE_COVER_TABLE_NAME = 'profile_covers';
const PROFILE_PICTURE_TABLE_NAME = 'profile_pictures'
const CARD_NUMBERS = 'card_numbers';
const FAVORITES_TABLE_NAME = 'favorites';
const NOTIFICATIONS_TABLE_NAME = 'notifications';

const SUBSCRIPTIONS_TABLE_NAME = 'subscription';
const PRODUCTS_TABLE_NAME = 'products';
const POSTS_TABLE_NAME = 'posts';
const REPOSTS_TABLE_NAME = 'reposts';

const PROFILE_MODERATION_COVER_TABLE_NAME = 'cover_moderation_list';
const PROFILE_MODERATION_PICTURE_TABLE_NAME = 'avatar_moderation_list';
const CONSTANTS = require('../Constants');
const {NOTIFICATION_STATUSES} = require("../Constants");


class UserStorage {

    async createNewUser(data) {
        let userObject = {
            name: data.name,
            phone: data.phone,
            password: data.encryptedPassword,
            email: data.email,
            role: data.role,
            active: 0,
            followers_count: 0,
            subscribers_count: 0,
            sells_count: 0,
            moderation_rights: CONSTANTS.ModerationRights.NotRights,
            created_at: parseInt(Date.now(), 10),
            balance: 0
        }
        return (await db(USERS_TABLE_NAME).insert(userObject).returning('id'))[0];
    }

    async insertSessionIntoDatabase(token, userId, ip) {
        return db(SESSIONS_TABLE_NAME).insert({
            token,
            user_id: userId,
            created_at: parseInt(Date.now(), 10),
            ip,
        });
    }

    async findSession(searchData){
        return db(SESSIONS_TABLE_NAME).where(searchData);
    }

    async findSessionCreatedLater(createdAt){
        return db(SESSIONS_TABLE_NAME).select(['id', 'ip', 'created_at']).where('created_at', '>=', createdAt);
    }

    async deleteSession(id){
        return db(SESSIONS_TABLE_NAME).del().where({id});
    }

    async findUser(searchData){
        return db(USERS_TABLE_NAME).where(searchData);
    }

    async addCard(data){
        let currentTime = Date.now()
        return db(CARD_NUMBERS).insert({
            ...data,
            created_at: currentTime,
            updated_at: currentTime
        });
    }

    async updateCard(where, data){
        return db(CARD_NUMBERS).where(where).update({
            ...data,
            updated_at: Date.now()
        })
    }

    async searchCardUser(searchData){
        return db(CARD_NUMBERS).where(searchData);
    }

    async findAllUser(){
        return db(USERS_TABLE_NAME).select(
            'id', 'name', 'login',
            'email', 'role', 'phone',
            'followers_count', 'subscribers_count',
            'sells_count', 'profile_picture_id', 'active', 'reason_banned'
        );
    }

    async updateUser(where, data){
        return db(USERS_TABLE_NAME).where(where).update(data)
    }

    async findUsersByArrayId(searchData){
        return db(USERS_TABLE_NAME).whereIn('id',searchData)
    }

    async addPasswordRecoveryToken(user){
        return db(TOKENS_TABLE_NAME).insert(user);
    }

    async findRecoveryToken(token){
        return db(TOKENS_TABLE_NAME).where(token);
    }

    async updateUserPassword(userID, password){
        return db(USERS_TABLE_NAME).update({password}).where({id: userID});
    }

    async clearRecoveryTokensForUser(userID){
        return db(TOKENS_TABLE_NAME).del().where({user_id: userID});
    }

    async insertConfirmedTokenIntroDatabase(token, userId) {
        return db(CONFIRMED_REGISTRATION_TABLE_NAME).insert({
            token: token,
            user_id: userId,
            created_at: parseInt(Date.now(), 10)
        })
    }

    async findTokenForConfirmedRegistration(token){
        return (await db(CONFIRMED_REGISTRATION_TABLE_NAME).where(token))[0];
    }

    async confirmedRegistration(id, userId) {
        await db(CONFIRMED_REGISTRATION_TABLE_NAME).where({id: id}).del()
        await db(USERS_TABLE_NAME).where({id: userId}).update({ active: 1 })
        return true;
    }

    async createProfilePicture(data) {
        return db(PROFILE_PICTURE_TABLE_NAME).insert(data).returning('id');
    }

    async updateProfilePicture(where, data) {
        return db(PROFILE_PICTURE_TABLE_NAME).where(where).update(data);
    }


    async updateModerationProfileAvatar(data){
        return db(PROFILE_MODERATION_PICTURE_TABLE_NAME).insert(data).returning('id');
    }

    async updateProfileAvatar(where, data){
        return db(PROFILE_PICTURE_TABLE_NAME).where(where).update(data);
    }


    async updateProfileCover(where, data){
        return db(PROFILE_COVER_TABLE_NAME).where(where).update(data);
    }



    async searchProfilePicture(where){
        return db(PROFILE_PICTURE_TABLE_NAME).where(where)
    }

    async searchProfilePictureByIds(arrayIds){
        return db(PROFILE_PICTURE_TABLE_NAME).whereIn('id', arrayIds)
    }

    async searchComment(where){
        return db(COMMENT_TABLE_NAME).where(where)
    }

    async searchCommentByIds(arrayIds){
        return db(COMMENT_TABLE_NAME).whereIn('id', arrayIds)
    }

    async createCover(data) {
        return db(PROFILE_COVER_TABLE_NAME).insert(data).returning('id');
    }

    async updateModerationProfileCover(data){
        return db(PROFILE_MODERATION_COVER_TABLE_NAME).insert(data).returning('id');
    }

    async updateProfileAvatarStatus(where, data, status, userId){
        return db(PROFILE_MODERATION_COVER_TABLE_NAME).update('status', 1);
    }
    async updateProfileAvatarStatusCancel(where, data, status, id){
        return db(PROFILE_MODERATION_COVER_TABLE_NAME).update('status', 2);
    }

    async updateProfilePictureStatus(where, data, status, userId){
        return db(PROFILE_MODERATION_PICTURE_TABLE_NAME).update('status', 1);
    }
    async updateProfilePictureStatusCancel(where, data, status, id){
        return db(PROFILE_MODERATION_PICTURE_TABLE_NAME).update('status', 2).returning('id').where(where);
    }


    async searchModerProfilePicture(where, fields = ['*'], orderBy = ['img_path']){
        return db(PROFILE_MODERATION_COVER_TABLE_NAME).select(fields).orderBy(orderBy).orWhere('status', 0)
    }
    async searchCoversAcceptAdmin(where, fields = ['*'], orderBy = ['img_path']){
        return db(PROFILE_MODERATION_COVER_TABLE_NAME).where(where).select(fields).orderBy(orderBy).orWhere('status', 1);
    }
    async searchCoversCancelAdmin(where, fields = ['*'], orderBy = ['id']){
        return db(PROFILE_MODERATION_COVER_TABLE_NAME).where(where).select(fields).orderBy(orderBy).orWhere('status', 2);
    }


    async searchModerProfileAvatars(where, fields = ['*'], orderBy = ['img_path']){
        return db(PROFILE_MODERATION_PICTURE_TABLE_NAME).select(fields).orderBy(orderBy).orWhere('status', 0)
    }
    async searchAvatarsAcceptAdmin(where, fields = ['*'], orderBy = ['img_path']){
        return db(PROFILE_MODERATION_PICTURE_TABLE_NAME).where(where).select(fields).orderBy(orderBy).orWhere('status', 1);
    }
    async searchAvatarsCancelAdmin(where, fields = ['*'], orderBy = ['id']){
        return db(PROFILE_MODERATION_PICTURE_TABLE_NAME).where(where).select(fields).orderBy(orderBy).orWhere('status', 2);
    }

    async banAvatar(data){
        return db(PROFILE_MODERATION_PICTURE_TABLE_NAME).update(
            {status: CONSTANTS.Products.Deleted}
        ).where({id: data.id});
    }

    async unbanAvatar(data){
        return db(PROFILE_MODERATION_PICTURE_TABLE_NAME).update(
            {status: CONSTANTS.Products.Published}
        ).where({id: data.id});
    }


    async searchProductAdmin(where, fields = ['*'], orderBy = ['product_image_path']){
        return db(PRODUCTS_TABLE_NAME).where(where).select(fields).orderBy(orderBy).orWhere('active', 0);
    }
    async searchProductAcceptAdmin(where, fields = ['*'], orderBy = ['product_image_path']){
        return db(PRODUCTS_TABLE_NAME).where(where).select(fields).orderBy(orderBy).orWhere('active', 1);
    }
    async searchProductCancelAdmin(where, fields = ['*'], orderBy = ['id']){
        return db(PRODUCTS_TABLE_NAME).where(where).select(fields).orderBy(orderBy).orWhere('active', 2);
    }

    async deleteModerCover(where, fields = ['*'], orderBy = ['id']){
        return db(PROFILE_MODERATION_COVER_TABLE_NAME).del().select(fields).orderBy(orderBy);
    }

    async searchModerProfileAvatar(where, fields = ['*'], orderBy = ['img_path']){
        return db(PROFILE_MODERATION_PICTURE_TABLE_NAME).select(fields).orderBy(orderBy).where('status', 0)
    }

    async searchModerProfileAvatarStatus(where, fields = ['*'], orderBy = ['img_path']){
        return db(PROFILE_MODERATION_PICTURE_TABLE_NAME).select(fields).orderBy(orderBy).where('status', 1).orWhere('status', 2)
    }

    async searchModerProfileCoverStatus(where, fields = ['*'], orderBy = ['img_path']){
        return db(PROFILE_MODERATION_COVER_TABLE_NAME).select(fields).orderBy(orderBy).where('status', 1).orWhere('status', 2)
    }

    async searchCoveredByIds(where, fields = ['*'], orderBy = ['id']){
        return db(PROFILE_MODERATION_COVER_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }
    async searchAvataredByIds(where, fields = ['*'], orderBy = ['id']){
        return db(PROFILE_MODERATION_PICTURE_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }


    async deleteModerAvatar(where, fields = ['*'], orderBy = ['id']){
        return db(PROFILE_MODERATION_PICTURE_TABLE_NAME).del().select(fields).orderBy(orderBy);
    }


    async findUsersByCoversIds(arrayIds){
        return db(USERS_TABLE_NAME).whereIn('cover_path_id', arrayIds)
    }

    async findUsersByProfilePicturesIds(arrayIds){
        return db(USERS_TABLE_NAME).whereIn('profile_picture_id', arrayIds)
    }

    async updateCover(where, data) {
        return db(PROFILE_COVER_TABLE_NAME).where(where).update(data);
    }

    async searchCover(where){
        return db(PROFILE_COVER_TABLE_NAME).where(where)
    }

    async searchCoverByIds(arrayIds){
        return db(PROFILE_COVER_TABLE_NAME).whereIn('id', arrayIds)
    }

    async searchNotification(where, fields = ['*'], orderBy = ['created_at']){
        return db(NOTIFICATIONS_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }

    async searchUnreadNotification(where, fields = ['*'], orderBy = ['created_at']){
        return db(NOTIFICATIONS_TABLE_NAME).where(where).select(fields).orderBy(orderBy).where('status', 1).orWhere('status', 4);
    }

    async readNotification(where, status){
        return db(NOTIFICATIONS_TABLE_NAME).update('status', status || 2).where(where);
    }


    async createNotification({target_user_id, payload}){


        let notificationObject = {
                target_user_id,
                status: 1,
                data: payload,
                created_at: Date.now()
            }

        console.log(notificationObject);

        return (await db(NOTIFICATIONS_TABLE_NAME).insert(notificationObject).returning('notification_id'))[0];
    }

    async searchUser(where, fields = ['*'], orderBy = ['id']){
        return db(USERS_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }

    async createComplaint(data){
        const createComplaint = {
            client_id: data.clientId,
            type: data.type,
            target_id: data.id,
            complaint_message: data.message,
            active: CONSTANTS.ComplaintType.Created
        }
        return db(COMPLAINTS_TABLE_NAME).insert(createComplaint);
    }

    async searchComplaint(where, fields = ['*'], orderBy = ['id']){
        if(where){
            return db(COMPLAINTS_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
        }
        return db(COMPLAINTS_TABLE_NAME).select(fields).orderBy(orderBy);
    }

    async deleteComplaints(where, fields = ['*'], orderBy = ['id']){
        return db(COMPLAINTS_TABLE_NAME).where(where).update({active: CONSTANTS.ComplaintType.Deleted})
    }

    async addInFavorites(data){
        return db(FAVORITES_TABLE_NAME).insert({
            user_id: data.user_id,
            type: data.type,
            target_type: data.target_type,
            target_id: data.target_id,
            active: CONSTANTS.FavoriteActive.Active,
            created_at: Date.now()
        })
    }
    async searchFavorites(where, fields = ['*'], orderBy = ['id']){
        return db(FAVORITES_TABLE_NAME).where(where).select(fields).orderBy(orderBy)
    }

    async updateFavorite(where, update){
        return db(FAVORITES_TABLE_NAME).where(where).update(update);
    }

    async deleteFavorite(where){
        return db(FAVORITES_TABLE_NAME).where(where).update({active: CONSTANTS.FavoriteActive.Delete});
    }

    async searchSubscription(where, fields = ['*'], orderBy = ['id']){
        return db(SUBSCRIPTIONS_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }

    async searchProduct(where, fields = ['*'], orderBy = ['id']){
        return db(PRODUCTS_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }

    async searchPost(where, fields = ['*'], orderBy = ['id']){
        return db(POSTS_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }

    async addRepost(data){
        return db(REPOSTS_TABLE_NAME).insert({...data, created_at: Date.now()});
    }

    async searchReposts(where, fields = ['*'], orderBy = ['id']){
        return db(REPOSTS_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }

    async deleteRepost(where){
        return db(REPOSTS_TABLE_NAME).where(where).update({active: CONSTANTS.RepostActive.Delete});
    }

}

module.exports = new UserStorage();