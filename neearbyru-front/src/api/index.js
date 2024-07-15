const local = true;
const axios = require('axios');
let services = {
    serviceUser: 'https://service-user.neearby.pro',
    serviceStorage: ' https://service-storage.neearby.pro',
    serviceAuthor: ' https://service-author.neearby.pro',
    websocket: 'https://service-user.neearby.pro'
};

if(local) {
    services.serviceUser = 'http://localhost:3001';
    services.serviceStorage = 'http://localhost:3002';
    services.serviceAuthor = 'http://localhost:3000';
    services.websocket = 'http://localhost:3003';
}


const {useToast, POSITION, TYPE} = require('vue-toastification');
const store = require('../store');
const {useState} = require('vuex');
const {a} = require("vue-the-mask/src/tokens");


class ApiWrapper {

    local = local


    async readNotification({notificationId, status}){
        let result = await this.sendRequest({
            route: 'api/user/readNotification',
            serviceHost: services.serviceUser,
            body: {
                notification_id: notificationId,
                status
            },
            method: 'POST'
        });

        return {
            success: result.success,
            data: result.data
        };
    }

    async getModerationCover(){
        let result = await this.sendRequest({
            route: 'api/user/get-moderation-cover',
            serviceHost: services.serviceUser,
            body: {},
            method: 'POST'
        });
        result.data = ApiWrapper.pathProcessor(result.data, true);
        return {
            success: result.success,
            data: result.data
        };
    }
    async getModerationCovered(){
        let result = await this.sendRequest({
            route: 'api/user/get-moderation-cover',
            serviceHost: services.serviceUser,
            body: {},
            method: 'POST'
        });
        result.data = ApiWrapper.pathProcessor(result.data, true);
        return {
            success: result.success,
            data: result.data
        };
    }
    async getModerationAcceptCover(){
        let result = await this.sendRequest({
            route: 'api/user/searchModerationAcceptCover',
            serviceHost: services.serviceUser,
            body: {},
            method: 'POST'
        });
        result.data = ApiWrapper.pathProcessor(result.data, true);
        return {
            success: result.success,
            data: result.data
        };
    }
    async getModerationCancelCover(){
        let result = await this.sendRequest({
            route: 'api/user/searchModerationCancelCover',
            serviceHost: services.serviceUser,
            body: {},
            method: 'POST'
        });
        result.data = ApiWrapper.pathProcessor(result.data, true);
        return {
            success: result.success,
            data: result.data
        };
    }

    async getModerationAvatars(){
        let result = await this.sendRequest({
            route: 'api/user/get-moderation-avatar',
            serviceHost: services.serviceUser,
            body: {},
            method: 'POST'
        });
        result.data = ApiWrapper.pathProcessor(result.data, true);
        return {
            success: result.success,
            data: result.data
        };
    }
    async getModerationAvatared(){
        let result = await this.sendRequest({
            route: 'api/user/get-moderation-avatar',
            serviceHost: services.serviceUser,
            body: {},
            method: 'POST'
        });
        result.data = ApiWrapper.pathProcessor(result.data, true);
        return {
            success: result.success,
            data: result.data
        };
    }
    async getModerationAcceptAvatar(){
        let result = await this.sendRequest({
            route: 'api/user/searchModerationAcceptAvatar',
            serviceHost: services.serviceUser,
            body: {},
            method: 'POST'
        });
        result.data = ApiWrapper.pathProcessor(result.data, true);
        return {
            success: result.success,
            data: result.data
        };
    }
    async getModerationCancelAvatar(){
        let result = await this.sendRequest({
            route: 'api/user/searchModerationCancelAvatar',
            serviceHost: services.serviceUser,
            body: {},
            method: 'POST'
        });
        result.data = ApiWrapper.pathProcessor(result.data, true);
        return {
            success: result.success,
            data: result.data
        };
    }

    async acceptAvatars(data){
        let result = await this.sendRequest({
            route: 'api/user/unbanAvatar',
            serviceHost: services.serviceUser,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }

    async cancelAvatars(data){
        let result = await this.sendRequest({
            route: 'api/user/banAvatar',
            serviceHost: services.serviceUser,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }

    async getModerationProducting(){
        let result = await this.sendRequest({
            route: 'api/user/get-moderation-product',
            serviceHost: services.serviceUser,
            body: {},
            method: 'POST'
        });
        result.data = ApiWrapper.pathProcessor(result.data, true);
        return {
            success: result.success,
            data: result.data
        };
    }

    async getModerationProducted(data){
        let result = await this.sendRequest({
            route: 'api/product/searchModerationProduct',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }
    async getModerationSubscriprioned(data){
        let result = await this.sendRequest({
            route: 'api/subscription/searchModerationSubscriptions',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }
    async getModerationAcceptProducted(data){
        let result = await this.sendRequest({
            route: 'api/product/searchModerationAcceptProduct',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }
    async getModerationCancelProducted(data){
        let result = await this.sendRequest({
            route: 'api/product/searchModerationCancelProduct',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }

    // async getModerationCover(data){
    //     let result = await this.sendRequest({
    //         route: 'api/product/searchModerationCover',
    //         serviceHost: services.serviceAuthor,
    //         body: {},
    //         method: 'POST'
    //     });
    //     return {
    //         success: result.success,
    //         data: result.data
    //     };
    // }

    async getModerationUsers(data){
        let result = await this.sendRequest({
            route: 'api/product/searchUsers',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }

   async getModerationProducts(data){
       let result = await this.sendRequest({
           route: 'api/product/searchProductsAdmin',
           serviceHost: services.serviceAuthor,
           body: data,
           method: 'POST'
       });
       return {
           success: result.success,
           data: result.data
       };
   }
    async getModerationProductsStatus(data){
        let result = await this.sendRequest({
            route: 'api/user/get-moderation-product',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }

   async acceptProduct(data){
       let result = await this.sendRequest({
           route: 'api/product/unbanProducts',
           serviceHost: services.serviceAuthor,
           body: data,
           method: 'POST'
       });
       return {
           success: result.success,
           data: result.data
       };
   }

    async cancelProduct(data){
        let result = await this.sendRequest({
            route: 'api/product/banProducts',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }
    async acceptSubscription(data){
        let result = await this.sendRequest({
            route: 'api/subscription/unbanSubscriptions',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }

    async cancelSubscription(data){
        let result = await this.sendRequest({
            route: 'api/subscription/banSubscriptions',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }
    async acceptCover(data){
        let result = await this.sendRequest({
            route: 'api/product/unbanCover',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }

    async cancelCover(data){
        let result = await this.sendRequest({
            route: 'api/product/banCover',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }

    async banUser(data){
        let result = await this.sendRequest({
            route: 'api/product/updateBanUser',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }


    async likeProduct(data){
        let result = await this.sendRequest({
            route: 'api/product/likeProduct',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }

    async repostProduct(data){
        let result = await this.sendRequest({
            route: 'api/product/repostProduct',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }

    async repostFavor(data){
        let result = await this.sendRequest({
            route: 'api/product/repostFavor',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }

    async commentProduct(data){
        let result = await this.sendRequest({
            route: 'api/product/addCommentWithProduct',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }
    async getCommentById(data){
        let result = await this.sendRequest({
            route: 'api/product/searchComments',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        result.data = ApiWrapper.pathProcessor(result.data);
        return   {
            success: result.success,
            data: result.data
        };
    }
    async getLikesById(data){
        let result = await this.sendRequest({
            route: 'api/product/searchLikes',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        result.data = ApiWrapper.pathProcessor(result.data);
        return   {
            success: result.success,
            data: result.data
        };
    }
    async getRepostById(data){
        let result = await this.sendRequest({
            route: 'api/product/searchRepost',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        result.data = ApiWrapper.pathProcessor(result.data);
        return   {
            success: result.success,
            data: result.data
        };
    }

    async getFavorById(data){
        let result = await this.sendRequest({
            route: 'api/product/searchFavor',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        result.data = ApiWrapper.pathProcessor(result.data);
        return   {
            success: result.success,
            data: result.data
        };
    }

    async getRepostWallById(data){
        let result = await this.sendRequest({
            route: 'api/product/searchWallRepost',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        result.data = ApiWrapper.pathProcessor(result.data);
        return   {
            success: result.success,
            data: result.data
        };
    }


    async likeSub(data){
        let result = await this.sendRequest({
            route: 'api/subscription/likeSubscription',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }

    async getLikesByIdSub(data){
        let result = await this.sendRequest({
            route: 'api/subscription/searchLikes',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        result.data = ApiWrapper.pathProcessor(result.data);
        return   {
            success: result.success,
            data: result.data
        };
    }

    async repostSub(data){
        let result = await this.sendRequest({
            route: 'api/subscription/repostSubscription',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }
    async getRepostByIdSub(data){
        let result = await this.sendRequest({
            route: 'api/subscription/searchRepost',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        result.data = ApiWrapper.pathProcessor(result.data);
        return   {
            success: result.success,
            data: result.data
        };
    }

    async getRepostWallByIdSub(data){
        let result = await this.sendRequest({
            route: 'api/subscription/searchWallRepost',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        result.data = ApiWrapper.pathProcessor(result.data);
        return   {
            success: result.success,
            data: result.data
        };
    }

    async repostFavorSub(data){
        let result = await this.sendRequest({
            route: 'api/subscription/repostFavor',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }
    async getFavorByIdSub(data){
        let result = await this.sendRequest({
            route: 'api/subscription/searchFavor',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        result.data = ApiWrapper.pathProcessor(result.data);
        return   {
            success: result.success,
            data: result.data
        };
    }

    async commentSub(data){
        let result = await this.sendRequest({
            route: 'api/subscription/addCommentWithSubscription',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }
    async getCommentByIdSub(data){
        let result = await this.sendRequest({
            route: 'api/subscription/searchComments',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        result.data = ApiWrapper.pathProcessor(result.data);
        return   {
            success: result.success,
            data: result.data
        };
    }







    async getModerationAvatarByUser(data){
        let result = await this.sendRequest({
            route: 'api/user/select-avatar-moder',
            serviceHost: services.serviceUser,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }

    async getModerationCoverByUser(data){
        let result = await this.sendRequest({
            route: 'api/user/select-cover-moder',
            serviceHost: services.serviceUser,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }

    async deleteAvatarByUser(data){
        let result = await this.sendRequest({
            route: 'api/user/delete-avatar-moder',
            serviceHost: services.serviceUser,
            body: data,
            method: 'DELETE'
        });
        return {
            success: result.success,
            data: result.data
        };
    }

    async deleteCoverByUser(data){
        let result = await this.sendRequest({
            route: 'api/user/delete-cover-moder',
            serviceHost: services.serviceUser,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }




    async getProductById(data){
        let result = await this.sendRequest({
            route: 'api/product/searchProductsByIds',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        result.data = ApiWrapper.pathProcessor(result.data);
        return   {
            success: result.success,
            data: result.data
        };
    }
    async getSubById(data){
        let result = await this.sendRequest({
            route: 'api/subscription/searchSubscriptionsByIds',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        result.data = ApiWrapper.pathProcessor(result.data);
        return   {
            success: result.success,
            data: result.data
        };
    }

    async getModerationAvatar(){
        let result = await this.sendRequest({
            route: 'api/user/get-all-moderation-avatar',
            serviceHost: services.serviceUser,
            body: {},
            method: 'POST'
        });
        result.data = ApiWrapper.pathProcessor(result.data, true);
        return {
            success: result.success,
            data: result.data
        };
    }

    async closeNotifications({notificationId}){
        let result = await this.sendRequest({
            route: 'api/user/closeNotification',
            serviceHost: services.serviceUser,
            body: {
                notification_id: notificationId
            },
            method: 'POST'
        });

        return {
            success: result.success,
            data: result.data
        };
    }

    async getUnreadNotification(){
        let result = await this.sendRequest({
            route: 'api/user/getUnreadNotifications',
            serviceHost: services.serviceUser,
            body: {},
            method: 'POST'
        });

        return {
            success: result.success,
            data: result.data
        };
    }
    async getNotifications(){
        let result = await this.sendRequest({
            route: 'api/user/getNotifications',
            serviceHost: services.serviceUser,
            body: {},
            method: 'POST'
        });

        return {
            success: result.success,
            data: result.data
        };
    }

    async findUnread(){
        let result = await this.sendRequest({
            route: 'api/message/notReadChats',
            serviceHost: services.serviceUser,
            body: {},
            method: 'POST'
        });

        return {
            success: result.success,
            data: result.data
        };
    }

    async getProduct(data){
        let result = await this.sendRequest({
            route: 'api/product/searchProductsByIds',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        })
        result.data = ApiWrapper.pathProcessor(result.data);
        return {
            success: result.success,
            data: result.data
        };
    }

    async readMessage({chatId, messageId}){
        let result = await this.sendRequest({
            route: 'api/message/readMessage',
            serviceHost: services.serviceUser,
            body: {
                chatId,
                messageId
            },
            method: 'POST'
        });

        return {
            success: result.success,
            data: result.data
        };
    }

    async sendMessage({chatId, message}){
        let result = await this.sendRequest({
            route: 'api/message/sendMessage',
            serviceHost: services.serviceUser,
            body: {
                chatId,
                text: message
            },
            method: 'POST'
        });

        return {
            success: result.success,
            data: result.data
        };
    }

    async getChatMessages({chatId}){
        let result = await this.sendRequest({
            route: 'api/message/chat',
            serviceHost: services.serviceUser,
            body: { chatId },
            method: 'POST'
        });

        //result.data = ApiWrapper.pathProcessor(result.data);

        for(let message of result.data){
            message.user = ApiWrapper.pathProcessor(message.user);
        }

        return {
            success: result.success,
            data: result.data
        };
    }
    async getAllChats(){
        let result = await this.sendRequest({
            route: 'api/message/chats',
            serviceHost: services.serviceUser,
            method: 'GET'
        });

        return {
            success: result.success,
            data: result.data
        };
    }

    async setSubdomain({subdomain}){
        let result = await this.sendRequest({
            route: 'api/user/updateSubdomain',
            serviceHost: services.serviceUser,
            body: { login: subdomain },
            method: 'POST'
        });

        return {
            success: result.success,
            data: result.data
        };
    }

    async becomeAuthor({login}) {
        let result = await this.sendRequest({
            route: 'api/user/becomeAuthor',
            serviceHost: services.serviceUser,
            body: {login},
            method: 'POST'
        })
        return {
            success: result.success,
            data: result.data
        };
    }

    async getYourOrders({period}) {
        let result = await this.sendRequest({
            route: 'api/order/getOrders',
            serviceHost: services.serviceUser,
            body: { period },
            method: 'POST'
        });

        return {
            success: result.success,
            data: result.data
        };
    }

    async confirmRegistration(data){
        let result = await this.sendRequest({
            route: 'api/user/confirmRegistration',
            serviceHost: services.serviceUser,
            body: data ,
            method: 'POST'
        });

        return {
            success: result.success,
            data: result.data
        };
    }

    async recoverPassword({email}){
        let result = await this.sendRequest({
            route: 'api/user/passwordRecovery',
            serviceHost: services.serviceUser,
            body: { email },
            method: 'POST'
        });

        return {
            success: result.success,
            data: result.data
        };
    }



    async registerUser({name, email, phone}){
        let result = await this.sendRequest({
            route: 'api/user/registration',
            serviceHost: services.serviceUser,
            body: {name, email, phone},
            method: 'POST'
        });

        return {
            success: result.success,
            data: result.data
        };
    }

    async getOrders({period, orderType}){
        let result = await this.sendRequest({
            route: 'api/order/getOrders',
            serviceHost: services.serviceUser,
            body: {period, orderType},
            method: 'POST'
        });


        return {
            success: result.success,
            data: result.data
        };
    }
    async writeComment({comment, postId}){
        let result = await this.sendRequest({
            route: 'api/post/addCommentWithPost',
            serviceHost: services.serviceAuthor,
            body: {comment, postId},
            method: 'POST'
        });


        return {
            success: result.success,
            data: result.data
        };
    }
    async updateSubscription({subscription}){

        let result = await this.sendRequest({
            route: 'api/subscription/updateSubscription',
            serviceHost: services.serviceAuthor,
            body: subscription,
            method: 'POST'
        });


        return {
            success: result.success,
            data: result.data
        };
    }

    async searchSubscriptions({authorId, subscriptionId}){
        let searchObject = {};

        if(authorId){
            searchObject.author_id = authorId;
        }
        if(subscriptionId){
            searchObject.id = subscriptionId;
        }

        let result = await this.sendRequest({
            route: 'api/subscription/searchSubscriptions',
            serviceHost: services.serviceAuthor,
            body: searchObject,
            method: 'POST'
        });

        result.data = ApiWrapper.pathProcessor(result.data);

        return {
            success: result.success,
            data: result.data
        };
    }
    async placeLike({postId}){
        let result = await this.sendRequest({
            route: 'api/post/likePost',
            serviceHost: services.serviceAuthor,
            body: {
                postId
            },
            method: 'POST'
        });


        return {
            success: result.success,
            data: result.data
        };
    }

    async getPosts({authorId, postId}){

        let searchObject = {};

        if(authorId){
            searchObject.authorId = authorId;
        }
        if(postId){
            searchObject.id = postId;
        }

        let result = await this.sendRequest({
            route: 'api/post/searchPosts',
            serviceHost: services.serviceAuthor,
            body: searchObject,
            method: 'POST'
        });


        return {
            success: result.data.success,
            data: result.data
        };
    }

    async createOrder(type, targetId){
        let result = await this.sendRequest({
            route: 'api/order/createOrder',
            serviceHost: services.serviceUser,
            body: {
                type, targetId
            },
            method: 'POST'
        });


        return {
            success: result.data.success,
            data: result.data
        };
    }

    async getProducts({authorId, productId}) {

        let searchObject = {};

        if(authorId){
            searchObject.author_id = authorId;
        }
        if(productId){
            searchObject.id = productId;
        }

        let result = await this.sendRequest({
            route: 'api/product/searchProducts',
            serviceHost: services.serviceAuthor,
            body: searchObject,
            method: 'POST'
        });

        result.data = ApiWrapper.pathProcessor(result.data);
        return {
            success: result.data.success,
            data: result.data
        };
    }

    async getProducts({authorId, productId}) {

        let searchObject = {};

        if(authorId){
            searchObject.author_id = authorId;
        }
        if(productId){
            searchObject.id = productId;
        }

        let result = await this.sendRequest({
            route: 'api/product/searchProducts',
            serviceHost: services.serviceAuthor,
            body: searchObject,
            method: 'POST'
        });

        result.data = ApiWrapper.pathProcessor(result.data);
        return {
            success: result.data.success,
            data: result.data
        };
    }


    async createProduct(product){
        const toast = useToast();
        let result;
        const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"))
        const token = cookieObj.get("token");
        await axios.post(`${services.serviceAuthor}/api/product/createProduct`, product,  {
            headers: {
                'Authorization': `Bearer ${token}`,
            }

        }).then(answer => {
            toast('Товар успешно добавлен', {position: POSITION.BOTTOM_RIGHT, type: TYPE.SUCCESS})
            result = answer.data;

        })
            .catch(err => {
                toast('Не все данные введены корректно', {position: POSITION.BOTTOM_RIGHT, type: TYPE.ERROR})
                console.log(err);
            })
        return {
            success: true,
            data: result
        };
    }
    async createSubscription(subscription){
        const toast = useToast();
        let result;
        const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"))
        const token = cookieObj.get("token");
        await axios.post(`${services.serviceAuthor}/api/subscription/createSubscription`, subscription,  {
            headers: {
                'Authorization': `Bearer ${token}`,
            }

        }).then(answer => {
            toast('Подписка успешно добавлена', {position: POSITION.BOTTOM_RIGHT, type: TYPE.SUCCESS})
            result = answer.data;

        })
            .catch(err => {
                toast('Не все данные введены корректно', {position: POSITION.BOTTOM_RIGHT, type: TYPE.ERROR})
                console.log(err);
            })
        return {
            success: true,
            data: result
        };
    }

    async updateProduct(product){
        const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"))
        const token = cookieObj.get("token");
        let result = await axios.post(`${services.serviceAuthor}/api/product/updateProduct`,product, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return {
            success: true,
            data: result
        };
    }

    async updateSubscription(subscription){
        const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"))
        const token = cookieObj.get("token");
        let result = await axios.post(`${services.serviceAuthor}/api/subscription/updateSubscription`,subscription, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return {
            success: true,
            data: result
        };
    }




    async updateActive(body){
        const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"))
        const token = cookieObj.get("token");
        await axios.post(`${services.serviceAuthor}/api/product/updateActive`, body, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
    }

    async deleteProduct(data){
        const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"))
        const token = cookieObj.get("token");
        await axios.post(`${services.serviceAuthor}/api/product/deleteProduct`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
    }

    async deleteSubscription(data){
        const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"))
        const token = cookieObj.get("token");
        await axios.post(`${services.serviceAuthor}/api/subscription/deleteSubscriptionForAdmin`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
    }

    async updateProductComments(data){
        const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"))
        const token = cookieObj.get("token");
        await axios.post(`${services.serviceAuthor}/api/product/updateProductComments`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
    }

    async updateSubscriptionComments(data){
        const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"))
        const token = cookieObj.get("token");
        await axios.post(`${services.serviceAuthor}/api/subscription/updateSubscriptionComments`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
    }



    async deleteAvatar(){
        let result = await this.sendRequest({
            route: 'api/user/delete-avatar',
            serviceHost: services.serviceUser,
            method: 'DELETE'
        });
    }

    async deleteAvatarModeration(){
        let result = await this.sendRequest({
            route: 'api/user/delete-avatar-moder',
            serviceHost: services.serviceUser,
            method: 'DELETE'
        });
    }


    async deleteCoverModeration(){
        let result = await this.sendRequest({
            route: 'api/user/delete-cover-moder',
            serviceHost: services.serviceUser,
            method: 'DELETE'
        });
    }




    async updateCover(body){
        const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"))
        const token = cookieObj.get("token");
        await axios.post(`${services.serviceUser}/api/user/update-profile-cover`, body, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
    }
    async updateAvatar(body){
        const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"))
        const token = cookieObj.get("token");
        await axios.post(`${services.serviceUser}/api/user/update-profile-avatar`, body, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        // let result = await this.sendRequest({
        //     route: 'api/user/update-profile-avatar',
        //     serviceHost: services.serviceUser,
        //     body: body,
        //     method: 'POST',
        //     type: true,
        // });
    }
    async getModerCover(data){
        //get-all-moderation-cover
        let result = await this.sendRequest({
            route: 'api/user/get-all-moderation-cover-status',
            serviceHost: services.serviceUser,
            body: data,
            method: 'POST'
        });

        result.data = ApiWrapper.pathProcessor(result.data, true);
        return {
            success: result.data.success,
            data: result.data
        };
    }

    async getModerationCoveredAdmin(data){
        let result = await this.sendRequest({
            route: 'api/user/searchCoversByIds',
            serviceHost: services.serviceUser,
            body: data,
            method: 'POST'
        });

        result.data = ApiWrapper.pathProcessor(result.data, true);
        return {
            success: result.data.success,
            data: result.data
        };
    }
    async getModerationAvatarAdmin(data){
        let result = await this.sendRequest({
            route: 'api/user/searchAvatarsByIds',
            serviceHost: services.serviceUser,
            body: data,
            method: 'POST'
        });

        result.data = ApiWrapper.pathProcessor(result.data, true);
        return {
            success: result.data.success,
            data: result.data
        };
    }

    // async cancelCover(body){
    //     const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"))
    //     const token = cookieObj.get("token");
    //     await axios.post(`${services.serviceUser}/api/user/cancel-profile-cover`, body, {
    //         headers: {
    //             'Authorization': `Bearer ${token}`,
    //         }
    //     });
    // }

    async cancelAvatar(data){
        const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"))
        const token = cookieObj.get("token");
        await axios.post(`${services.serviceUser}/api/user/moderation-avatar-status-cancel`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
    }

    async acceptAvatar(data){
        const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"))
        const token = cookieObj.get("token");
        await axios.post(`${services.serviceUser}/api/user/moderation-avatar-status-accept`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
    }


    async cancelPicture(data){
        const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"))
        const token = cookieObj.get("token");
        await axios.post(`${services.serviceUser}/api/user/moderation-avatar-picture-cancel`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
    }

    async acceptPicture(data){
        const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"))
        const token = cookieObj.get("token");
        await axios.post(`${services.serviceUser}/api/user/moderation-avatar-picture-accept`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
    }

    // async requestUpdateCover(data){
    //     //get-all-moderation-cover
    //     let result = await this.sendRequest({
    //         route: 'api/user/request-moderation-profile-cover',
    //         serviceHost: services.serviceUser,
    //         body: data,
    //         method: 'POST'
    //     });
    //     result.data = ApiWrapper.pathProcessor(result.data, true);
    //     return {
    //         success: result.data.success,
    //         data: result.data
    //     };
    // }



    async requestUpdateCover(data){
        const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"))
        const token = cookieObj.get("token");
        return axios.post(`${services.serviceUser}/api/user/request-moderation-profile-cover`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
    }
    // async requestUpdateCover(data){
    //     const toast = useToast();
    //     let result;
    //     const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"))
    //     const token = cookieObj.get("token");
    //     await axios.post(`${services.serviceUser}/api/user/request-moderation-profile-cover`, data, {
    //         headers: {
    //             'Authorization': `Bearer ${token}`,
    //             'Content-Type': 'multipart/form-data',
    //         },
    //     }).then(answer => {
    //         toast('Подписка успешно добавлена', {position: POSITION.BOTTOM_RIGHT, type: TYPE.SUCCESS})
    //         result = answer.data;
    //
    //     })
    //         .catch(err => {
    //             toast('Не все данные введены корректно', {position: POSITION.BOTTOM_RIGHT, type: TYPE.ERROR})
    //             console.log(err);
    //         })
    //     return {
    //         success: true,
    //         data: result
    //     };
    // }
    // async requestUpdateCover(body){
    //     const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"))
    //     const token = cookieObj.get("token");
    //     let result = await axios.post(`${services.serviceUser}/api/user/update-profile-cover`, body, {
    //         headers: {
    //             'Authorization': `Bearer ${token}`,
    //         }
    //     });
    //     // let result = await this.sendRequest({
    //     //     route: 'api/user/update-profile-avatar',
    //     //     serviceHost: services.serviceUser,
    //     //     body: body,
    //     //     method: 'POST',
    //     //     type: true,
    //     // });
    //     return {
    //         success: true,
    //         data: result.data.data
    //
    //     }
    // }

    async getModerAvatar(body){
        //get-all-moderation-cover
        let result = await this.sendRequest({
            route: 'api/user/get-all-moderation-avatar-status',
            serviceHost: services.serviceUser,
            body: body,
            method: 'POST'
        });
        result.data = ApiWrapper.pathProcessor(result.data, true);
        return {
            success: result.data.success,
            data: result.data
        };
    }

    // async cancelAvatar(body){
    //     await axios.post(`${services.serviceUser}/api/user/cancel-profile-avatar`, body, {
    //         headers: {
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //         }
    //     });
    //
    // }

    async requestUpdateAvatar(data){
        const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"))
        const token = cookieObj.get("token");
        return axios.post(`${services.serviceUser}/api/user/request-moderation-profile-avatar`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        });
        // let result = await this.sendRequest({
        //     route: 'api/user/update-profile-avatar',
        //     serviceHost: services.serviceUser,
        //     body: body,
        //     method: 'POST',
        //     type: true,
        // });
        // return {
        //     success: true,
        //     data: result.data.data
        //
        // }
    }

    // async requestUpdateAvatar(body){
    //     const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"))
    //     const token = cookieObj.get("token");
    //     let result = await axios.post(`${services.serviceUser}/api/user/update-profile-avatar`, body, {
    //         headers: {
    //             'Authorization': `Bearer ${token}`,
    //         }
    //     });
    //     // let result = await this.sendRequest({
    //     //     route: 'api/user/update-profile-avatar',
    //     //     serviceHost: services.serviceUser,
    //     //     body: body,
    //     //     method: 'POST',
    //     //     type: true,
    //     // });
    //     return {
    //         success: true,
    //         data: result.data.data
    //
    //     }
    // }

    async deleteCover(){
        let result = await this.sendRequest({
            route: 'api/user/delete-cover',
            serviceHost: services.serviceUser,
            method: 'DELETE'
        });
    }





    async uploadFile(file){
        let data = new FormData();
        data.append('files', file, file.name);
        const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"))
        const token = cookieObj.get("token");

        let response = await fetch(`${services.serviceStorage}/api/storage/upload`, {
            body: data,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            method: 'POST'
        });

        let body = await response.json();

        return {
            success: body.success,
            data: body.data
        }
    }

    async getProducts({authorId, productId}) {

        let searchObject = {};

        if(authorId){
            searchObject.author_id = authorId;
        }
        if(productId){
            searchObject.id = productId;
        }

        let result = await this.sendRequest({
            route: 'api/product/searchProducts',
            serviceHost: services.serviceAuthor,
            body: searchObject,
            method: 'POST'
        });

        result.data = ApiWrapper.pathProcessor(result.data);
        return {
            success: result.data.success,
            data: result.data
        };
    }

    async getProfile({login, id}) {

        let result = await this.sendRequest({
            route: 'api/user/getProfile',
            serviceHost: services.serviceUser,
            body: {
                login: login,
                id: id
            },
            method: 'POST'
        });

        // let data = ApiWrapper.pathProcessor(result.data);


        return {
            success: result.success,
            data: result.data
        };
    }


    async login(email, password) {
        let result = await this.sendRequest({
            route: 'api/user/auth',
            serviceHost: services.serviceUser,
            body: {
                email,
                password
            },
            method: 'POST'
        });

        localStorage.setItem('token', result.data);
        return result;
    }


    async whoami() {
        let result = await this.sendRequest({
            route: 'api/user/whoami',
            serviceHost: services.serviceUser,
            body: {},
            method: 'POST',
            // authorize: true
        });


        if (result.success === false) {
            store.default.commit('setAuthorized', false);
        }

        result.data = ApiWrapper.pathProcessor(result.data);

        store.default.commit('setAuthorizedProfile', result.data);
        return result;
    }


    async sendRequest(object) {

        const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"))
        const token = cookieObj.get("token");

        let {route, body, authorize = false, serviceHost, method, type = false} = object;
        let response = await fetch(`${serviceHost}/${route}`, {
            body: type ? body : JSON.stringify(body),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json',
            },
            method: method
        });


        let data = await response.json();

        if (!response.ok) {
            if(response.status !== 401 && response.status !== 400){
                // const toast = useToast();
                // toast(data.error.name, {position: POSITION.BOTTOM_RIGHT, type: TYPE.ERROR});
            }
            return {
                success: false,
                data: data
            }
        }

        return {
            success: true,
            data: data.data
        }


    }

    async updateProfilePictureMiniature(body){
        let result = await this.sendRequest({
            route: 'api/user/updateProfilePictureMiniature',
            serviceHost: services.serviceUser,
            body: body,
            method: 'POST',
            authorize: true
        });

        return result;
    }

    async updateCoverPictureMiniature(body){
        let result = await this.sendRequest({
            route: 'api/user/updateCoverMiniature',
            serviceHost: services.serviceUser,
            body: body,
            method: 'POST',
            authorize: true
        });

        return result;
    }

    // TODO: переписать
    static pathProcessor(data, type = false) {
        if (Array.isArray(data)) {
            for (let element of data) {
                for (let key in element) {
                    if (key.includes('_path') && element[key]) {
                        if (!element[key].includes('://')) {
                            //Перепишем
                            //element[key] = `${services.serviceStorage}/api/storage/getFile/${element[key]}`;
                            type ? element[key] = `${services.serviceUser}/${element[key]}` :  element[key] = `${services.serviceAuthor}/${element[key]}` ;

                        }
                    }
                }
            }

        } else {
            for (let key in data) {
                if (key.includes('_path') && data[key]) {
                    if (!data[key].includes('://')) {
                        //Перепишем
                        //data[key] = `${services.serviceStorage}/api/storage/getFile/${data[key]}`;
                        data[key] = `${services.serviceUser}/${data[key]}`;

                    }
                }
            }
        }

        return data;


    }

    OrderTypes = {
        Product: 1,
        Subscription: 2,
        PostPurchase: 3,
    };

    services = services;

}

module.exports = new ApiWrapper();
