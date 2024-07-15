const Validator = require('../helpers/validator');
const CONSTANTS = require('../Constants');

const { SubscriptionNotFound, InsufficientPermission, UserIsBanned, TargetNotFound, SubscribedUserNotFound,
    NotAuthorThisTarget,
    TargetBanned,
    ReferralTargetExists, ReferralTargetNotActive, ReferralTargetNotFound, AuthorThisReferralTarget, CanNotAddComments
} = require("../Errors");
const createRandomString = require("../helpers/createRandomString");
const uuid = require("uuid");
const path = require("path");

class Subscription {

    _subscriptionStorage;
    _serviceUser;
    _serviceMail;
    _referralStorage;
    _commentsStorage;
    _likesStorage;

    constructor(subscriptionStorage, serviceUser, serviceMail, referralStorage, commentsStorage, likesStorage) {
        this._subscriptionStorage = subscriptionStorage;
        this._serviceUser = serviceUser;
        this._serviceMail = serviceMail;
        this._referralStorage = referralStorage;
        this._commentsStorage = commentsStorage;
        this._likesStorage = likesStorage;
    }

    async createSubscription(data, headers, user, fl){

        const validator = new Validator();

        validator.setRule('title', Validator.TYPES.string().required());
        validator.setRule('description', Validator.TYPES.string());
        validator.setRule('price', Validator.TYPES.number().required());
        validator.setRule('discount_price', Validator.TYPES.number());
        validator.setRule('name_user', Validator.TYPES.string());
        validator.setRule('number_user', Validator.TYPES.string());
        validator.setRule('email_user', Validator.TYPES.string());
        validator.setRule('author_id', Validator.TYPES.number());

        validator.validate(data);
        const {image} = fl;
        let fileName = uuid.v4() + ".jpg";
        image.mv(path.resolve(__dirname, '../', '..','static', fileName));
        data.subscription_image_path = fileName;

        const id = await this._subscriptionStorage.createNewSubscription(data, user);

        return {id: id};
    }


    async updateSubscription(data, headers, user, fl){

        const validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());
        validator.setRule('title', Validator.TYPES.string());
        validator.setRule('description', Validator.TYPES.string());
        validator.setRule('discount_price', Validator.TYPES.number());
        validator.setRule('price', Validator.TYPES.number());

        validator.validate(data);
        const {image} = fl;
        let fileName = uuid.v4() + ".jpg";
        image.mv(path.resolve(__dirname, '../', '..','static', fileName));
        data.subscription_image_path = fileName;


        let [subscription] = await this._subscriptionStorage.searchSubscriptions({
            id: data.id
        });

        if(!subscription){
            throw new SubscriptionNotFound("Subscription by this ID is not found");
        }

        // if(subscription.author_id !== user.userId){
        //     throw new InsufficientPermission("You are not the author of this subscription");
        // }

        return await this._subscriptionStorage.updateSubscription(data);
    }

    async searchSubscriptions(data, headers, user) {

        const validator = new Validator();

        validator.setRule('id', Validator.TYPES.number());
        validator.setRule('author_id', Validator.TYPES.number());

        validator.validate(data);

        let whereObject = {};

        if(data.id){
            whereObject.id = data.id;
        }
        if(data.author_id){
            whereObject.author_id = data.author_id;
        }

        const subscriptions = await this._subscriptionStorage.searchSubscriptions({...whereObject, active: CONSTANTS.Subscriptions.Published});

        for (let subscription of subscriptions){
            if(subscription.active === CONSTANTS.Subscriptions.UserBanned){
                subscription.banned = true
            } else {
                subscription.banned = false
            }
        }

        const arrayReferralIds = subscriptions.map(elem => {return [elem.id, CONSTANTS.ReferralTargetType.Subscription]});
        const searchReferralSubscriptions = await this._referralStorage.searchReferralTargetsByIds(arrayReferralIds)

        const arrayCommentsIds = subscriptions.map(elem => {return [elem.id, CONSTANTS.CommentType.Subscription]});
        const comments = await this._commentsStorage.searchCommentsByIds(arrayCommentsIds)

        // let usersLikes
        // const likes = await this._likesStorage.searchLikesByIds(arrayCommentsIds);
        // if(likes){
        //     usersLikes = await this._serviceUser.findUsersByIds(likes.map(like => like.user_id));
        // }

        for (let subscription of subscriptions){
            const referralIndex = searchReferralSubscriptions.findIndex(x => x.target_id === subscription.id);

            if(referralIndex || referralIndex === 0){
                subscription.referral = searchReferralSubscriptions[referralIndex];
            }

            subscription.comments = []
            if(subscription.comment_resolution === CONSTANTS.CommentResolution.Allow){
                for(let comment of comments.reverse()){
                    if(comment.target_id === subscription.id){
                        if(comment.status === CONSTANTS.CommentStatus.Active){
                            subscription.comments.push(comment);
                        }
                    }
                }
            } else {
                subscription.comments = 'автор запретил оставлять коментарии к данной подписки'
            }

            // subscription.likes = []
            // if(likes){
            //     for(let like of likes.reverse()){
            //         if(like.target_id === subscription.id && like.status === CONSTANTS.LikeStatus.Active){
            //             const userLikeSubscription = usersLikes.find(user => user.id === like.user_id);
            //
            //             if(userLikeSubscription){
            //                 const [profilePicture] = await this._serviceUser.searchProfilePicture({id: userLikeSubscription.profile_picture_id});
            //
            //                 like.user = {
            //                     profile_path: profilePicture.picture_path,
            //                     name: userLikeSubscription.name,
            //                     login: userLikeSubscription.login || null
            //                 }
            //             }
            //
            //             subscription.likes.push(like)
            //         }
            //     }
            // }

        }

        return subscriptions
    }

    async searchSubscriptionsByIds(data) {
        const validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());
        validator.validate(data);

        return await this._subscriptionStorage.searchSubscriptionsByIds(data);
    }

    async deleteSubscription(data, headers, user){

        let validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());

        validator.validate(data);

        let [subscription] = await this._subscriptionStorage.searchSubscriptions({
            id: data.id
        });

        if(!subscription){
            throw new SubscriptionNotFound("Subscription by this ID is not found");
        }

        if(user.role !== CONSTANTS.ROLE_ADMIN){
            if(subscription.author_id !== user.userId){
                throw new InsufficientPermission("You are not the author of this subscription");
            }
        }

        return await this._subscriptionStorage.deleteSubscription(data.id);
    }

    async likeSubscription(data, headers, user){
        const validator = new Validator();

        validator.setRule('subscriptionId', Validator.TYPES.number().required());
        validator.setRule('userId', Validator.TYPES.number().required());

        validator.validate(data);

        const [subscription] = await this._subscriptionStorage.searchSubscriptions({id: data.subscriptionId});

        if(!subscription){
            throw new TargetNotFound('Subscription by this ID is not found')
        }

        const [like] = await this._likesStorage.searchLikes({
            type: CONSTANTS.LikeType.Subscription,
            target_id: subscription.id,
            user_id: data.user_id
        });

        if(like){
            if(like.status === CONSTANTS.LikeStatus.Active){
                await this._likesStorage.updateLike({id: like.id}, {status: CONSTANTS.LikeStatus.Delete});

                await this._serviceUser.serviceDeleteFavorite({
                    target_id: subscription.id,
                    target_type: CONSTANTS.TargetType.Subscription,
                    user_id: user.userId,
                });

                return true;
            } else if(like.status === CONSTANTS.LikeStatus.Delete){
                await this._likesStorage.updateLike({id: like.id}, {status: CONSTANTS.LikeStatus.Active});
            }
        } else {
            await this._likesStorage.addLike({
                type: CONSTANTS.LikeType.Subscription,
                target_id: subscription.id,
                user_id: user.userId,
                status: CONSTANTS.LikeStatus.Active
            });
        }

        await this._serviceUser.addFavorites({
            type: CONSTANTS.FavoriteType.Likes,
            target_type: CONSTANTS.TargetType.Subscription,
            target_id: subscription.id
        }, headers);

        return true
    }

    async addCommentWithSubscription(data, headers, user){
        const validator = new Validator();

        validator.setRule('comment', Validator.TYPES.string().min(5).required());
        validator.setRule('subscriptionId', Validator.TYPES.number().required());

        validator.validate(data);

        const [subscription] = await this._subscriptionStorage.searchSubscriptions({id: data.subscriptionId});

        if(!subscription){
            throw new TargetNotFound('Post by this ID is not found')
        }

        if(subscription.comment_resolution === CONSTANTS.CommentResolution.Ban){
            throw new CanNotAddComments();
        }

        await this._commentsStorage.addComment({
            type: CONSTANTS.CommentType.Subscription,
            status: CONSTANTS.CommentStatus.Created,
            target_id: data.subscriptionId,
            user_id: user.userId,
            comment: data.comment
        });

        await this._serviceUser.addFavorites({
            type: CONSTANTS.FavoriteType.Comments,
            target_type: CONSTANTS.TargetType.Subscription,
            target_id: subscription.id
        }, headers);

        return true;
    }

    async mySubscriptionPurchase(data){
        const validator = new Validator();

        validator.setRule('userId', Validator.TYPES.number().required());

        validator.validate(data)

        const myPurchaseSubscription = await this._subscriptionStorage.searchSubscriptionsUser({
            subscriber_id: data.userId,
            active: CONSTANTS.SubscribedUser.Active
        });

        const subscriptionsIds = []

        for(let purchaseSub of myPurchaseSubscription){
            if(purchaseSub.created_at > purchaseSub.active_until){
                myPurchaseSubscription.splice(myPurchaseSubscription.findIndex(elem => elem.id === purchaseSub.id), 1)
            } else {
                subscriptionsIds.push(purchaseSub.subscription_id)
            }
        }

        return await this._subscriptionStorage.searchSubscriptionsByIds(subscriptionsIds)
    }

    async unsubscribe(data, headers, user){
        const validator = new Validator();

        validator.setRule('subscriptionId', Validator.TYPES.number().required());

        validator.validate(data);
        user.userId = 53
        const [searchSubscribed] = await this._subscriptionStorage.searchSubscriptionsUser({
            subscription_id: data.subscriptionId,
            subscriber_id: user.userId,
            active: CONSTANTS.SubscribedUser.Active
        });

        if(!searchSubscribed){
            throw new SubscribedUserNotFound();
        }

        const [subscription] = await this._subscriptionStorage.searchSubscriptions({
            id: searchSubscribed.subscription_id
        })

        if(!subscription){
            throw new SubscriptionNotFound()
        }

        await this._subscriptionStorage.unsubscribeUser({id: searchSubscribed.id}, {
            active: CONSTANTS.SubscribedUser.NotActive
        });

        const [author] = await this._serviceUser.findUser({id: subscription.author_id})

        // TODO: сделать отправку сообщения автору о том что от него отписались ( на почту ) , ( в сообщения ) , ( в уведомления )

        delete user.password;

        await this._serviceMail.sendMailUnsubscribe({
            user: user,
            author: author,
            subscription: subscription
        })

        await this._serviceUser.sendMessageSupportNeearby({
            message: `Пользователь ${user.name} отписался от подписки ${subscription.title}`,
            userId: author.id
        }, headers)

        return true
    }

    async addSubscriptionInReferralSystem(data, headers, user){
        const validator = new Validator();

        validator.setRule('targetId', Validator.TYPES.number().required());
        validator.setRule('referral_levels', Validator.TYPES.object().required());

        validator.validate(data);

        let [target] = await this.searchSubscriptions({id: data.targetId}, headers, user);

        if(!target){
            throw new TargetNotFound()
        }

        if(target.author_id !== user.userId){
            throw new NotAuthorThisTarget();
        }

        if(target.banned){
            throw TargetBanned()
        }

        const [searchReferral] = await this._referralStorage.searchReferralTargets({
            type: CONSTANTS.ReferralTargetType.Subscription,
            target_id: data.targetId
        });

        if(searchReferral){
            if(searchReferral.active === CONSTANTS.ReferralActive.NotActive){
                await this._referralStorage.updateReferralTargets({id: searchReferral.id},{
                    referral_levels: JSON.stringify(data.referral_levels),
                    active: CONSTANTS.ReferralActive.Active
                })
                return true
            } else {
                throw new ReferralTargetExists('Referral subscription already exists');
            }
        }

        data.type = CONSTANTS.ReferralTargetType.Subscription;

        await this._referralStorage.addTargetInReferralSystem(data)

        return true;
    }

    async updateReferralSubscription(data, headers, user){
        const validator = new Validator();

        validator.setRule('referralId', Validator.TYPES.number().required());
        validator.setRule('referral_levels', Validator.TYPES.object().required());

        validator.validate(data);

        const [searchReferral] = await this._referralStorage.searchReferralTargets({
            id: data.referralId,
            type: CONSTANTS.ReferralTargetType.Subscription
        })

        if(searchReferral){
            if(searchReferral.active === CONSTANTS.ReferralActive.NotActive){
                throw new ReferralTargetNotActive();
            }
        } else {
            throw new ReferralTargetNotFound('Referral subscription not found');
        }

        const [target] = await this.searchSubscriptions({id: searchReferral.target_id, author_id: user.userId}, headers, user);
        console.log(target)
        if(target.author_id !== user.userId){
            throw new NotAuthorThisTarget();
        }

        await this._referralStorage.updateReferralTargets({id: searchReferral.id}, {
            referral_levels: JSON.stringify(data.referral_levels)
        })

        return true;
    }

    async deleteReferralSubscription(data, headers, user){
        const validator = new Validator();

        validator.setRule('referralId', Validator.TYPES.number().required());

        validator.validate(data);

        const [searchReferral] = await this._referralStorage.searchReferralTargets({id: data.referralId, type: CONSTANTS.ReferralTargetType.Subscription});

        if(!searchReferral){
            throw new ReferralTargetNotFound('Referral subscription not found');
        }

        const [target] = await this.searchSubscriptions({id: searchReferral.target_id, author_id: user.userId}, headers, user);

        if(target.author_id !== user.userId){
            throw new NotAuthorThisTarget();
        }

        await this._referralStorage.deleteReferralTarget(searchReferral.id);

        return true;

    }

    async addUserInReferralSubscription(data, headers, user) {
        const validator = new Validator();

        validator.setRule('referralId', Validator.TYPES.number().required());

        validator.validate(data);

        // TODO: если передают refKey то это означает что этот пользователь будет брать уровень 1, а автор 2

        const [searchReferralTarget] = await this._referralStorage.searchReferralTargets({
            type: CONSTANTS.ReferralTargetType.Subscription,
            id: data.referralId
        });

        if (!searchReferralTarget) {
            throw new ReferralTargetNotFound('Referral subscription not found');
        }

        if (searchReferralTarget.active === CONSTANTS.ReferralActive.NotActive) {
            throw new ReferralTargetNotActive()
        }

        const [target] = await this.searchSubscriptions({id: searchReferralTarget.target_id, author_id: user.userId}, headers, user);

        if (!target) {
            throw new TargetNotFound();
        }

        if (target.banned) {
            throw new TargetBanned();
        }

        if(target.author_id === user.userId){
            throw new AuthorThisReferralTarget('You are the author of this referral subscription');
        }

        data.level = 1;
        data.userId = user.userId;
        data.refKey = createRandomString(10);

        await this._referralStorage.createReferralUser(data);

        return true

    }

    async mySubscriptionsForEditing(data, headers, user){ // ваши подписки которые админ отправил назад для редактирования
        return await this._subscriptionStorage.searchSubscriptions({author_id: user.userId, active: CONSTANTS.Subscriptions.Editing})
    }

    async searchModerationSubscriptions(data){
        return await this._subscriptionStorage.searchSubscriptionsAdmin({active: data.active});
    }

    async updateSubscriptionPosition(data, headers, user){
        let validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());
        validator.setRule('delete_reason', Validator.TYPES.number());

        validator.validate(data);

        // Проверка на владельца
        let [product] = await this._subscriptionStorage.searchSubscriptions({
            id: data.id
        });

        if(!product){
            throw new TargetNotFound("Product by this ID is not found");
        }

        // if(product.author_id !== user.userId){
        //     throw new InsufficientPermission("You are not the author of this product");
        // }

        return await this._subscriptionStorage.updateSubscriptionsPosition(data);
    }

    async updateSubscriptionComments(data, headers, user){
        let validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());
        validator.setRule('comment_resolution', Validator.TYPES.number());

        validator.validate(data);

        // Проверка на владельца
        let [product] = await this._subscriptionStorage.searchSubscriptions({
            id: data.id
        });

        if(!product){
            throw new TargetNotFound("Product by this ID is not found");
        }

        // if(product.author_id !== user.userId){
        //     throw new InsufficientPermission("You are not the author of this product");
        // }

        return await this._subscriptionStorage.updateSubscriptionsComments(data);
    }

    async likeSubscriptions(data, headers, user){
        const validator = new Validator();

        validator.setRule('subscriptionId', Validator.TYPES.number().required());
        validator.setRule('img', Validator.TYPES.string().required());
        validator.setRule('name', Validator.TYPES.string().required());
        validator.setRule('user_id', Validator.TYPES.number().required());
        validator.validate(data);

        const [subscription] = await this._subscriptionStorage.searchSubscriptions({id: data.subscriptionId});

        if(!subscription){
            throw new TargetNotFound('Sub by this ID is not found')
        }

        const [like] = await this._likesStorage.searchLikes({
            type: CONSTANTS.LikeType.Subscription,
            target_id: subscription.id,
            status: CONSTANTS.LikeStatus.Active,
            user_id: data.user_id
        });

        if(like){
            if(like.status === CONSTANTS.LikeStatus.Active){
                await this._likesStorage.updateLike({id: like.id}, {status: CONSTANTS.LikeStatus.Delete});

                // await this._userService.serviceDeleteFavorite({
                //     target_id: product.id,
                //     target_type: CONSTANTS.TargetType.Product,
                //     user_id: 186,
                // });

                return like;
            } else if(like.status === CONSTANTS.LikeStatus.Delete){
                await this._likesStorage.updateLike({id: like.id}, {status: CONSTANTS.LikeStatus.Active});
            }
        } else {
            await this._likesStorage.addLike({
                type: CONSTANTS.LikeType.Subscription,
                target_id: subscription.id,
                name: data.name,
                user_id: data.user_id,
                img: data.img,
                status: CONSTANTS.LikeStatus.Active
            });
        }

        // await this._userService.addFavorites({
        //     type: CONSTANTS.FavoriteType.Likes,
        //     target_type: CONSTANTS.TargetType.Product,
        //     target_id: product.id
        // }, headers);

        return like
    }

    async searchLikes(data){
        const validator = new Validator();
        validator.setRule('target_id', Validator.TYPES.number().required());
        validator.setRule('status', Validator.TYPES.number().required());
        validator.validate(data);
        return await this._likesStorage.searchLikes(data);
    }

    async repostSubscription(data, headers, user) {
        const validator = new Validator();

        validator.setRule('target_type', Validator.TYPES.number().required());
        validator.setRule('target_id', Validator.TYPES.number().required());
        validator.setRule('user_id', Validator.TYPES.number().required());
        validator.setRule('imgUser', Validator.TYPES.string().required());
        validator.setRule('name', Validator.TYPES.string().required());
        validator.setRule('imgProduct', Validator.TYPES.string().required());

        validator.validate(data);

        // data.user_id = 188;
        data.type = CONSTANTS.RepostType.Wall;
        data.active = CONSTANTS.RepostActive.Active;

        let target;

        switch (data.target_type) {
            // case CONSTANTS.TargetType.Post:
            //     [target] = await this._productStorage.searchRepost({id: data.target_id}, headers);
            //     break;
            case CONSTANTS.TargetType.Product:
                const [target] = await this._subscriptionStorage.searchSubscriptions({id: data.target_id});
                break;
            // case CONSTANTS.TargetType.Subscription:
            //     [target] = await this._productStorage.searchSubscription({id: data.target_id});
            //     break;
        }

        const [repost] = await this._likesStorage.searchRepost({
            type: CONSTANTS.RepostType.Wall,
            target_id: data.target_id,
            user_id: data.user_id,
        });

        if(repost){
            if(repost.active === CONSTANTS.RepostActive.Active){
                await this._likesStorage.updateRepost({id: repost.id}, {active: CONSTANTS.RepostActive.Delete});

                // await this._userService.serviceDeleteFavorite({
                //     target_id: product.id,
                //     target_type: CONSTANTS.TargetType.Product,
                //     user_id: 186,
                // });

                return repost;
            } else if(repost.active === CONSTANTS.RepostActive.Delete){
                await this._likesStorage.updateRepost({id: repost.id}, {active: CONSTANTS.RepostActive.Active});
            }
        } else {
            const [addRepost] = await this._likesStorage.addRepost({
                type: CONSTANTS.RepostType.Wall,
                target_type: data.target_type,
                target_id: data.target_id,
                imgUser: data.imgUser,
                imgProduct: data.imgProduct,
                name: data.name,
                user_id: data.user_id,
                active: CONSTANTS.RepostActive.Active
            });
            return addRepost;
        }

        // await this.addFavorites({
        //     type: CONSTANTS.FavoriteType.Reposts,
        //     target_type: data.target_type,
        //     target_id: data.target_id
        // }, headers, user);

        return repost;
    }

    async searchRepostedByIds(data){
        const validator = new Validator();
        validator.setRule('target_id', Validator.TYPES.number().required());
        validator.setRule('active', Validator.TYPES.number().required());
        validator.validate(data);
        return await this._likesStorage.searchRepostByIds(data);
    }

    async searchRepostedWallByIds(data){
        const validator = new Validator();
        validator.setRule('user_id', Validator.TYPES.number().required());
        validator.setRule('active', Validator.TYPES.number().required());
        validator.validate(data);
        return await this._likesStorage.searchWallRepostByIds(data);
    }

    async FavorSubscription(data, headers, user) {
        const validator = new Validator();

        validator.setRule('target_type', Validator.TYPES.number().required());
        validator.setRule('target_id', Validator.TYPES.number().required());
        validator.setRule('imgUser', Validator.TYPES.string().required());
        validator.setRule('user_id', Validator.TYPES.number().required());
        validator.setRule('name', Validator.TYPES.string().required());
        validator.setRule('imgProduct', Validator.TYPES.string().required());

        validator.validate(data);

        // data.user_id = 188;
        data.type = CONSTANTS.RepostType.Wall;
        data.active = CONSTANTS.RepostActive.Active;

        let target;

        // switch (data.target_type) {
        //     // case CONSTANTS.TargetType.Post:
        //     //     [target] = await this._productStorage.searchRepost({id: data.target_id}, headers);
        //     //     break;
        //     case CONSTANTS.TargetType.Product:
        //         const [target] = await this._productStorage.searchFavor({id: data.target_id});
        //         break;
        //     // case CONSTANTS.TargetType.Subscription:
        //     //     [target] = await this._productStorage.searchSubscription({id: data.target_id});
        //     //     break;
        // }

        const [repost] = await this._likesStorage.searchFavor({
            type: CONSTANTS.RepostType.Wall,
            target_id: data.target_id,
            user_id: data.user_id,
        });

        if(repost){
            if(repost.active === CONSTANTS.RepostActive.Active){
                await this._likesStorage.updateFavor({id: repost.id}, {active: CONSTANTS.RepostActive.Delete});

                // await this._userService.serviceDeleteFavorite({
                //     target_id: product.id,
                //     target_type: CONSTANTS.TargetType.Product,
                //     user_id: 186,
                // });

                return repost;
            } else if(repost.active === CONSTANTS.RepostActive.Delete){
                await this._likesStorage.updateFavor({id: repost.id}, {active: CONSTANTS.RepostActive.Active});
            }
        } else {
            const [addRepost] = await this._likesStorage.addFavor({
                type: CONSTANTS.RepostType.Wall,
                target_type: data.target_type,
                target_id: data.target_id,
                imgUser: data.imgUser,
                imgProduct: data.imgProduct,
                name: data.name,
                user_id: data.user_id,
                active: CONSTANTS.RepostActive.Active
            });
            return addRepost;
        }

        // await this.addFavorites({
        //     type: CONSTANTS.FavoriteType.Reposts,
        //     target_type: data.target_type,
        //     target_id: data.target_id
        // }, headers, user);

        return repost;
    }

    async searchFavorByIds(data){
        const validator = new Validator();
        validator.setRule('target_id', Validator.TYPES.number().required());
        validator.setRule('active', Validator.TYPES.number().required());
        validator.validate(data);
        return await this._likesStorage.searchFavorByIds(data);
    }

    async searchFavorWallByIds(data){
        const validator = new Validator();
        validator.setRule('user_id', Validator.TYPES.number().required());
        validator.setRule('active', Validator.TYPES.number().required());
        validator.validate(data);
        return await this._likesStorage.searchWallFavorByIds(data);
    }
    async addCommentWithSubscriptions(data, headers, user){
        const validator = new Validator();

        validator.setRule('comment', Validator.TYPES.string().required());
        validator.setRule('img', Validator.TYPES.string().min(5).required());
        validator.setRule('name', Validator.TYPES.string().required());
        validator.setRule('subscriptionId', Validator.TYPES.number().required());
        validator.setRule('user_id', Validator.TYPES.number().required());

        validator.validate(data);

        const [subscription] = await this._subscriptionStorage.searchSubscriptions({id: data.subscriptionId});

        if(!subscription){
            throw new TargetNotFound('Post by this ID is not found')
        }

        if(subscription.comment_resolution === CONSTANTS.CommentResolution.Ban){
            throw new CanNotAddComments();
        }

        await this._commentsStorage.addComment({
            type: CONSTANTS.CommentType.Product,
            status: CONSTANTS.CommentStatus.Created,
            target_id: data.subscriptionId,
            user_id: data.user_id,
            comment: data.comment,
            img: data.img,
            name: data.name
        });

        // await this._userService.addFavorites({
        //     type: CONSTANTS.FavoriteType.Comments,
        //     target_type: CONSTANTS.TargetType.Product,
        //     target_id: product.id
        // }, headers);

        return true;
    }

    async searchComByIds(data){
        const validator = new Validator();
        validator.setRule('target_id', Validator.TYPES.number().required());
        validator.validate(data);
        return await this._commentsStorage.searchComByIds(data);
    }

    async searchModerationComments(data){
        const comments = await this._commentsStorage.searchComments({status: CONSTANTS.CommentStatus.Created, type: CONSTANTS.CommentType.Subscription});

        const subscriptions = await this._subscriptionStorage.searchSubscriptionsByIds(comments.map(elem => elem.target_id));

        for(let comment of comments){
            const index = subscriptions.findIndex(elem => elem.id === comment.target_id);
            comment.target = subscriptions[index];
        }

        return comments
    }

    async deleteSubscriptionForAdmin(data){
        return await this._subscriptionStorage.deleteSubscription(data)
    }

    async banSubscriptionsForAdmin(data){
        let validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());

        validator.validate(data);
        return await this._subscriptionStorage.banSubscriptions(data)
    }

    async unbanSubscriptionsForAdmin(data){
        let validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());

        validator.validate(data);
        return await this._subscriptionStorage.unbanSubscriptions(data)
    }

    async createSubscribedUser(data){
        return await this._subscriptionStorage.createSubscribedUser(data);
    }

    async updateSubscriptionForEditing(data){
        return await this._subscriptionStorage.updateSubscriptionForEditing(data);
    }
}

module.exports = Subscription;