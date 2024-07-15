const db = require('../services/database');
const POSTS_TABLE_NAME = 'posts';
const PURCHASED_POSTS = 'purchased_posts';
const CONSTANTS = require('../Constants');
const COMMENTS_TABLE_NAME = 'comments';

class PostStorage {

    async createNewPost(data, user){
        let currentTime = Math.round(Date.now());

        let active = CONSTANTS.Posts.Created;

        if (user.moderationRights === CONSTANTS.ModerationRights.OnlyPosts ||
            user.moderationRights === CONSTANTS.ModerationRights.All) {
            active = CONSTANTS.Subscriptions.Published;
        }

        let postObject = {
            title: data.title,
            author_id: user.userId,
            description: data.description,
            post_image_path: data.post_image_path,
            type: data.type,
            created_at: currentTime,
            updated_at: currentTime,
            active: active,
            comment_resolution: CONSTANTS.CommentResolution.Allow
        }

        if(+data.type === CONSTANTS.POST_ALLOWED_BY_SUBSCRIPTION_ONLY){
            postObject.subscription_ids = data.subscription_ids;
        }

        if(+data.type === CONSTANTS.POST_ALLOWED_BY_SUBSCRIPTION_AND_PURCHASE){
            postObject.subscription_ids = data.subscription_ids;
            postObject.price = data.price;
        }

        return (await db(POSTS_TABLE_NAME).insert(postObject).returning('id'))[0];
    }

    async updatePost(data){
        let currentTime = Math.round(Date.now());

        let postObject = {
            title: data.title,
            author_id: data.author_id,
            description: data.description,
            post_image_path: data.post_image_path,
            type: data.type,
            updated_at: currentTime,
            active: CONSTANTS.Posts.Created,
        }

        if(+data.type === CONSTANTS.POST_ALLOWED_BY_SUBSCRIPTION_ONLY){
            postObject.subscription_ids = data.subscription_ids;
        }

        if(+data.type === CONSTANTS.POST_ALLOWED_BY_SUBSCRIPTION_AND_PURCHASE){
            postObject.subscription_ids = data.subscription_ids;
            postObject.price = data.price;
        }

        return db(POSTS_TABLE_NAME).update(postObject).where({id: data.id});
    }

    async updatePosts(where, data){
        return db(POSTS_TABLE_NAME).where(where).update(data);
    }

    async banPosts(userId){
        return db(POSTS_TABLE_NAME).update(
            {active: CONSTANTS.Posts.UserBanned}
        ).where({author_id: userId});
    }

    async unbanPosts(userId){
        return db(POSTS_TABLE_NAME).update(
            {active: CONSTANTS.Posts.Published}
        ).where({author_id: userId});
    }

    async searchPosts(where, fields = ['*'], orderBy = ['id']){
        return db(POSTS_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }

    async searchPostsByIds(arrayIds, fields = ['*'], orderBy = ['id']){
        return db(POSTS_TABLE_NAME).whereIn('id', arrayIds).select(fields).orderBy(orderBy);
    }

    async deletePost(data){

        let productObject = {
            active: CONSTANTS.Posts.Deleted,
            delete_reason: data.delete_reason
        }

        return db(POSTS_TABLE_NAME).update(productObject).where({id: data.id});
    }

    async addLikeInPost(data){
        return db(POSTS_TABLE_NAME).where('id', data.postId).update({
            likes: JSON.stringify(data.likes)
        });
    }

    async createPurchasedUserPosts(data){
        return db(PURCHASED_POSTS).insert({
            post_id: data.postId,
            client_id: data.clientId,
            created_at: Date.now()
        })
    }

    async searchPurchasedPosts(where, fields = ['*'], orderBy = ['id']){
        return db(PURCHASED_POSTS).where(where).select(fields).orderBy(orderBy);
    }

    async updatePostForEditing(data){
        return db(POSTS_TABLE_NAME).where('id', data.id).update({
            active: CONSTANTS.Posts.Editing
        })
    }

}

module.exports = new PostStorage();