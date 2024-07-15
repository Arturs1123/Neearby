const db = require('../services/database');
const SUBSCRIPTIONS_TABLE_NAME = 'subscription'
const SUBSCRIBED_USERS_TABLE_NAME = 'subscribed_users';
const CONSTANTS = require("../Constants");
const COMMENTS_TABLE_NAME = 'comments';

class SubscriptionStorage {

    async createNewSubscription(data, user){
        let currentTime = Math.round(Date.now());

        let active = CONSTANTS.Subscriptions.Created

        // if (user.moderationRights === CONSTANTS.ModerationRights.OnlySubscriptions ||
        //     user.moderationRights === CONSTANTS.ModerationRights.All) {
        //     active = CONSTANTS.Subscriptions.Published;
        // }

        let subscriptionObject = {
            title: data.title,
            author_id: data.author_id,
            price: data.price,
            discount_price: data.discount_price,
            name_user: data.name_user,
            number_user: data.number_user,
            email_user: data.email_user,
            subscription_image_path: data.subscription_image_path,
            description: data.description,
            created_at: currentTime,
            updated_at: currentTime,
            active: active,
            zakrep: "false",
            comment_resolution: CONSTANTS.CommentResolution.Allow
        }
        return (await db(SUBSCRIPTIONS_TABLE_NAME).insert(subscriptionObject).returning('id'))[0];
    }

    async updateSubscription(data){
        let currentTime = Math.round(Date.now());

        let SubscriptionObject = {
            title: data.title,
            price: data.price,
            discount_price: data.discount_price,
            subscription_image_path: data.subscription_image_path,
            description: data.description,
            updated_at: currentTime,
            active: CONSTANTS.Subscriptions.Created
        }
        return db(SUBSCRIPTIONS_TABLE_NAME).update(SubscriptionObject).where({id: data.id});
    }

    async banSubscriptions(data){
        return db(SUBSCRIPTIONS_TABLE_NAME).update(
            {active: CONSTANTS.Subscriptions.Deleted}
        ).where({id: data.id});
    }

    async unbanSubscriptions(data){
        return db(SUBSCRIPTIONS_TABLE_NAME).update(
            {active: CONSTANTS.Subscriptions.Published}
        ).where({id: data.id});
    }

    async updateSubscriptionsPosition(data){
        let currentTime = Math.round(Date.now());

        let productObject = {
            delete_reason: data.delete_reason,
            updated_at: currentTime,
        }
        return db(SUBSCRIPTIONS_TABLE_NAME).update(productObject).where({id: data.id});
    }
    async updateSubscriptionsComments(data){
        let currentTime = Math.round(Date.now());

        let productObject = {
            comment_resolution: data.comment_resolution,
            updated_at: currentTime,
        }
        return db(SUBSCRIPTIONS_TABLE_NAME).update(productObject).where({id: data.id});
    }

    async searchSubscriptions(where, fields = ['*'], orderBy = ['id']){
        return db(SUBSCRIPTIONS_TABLE_NAME).where(where).select(fields).orderBy(orderBy).orWhere('active', CONSTANTS.Subscriptions.Deleted);
    }
    async searchSubscriptionsAdmin(where, fields = ['*'], orderBy = ['id']){
        return db(SUBSCRIPTIONS_TABLE_NAME).where(where).select(fields).orderBy(orderBy).orWhere('active', CONSTANTS.Subscriptions.Deleted && CONSTANTS.Subscriptions.Created);
    }
    async searchSubscriptionsByIds(where, fields = ['*'], orderBy = ['id']){
        return db(SUBSCRIPTIONS_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }

    // async deleteSubscription(data){
    //
    //     let subscriptionObject = {
    //         active: CONSTANTS.Subscriptions.Deleted,
    //         delete_reason: data.delete_reason
    //     }
    //     return db(SUBSCRIPTIONS_TABLE_NAME).update(subscriptionObject).where({id: data.id});
    // }
    async deleteSubscription(where, orderBy = ['id']){
        return db(SUBSCRIPTIONS_TABLE_NAME).delete().where(where).orderBy(orderBy);
    }

    async searchSubscribedUser(where){
        return db(SUBSCRIBED_USERS_TABLE_NAME).where(where)
    }

    async createSubscribedUser(data){
        const date = new Date();
        const activeUntil = date.setMonth(date.getMonth() + 1);

        const subscribedUser = {
            subscription_id: data.subscriptionId,
            subscriber_id: data.subscriberId,
            created_at: Date.now(),
            active_until: activeUntil,
            active: CONSTANTS.SubscribedUser.Active,
            referral: JSON.stringify(data.referral)
        }

        return db(SUBSCRIBED_USERS_TABLE_NAME).insert(subscribedUser);
    }

    async searchSubscriptionsUser(where, fields = ['*'], orderBy = ['id']){
        return db(SUBSCRIBED_USERS_TABLE_NAME).where(where).select(fields).orderBy(orderBy)
    }

    async unsubscribeUser(where, data){
        return db(SUBSCRIBED_USERS_TABLE_NAME).where(where).update(data);
    }

    async likeSubscription(data){
        return db(SUBSCRIPTIONS_TABLE_NAME).where('id', data.subscriptionId).update({
            likes: JSON.stringify(data.likes)
        });
    }

    async updateSubscriptionForEditing(data){
        return db(SUBSCRIPTIONS_TABLE_NAME).where('id', data.id).update({
            active: CONSTANTS.Subscriptions.Editing
        })
    }
}

module.exports = new SubscriptionStorage();