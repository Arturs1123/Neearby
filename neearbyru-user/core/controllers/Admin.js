const Validator = require('../helpers/validator')
const config = require('../../secret/config');
const CONSTANTS = require('../Constants');
const User = require("../system/User");
const {IncorrectModerationRights, TargetNotFound} = require("../Errors");

class Admin {

    _userController;
    _orderController;
    _messageController;
    _adsController;
    _serviceAuthor;
    _serviceMail;

    constructor(userController, orderController, messageController, adsController, serviceAuthor, serviceMail) {
        this._userController = userController;
        this._orderController = orderController;
        this._messageController = messageController;
        this._adsController = adsController;
        this._serviceAuthor = serviceAuthor;
        this._serviceMail = serviceMail;
    }

    async getUsers(data, headers, user){
        const validator = new Validator();

        // "filter": { "all": true, "banned": false, "notBanned": false, "notConfirmed": false}
        validator.setRule('filter', Validator.TYPES.object());

        validator.validate(data);

        for (let key in data.filter){
            if(data.filter[key]){
                return await this._userController.getAllUsers(key, data.filter[key]);
            }
        }

        return await this._userController.getAllUsers('all');
    }

    async banUser (data, headers, user) {
        const validator = new Validator();

        validator.setRule('userId', Validator.TYPES.number().required());
        validator.setRule('reason_banned', Validator.TYPES.string().required());

        validator.validate(data);

        // TODO: сделать отправку сообщения на почту после удаления
        await this._userController.banUser(data, headers, user);
        await this._serviceAuthor.banProductsForAdmin(data);
        await this._serviceAuthor.banSubscriptionsForAdmin(data);
        await this._serviceAuthor.banPostsForAdmin(data);

        return true;
    }

    async unbanUser (data, headers, user) {
        const validator = new Validator();

        validator.setRule('userId', Validator.TYPES.number().required());

        validator.validate(data);

        await this._userController.unbanUser(data, headers, user);
        await this._serviceAuthor.unbanProductsForAdmin(data);
        await this._serviceAuthor.unbanSubscriptionsForAdmin(data);
        await this._serviceAuthor.unbanPostsForAdmin(data);

    }

    async searchComplaints(data, headers, user){

        const validator = new Validator();

        validator.setRule('complaintId', Validator.TYPES.string().min(0));
        validator.setRule('clientId', Validator.TYPES.string().min(0));

        validator.validate(data)

        return await this._userController.searchComplaints(data, headers, user);
    }

    async deleteComplaints(data, headers, user){

        const validator = new Validator();

        validator.setRule('complaintId', Validator.TYPES.number().required());

        validator.validate(data);

        await this._userController.deleteComplaints(data, headers, user);

        return true;
    }

    async deleteTarget(data, headers, user){
        const validator = new Validator();

        validator.setRule('type', Validator.TYPES.number().required());
        validator.setRule('targetId', Validator.TYPES.number().required());
        validator.setRule('message', Validator.TYPES.string());

        validator.validate(data);

        let target

        switch(Number(data.type)){
            case CONSTANTS.TargetType.Product:
                [target] = await this._serviceAuthor.searchProduct({id: data.targetId});
                await this._serviceAuthor.deleteProductForAdmin({id: data.targetId, delete_reason: data.message});
                break;
            case CONSTANTS.TargetType.Subscription:
                [target] = await this._serviceAuthor.searchProduct({id: data.targetId});
                await this._serviceAuthor.deleteSubscriptionForAdmin({id: data.targetId, delete_reason: data.message});
                break;
            case CONSTANTS.TargetType.Post:
                [target] = await this._serviceAuthor.searchProduct({id: data.targetId});
                await this._serviceAuthor.deletePostForAdmin({id: data.targetId, delete_reason: data.message});
                break;
            case CONSTANTS.TargetType.Ads:
                await this._adsController.deleteAds(
                    {
                        id: data.targetId,
                        delete_reason: data.message
                    },
                    headers, user
                );
                break;
        }

        if(data.type !== CONSTANTS.TargetType.Ads){

            const [author] = await this._userController.findUser({id: target.author_id});
            await this._serviceMail.mailDeleteTarget({
                author: author,
                target: target,
                message: data.message,
                type: data.type
            });
        }

        return true
    }

    async submittingTargetForEditing(data, headers, user){
        // TODO: сделать возможность отправить (товар, подписку, обьявление или пост ) на редактирование обратно его автору
        const validator = new Validator();

        validator.setRule('type', Validator.TYPES.number().required());
        validator.setRule('targetId', Validator.TYPES.number().required());
        validator.setRule('message', Validator.TYPES.string().required());

        validator.validate(data);

        let target

        switch(data.type){
            case CONSTANTS.TargetType.Product:
                [target] = await this._serviceAuthor.searchProduct({id: data.targetId});
                break;
            case CONSTANTS.TargetType.Subscription:
                [target] = await this._serviceAuthor.searchSubscription({id: data.targetId});
                break;
            case CONSTANTS.TargetType.Post:
                [target] = await this._serviceAuthor.searchPost({id: data.targetId})
                break;
            case CONSTANTS.TargetType.Ads:
                [target] = await this._adsController.searchAds({id: data.targetId})
                break;
        }

        if(!target){
            throw new TargetNotFound()
        }

        switch(data.type){
            case CONSTANTS.TargetType.Product:
                await this._serviceAuthor.updateProductForEditing({id: data.targetId});
                break;
            case CONSTANTS.TargetType.Subscription:
                await this._serviceAuthor.updateSubscriptionForEditing({id: data.targetId});
                break;
            case CONSTANTS.TargetType.Post:
                await this._serviceAuthor.updatePostForEditing({id: data.targetId})
                break;
            case CONSTANTS.TargetType.Ads:
                await this._adsController.updateAdsForEditing({id: data.targetId})
                break;
        }

        if(data.type === CONSTANTS.TargetType.Ads){
            await this._messageController.sendMessageSupportNeearby(
            {
                    userId: target.creator_id,
                    message: data.message,
                },
            headers)
            return true
        }

        await this._messageController.sendMessageSupportNeearby(
            {
                userId: target.author_id,
                message: data.message,
            },
        headers)

        return true

    }

    async allAds(data, headers, user){
        const validator = new Validator();

        validator.setRule('active', Validator.TYPES.number());

        validator.validate(data)

        await this._adsController.allAds(data, headers, user)

        return true;
    }

    async sendMessageAllUsers(data, headers, user){
        const validator = new Validator();

        validator.setRule('message', Validator.TYPES.string().required());

        validator.validate(data);

        const users = await this._userController.getAllUsers();

        const adminAuthToken = await this._userController.authenticate({
            email: config.USER_NEEARBY_SUPPORT_EMAIL,
            password: config.USER_NEEARBY_SUPPORT_PASSWORD
        }, headers);

        headers[CONSTANTS.USER_TOKEN_NAME] = adminAuthToken;

        const neearbySupportUser = await this._userController.whoami({token: adminAuthToken, roles: ['admin']}, headers)

        for (let i = 0; i < users.length; i++){
            await this._messageController.sendMessageSupportNeearby({
                userId: users[i].id,
                message: data.message,
                neearbySupportUser: neearbySupportUser}
                , headers)
        }

        return true;
    }

    async sendMailing(data, headers, user){
        const validator = new Validator();

        validator.setRule('title', Validator.TYPES.string().required());
        validator.setRule('message', Validator.TYPES.string().required());

        validator.validate(data);

        data.users = await this._userController.getAllUsers();
        data.author = user;

        await this._serviceMail.sendMailing(data);

        return true;
    }

    async allOrders(data, headers, user){
        const validator = new Validator();

        validator.setRule('status', Validator.TYPES.number().required());

        validator.validate(data);

        return await this._orderController.allOrders(data);
    }

    async allTargetsForModeration(data, headers, user){
        const validator = new Validator();

        validator.setRule('type', Validator.TYPES.number().required());

        validator.validate(data);

        let targets;

        switch(data.type){
            case CONSTANTS.TargetType.Product:
                targets = await this._serviceAuthor.searchModerationProducts({active: CONSTANTS.Products.Created});
                break;
            case CONSTANTS.TargetType.Subscription:
                targets = await this._serviceAuthor.searchModerationSubscriptions({active: CONSTANTS.Subscriptions.Created});
                break;
            case CONSTANTS.TargetType.Post:
                targets = await this._serviceAuthor.searchModerationPosts({active: CONSTANTS.Posts.Created})
                break;
            default:
                targets = await this._serviceAuthor.searchModerationProducts({active: CONSTANTS.Products.Created});
                break;
        }

        return targets;
    }

    async updateModerationRights(data, headers, user){
        const validator = new Validator();

        validator.setRule('userId', Validator.TYPES.number().required());
        validator.setRule('moderationRights', Validator.TYPES.number().required());

        validator.validate(data);

        if(data.moderationRights > 4){
            throw new IncorrectModerationRights();
        }

        await this._userController.updateModerationRights(data);

        return true;
    }

    async searchModerationComments(data, headers, user){
        const validator = new Validator();

        validator.setRule('type', Validator.TYPES.number());

        validator.validate(data);

        if(!data.type){
            data.type = CONSTANTS.CommentType.Product
        }

        return await this._serviceAuthor.searchModerationComments(data);
    }

    async confirmSendComment(data, headers, user){
        const validator = new Validator();

        validator.setRule('commentId', Validator.TYPES.number().required());

        validator.validate(data);

        await this._serviceAuthor.confirmSendComment({
            id: data.commentId
        });

        return true;
    }

    async moderationCovers(data, headers, user){
        return await this._userController.searchCoversForModeration(data);
    }

    async publicationCover(data, headers, user){
        return await this._userController.confirmModerationCover(data);
    }

    async moderationProfilePictures(data, headers, user){
        return await this._userController.searchProfilePicturesForModeration(data);
    }

    async publicationProfilePicture(data, headers, user){
        return await this._userController.confirmModerationProfilePicture(data);
    }

}

module.exports = Admin;