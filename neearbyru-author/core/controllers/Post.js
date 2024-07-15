const Validator = require('../helpers/validator');
const CONSTANTS = require('../Constants');

const { TargetNotFound, InsufficientPermission, UserIsBanned, CanNotAddComments} = require("../Errors");
const {log} = require("debug");

class Post {

    _postStorage;
    _subscriptionStorage;
    _serviceUser;
    _commentsStorage;
    _likesStorage;

    constructor(postStorage, subscriptionStorage, serviceUser, commentsStorage, likesStorage) {
        this._postStorage = postStorage;
        this._subscriptionStorage = subscriptionStorage;
        this._serviceUser = serviceUser;
        this._commentsStorage = commentsStorage;
        this._likesStorage = likesStorage
    }

    async createPost(data, headers, user){
        let validator = new Validator();

        validator.setRule('title', Validator.TYPES.string().required());
        validator.setRule('description', Validator.TYPES.string().required());
        validator.setRule('type', Validator.TYPES.number().required());
        validator.setRule('subscription_ids', Validator.TYPES.array());
        validator.setRule('price', Validator.TYPES.number());
        validator.setRule('post_image_path', Validator.TYPES.string());
        validator.validate(data);

        await this._postStorage.createNewPost(data, user);
    }

    async updatePost(data, headers, user){

        let validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());
        validator.setRule('title', Validator.TYPES.string().required());
        validator.setRule('description', Validator.TYPES.string().required());
        validator.setRule('type', Validator.TYPES.number().required());
        validator.setRule('subscription_ids', Validator.TYPES.array());
        validator.setRule('price', Validator.TYPES.number());
        validator.setRule('post_image_path', Validator.TYPES.string());

        validator.validate(data);

        // Проверка на владельца
        let [post] = await this._postStorage.searchPosts({
            id: data.id
        });

        if(!post){
            throw new TargetNotFound("Product by this ID is not found");
        }

        if(post.author_id !== user.userId){
            throw new InsufficientPermission("You are not the author of this post");
        }

        await this._postStorage.updatePost(data);

    }
    // TODO: А это вообще надо?
    // async getPost(data, headers, user) {
    //
    //     let validator = new Validator();
    //     validator.setRule('id', Validator.TYPES.number());
    //     validator.setRule('author_id', Validator.TYPES.number());
    //
    //     validator.validate(data);
    //
    //     let whereObject = {};
    //
    //     if(data.id){
    //         whereObject.id = data.id;
    //     }
    //     if(data.author_id){
    //         whereObject.author_id = data.author_id;
    //     }
    //
    //     let posts = this._postStorage.searchPosts(whereObject);
    // }

    async deletePost(data, headers, user){

        let validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());

        validator.validate(data);

        let [post] = await this._postStorage.searchPosts({
            id: data.id
        });

        if(!post){
            throw new TargetNotFound("Post by this ID is not found");
        }

        if(user.role !== CONSTANTS.ROLE_ADMIN){
            if(post.author_id !== user.userId){
                throw new InsufficientPermission("You are not the author of this post");
            }
        }

        return this._postStorage.deletePost(data.id);
    }

    async searchPosts(data, headers, user) {
        let validator = new Validator();

        validator.setRule('id', Validator.TYPES.number());
        validator.setRule('authorId', Validator.TYPES.number());

        validator.validate(data);

        let posts;

        if (data.authorId) {
            posts = await this._postStorage.searchPosts({
                author_id: data.authorId,
                active: CONSTANTS.Posts.Published
            });
        } else if(data.id){
            posts = await this._postStorage.searchPosts({
                id: data.id
            });
        }else {
            posts = await this._postStorage.searchPosts({
                author_id: user.userId,
                active: CONSTANTS.Posts.Published
            });
        }

        let arrayCommentsIds
        let comments
        let likes
        let usersLikes;

        if(!posts){
            return []
        }

        arrayCommentsIds = posts.map(elem => {return [elem.id, CONSTANTS.CommentType.Post]});
        comments = await this._commentsStorage.searchCommentsByIds(arrayCommentsIds);

        likes = await this._likesStorage.searchLikesByIds(arrayCommentsIds);
        if(likes){
            usersLikes = await this._serviceUser.findUsersByIds(likes.map(like => like.user_id));
        }

        // Проверка забанен ли автор
        for(let post of posts){
            if(post.active === CONSTANTS.Posts.UserBanned){
                post.banned = true;
            } else {
                post.banned = false;
            }

            if(post.type === 1){   // вывод постов только для людей кто вообще не подписан на автора
                post.open = true;
            } else {
                post.open = false;
            }

            post.comments = []
            if(post.comment_resolution === CONSTANTS.CommentResolution.Allow){
                if(comments){
                    for(let comment of comments.reverse()){
                        if(comment.target_id === post.id && comment.status === CONSTANTS.CommentStatus.Active){
                            post.comments.push(comment);
                        }
                    }
                }
            } else {
                post.comments = 'Автор запретил оставлять коментарии к данному посту'
            }

            post.likes = []
            if(likes){
                for(let like of likes.reverse()){
                    if(like.target_id === post.id && like.status === CONSTANTS.LikeStatus.Active){
                        const userLikePost = usersLikes.find(user => user.id === like.user_id);

                        if(userLikePost){
                            const [profilePicture] = await this._serviceUser.searchProfilePicture({id: userLikePost.profile_picture_id});

                            like.user = {
                                profile_path: profilePicture.picture_path,
                                name: userLikePost.name,
                                login: userLikePost.login || null
                            }
                        }

                        post.likes.push(like)
                    }
                }
            }

        }

        if (Object.keys(user).length === 0){
            return posts
        }

        const followingIds = (await this._serviceUser.getUserFollowings({userId: user.userId}, headers)).map(elem => elem.follower_id) // все подписки у пользователя
        const purchasedPostIds = (await this._serviceUser.getPurchasedPosts({userId: user.userId}, headers)).map(elem => elem.post_id); // все купленные посты у пользователя
        const subscriptionUsersIds = (await this._subscriptionStorage.searchSubscribedUser({
            subscriber_id: user.userId
        }))

        // Проверка на покупку постов
        for(let post of posts){
            if(post.subscription_ids){
                for(let sub of subscriptionUsersIds){
                    if(!sub.active_until > Date.now()){
                        if(post.subscription_ids.includes(sub.subscription_id)){
                            post.open = true;
                        }
                    }
                }
            }

            for(let postId of purchasedPostIds){
                if (post.id === postId){
                    post.open = true;
                    post.paying = true;
                }
            }
        }

        if (!followingIds.find(x => x === user.userId)){
            return posts
        }

        for(let post of posts){
            if(post.type === 2){
                post.open = true;
            }
        }

        return posts;
    }

    async addCommentWithPost(data, headers, user){
        const validator = new Validator();
        
        validator.setRule('comment', Validator.TYPES.string().min(5).required());
        validator.setRule('postId', Validator.TYPES.number().required());

        validator.validate(data);
        
        const [post] = await this._postStorage.searchPosts({id: data.postId});

        if(!post){
            throw new TargetNotFound('Post by this ID is not found')
        }

        if(post.comment_resolution === CONSTANTS.CommentResolution.Ban){
            throw new CanNotAddComments();
        }

        await this._commentsStorage.addComment({
            type: CONSTANTS.CommentType.Post,
            status: CONSTANTS.CommentStatus.Created,
            target_id: data.postId,
            user_id: user.userId,
            comment: data.comment
        });

        await this._serviceUser.addFavorites({
            type: CONSTANTS.FavoriteType.Comments,
            target_type: CONSTANTS.TargetType.Post,
            target_id: post.id
        }, headers);

        return true;
    }

    async likePost(data, headers, user){
        const validator = new Validator();

        validator.setRule('postId', Validator.TYPES.number().required());

        validator.validate(data);

        const [post] = await this._postStorage.searchPosts({id: data.postId});

        if(!post){
            throw new TargetNotFound('Post by this ID is not found');
        }

        const [like] = await this._likesStorage.searchLikes({
            type: CONSTANTS.LikeType.Post,
            target_id: post.id,
            user_id: user.userId
        });

        if(like){
            if(like.status === CONSTANTS.LikeStatus.Active){
                await this._likesStorage.updateLike({id: like.id}, {status: CONSTANTS.LikeStatus.Delete});

                await this._serviceUser.serviceDeleteFavorite({
                    target_id: post.id,
                    target_type: CONSTANTS.TargetType.Post,
                    user_id: user.userId,
                })

                return true;
            } else if(like.status === CONSTANTS.LikeStatus.Delete){
                await this._likesStorage.updateLike({id: like.id}, {status: CONSTANTS.LikeStatus.Active});
            }
        } else {
            await this._likesStorage.addLike({
                type: CONSTANTS.LikeType.Post,
                target_id: post.id,
                user_id: user.userId,
                status: CONSTANTS.LikeStatus.Active
            });
        }

        await this._serviceUser.addFavorites({
            type: CONSTANTS.FavoriteType.Likes,
            target_type: CONSTANTS.TargetType.Post,
            target_id: post.id
        }, headers);

        return true
    }

    async myPostsForEditing(data, headers, user){ // ваши посты которые для редактирования
        const posts = await this._postStorage.searchPosts({author_id: user.userId});

        if(!posts.length){
            return posts
        }

        const subscriptions = await this._subscriptionStorage.searchSubscriptions({author_id: user.userId, active: CONSTANTS.Subscriptions.Published})

        return { posts, subscriptions };
    }

    async myPostsPurchase(data){
        const validator = new Validator();

        validator.setRule('userId', Validator.TYPES.number().required());

        validator.validate(data)

        const myPurchasePostIds = (await this._postStorage.searchPurchasedPosts({client_id: data.userId})).map(elem => elem.post_id);

        const posts = await this._postStorage.searchPostsByIds(myPurchasePostIds)

        let subscriptions

        for (let post of posts){
            post.userBanned = false;
            post.deleted = false;
            if(post.active === CONSTANTS.Posts.UserBanned){
                posts.userBanned = true
            } else if(post.active === CONSTANTS.Posts.Deleted){
                post.deleted = true;
            }

            delete post.created_at;
            delete post.updated_at;

            if(post.subscription_ids){
                subscriptions = await this._subscriptionStorage.searchSubscriptionsByIds(post.subscription_ids)

                for(let sub of subscriptions){
                    sub.userBanned = false;
                    sub.deleted = false;
                    if(sub.active === CONSTANTS.Posts.UserBanned){
                        sub.userBanned = true
                    } else if(sub.active === CONSTANTS.Posts.Deleted){
                        sub.deleted = true;
                    }

                    delete sub.created_at;
                    delete sub.updated_at;
                }
                post.subscriptions = subscriptions
            }

        }


        return posts;
    }

    async searchModerationPosts(data){
        return await this._postStorage.searchPosts({active: data.active})
    }

    async searchPostsByIds(data){
        const validator = new Validator();

        validator.setRule('ids', Validator.TYPES.array().required());
        validator.validate(data)

        return await this._postStorage.searchPostsByIds(data.ids);
    }

    async searchModerationComments(data){
        const comments = await this._commentsStorage.searchComments({status: CONSTANTS.CommentStatus.Created, type: CONSTANTS.CommentType.Post});

        const posts = await this._postStorage.searchPostsByIds(comments.map(elem => elem.target_id));

        for(let comment of comments){
            const index = posts.findIndex(elem => elem.id === comment.target_id);
            comment.target = posts[index];
        }

        return comments
    }

    async deletePostForAdmin(data){
        return await this._postStorage.deletePost(data)
    }

    async banPostsForAdmin(data){
        return await this._postStorage.banPosts(data.userId);
    }

    async unbanPostsForAdmin(data){
        return await this._postStorage.unbanPosts(data.userId);
    }

    async createPurchasedUserPosts(data){
        return await this._postStorage.createPurchasedUserPosts(data)
    }

    async updatePostForEditing(data){
        return await this._postStorage.updatePostForEditing(data)
    }

}

module.exports = Post