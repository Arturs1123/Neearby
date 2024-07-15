const Validator = require('../helpers/validator');
const CONSTANTS = require('../Constants');
const config = require('../../secret/config')
const SubscriptionController = require('../system/Subscription');
const uuid = require('uuid')
const { TargetNotFound, InsufficientPermission, UserIsBanned, NotAuthorThisTarget, TargetBanned, ReferralTargetExists,
    ReferralTargetNotActive, ReferralTargetNotFound, AuthorThisReferralTarget, UserCardNotFound, CanNotAddComments
} = require("../Errors");
const createRandomString = require("../helpers/createRandomString");
const path = require("path");

class Product {

    _productStorage;
    _userService;
    _repostStorage;
    _referralStorage;
    _commentsStorage;
    _likesStorage;

    constructor(productStorage, userService, referralStorage, commentsStorage, likesStorage, repostStorage) {
        this._productStorage = productStorage;
        this._userService = userService;
        this._referralStorage = referralStorage;
        this._commentsStorage = commentsStorage;
        this._likesStorage = likesStorage;
        this._repostStorage = repostStorage
    }

    async createProduct(data, headers, user, fl){
        let validator = new Validator();
        console.log(data);
        validator.setRule('title', Validator.TYPES.string().required());
        validator.setRule('description', Validator.TYPES.string().required());
        validator.setRule('price', Validator.TYPES.number().required());
        validator.setRule('discount_price', Validator.TYPES.number());
        validator.setRule('name_user', Validator.TYPES.string());
        validator.setRule('number_user', Validator.TYPES.string());
        validator.setRule('email_user', Validator.TYPES.string());
        validator.setRule('type', Validator.TYPES.string().required());
        validator.setRule('download_link', Validator.TYPES.string().required());
        validator.setRule('author_id', Validator.TYPES.number());
        validator.setRule('product_link', Validator.TYPES.string().required());
        validator.validate(data);
        const {image} = fl;
        let fileName = uuid.v4() + ".jpg";
        image.mv(path.resolve(__dirname, '../', '..','static', fileName));
        data.product_image_path = fileName;
        // const [searchCardUser] = await this._userService.searchCardUser({user_id: user.userId})
        // if(!searchCardUser){
        //     throw new UserCardNotFound();
        // }

        let id = await this._productStorage.createNewProduct(data, user);

        // return await this._productStorage.createNewProduct({title: data.title, description: data.description, price: data.price, product_type: data.product_type, download_link: data.download_link,product_image_path: data.product_image_path});

        return {id: id};
    }


    async updateProduct(data, headers, user, fl){
        let validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());
        validator.setRule('title', Validator.TYPES.string());
        validator.setRule('description', Validator.TYPES.string());
        validator.setRule('price', Validator.TYPES.number());
        validator.setRule('discount_price', Validator.TYPES.number());
        validator.setRule('product_link', Validator.TYPES.string());
        validator.setRule('download_link', Validator.TYPES.string().required());

        validator.validate(data);
        const {image} = fl;
        let fileName = uuid.v4() + ".jpg";
        image.mv(path.resolve(__dirname, '../', '..','static', fileName));
        data.product_image_path = fileName;

        // Проверка на владельца
        let [product] = await this._productStorage.searchProducts({
            id: data.id
        });

        if(!product){
            throw new TargetNotFound("Product by this ID is not found");
        }

        // if(product.author_id !== user.userId){
        //     throw new InsufficientPermission("You are not the author of this product");
        // }

        return await this._productStorage.updateProduct(data);
    }

    async updateProductPosition(data, headers, user){
        let validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());
        validator.setRule('delete_reason', Validator.TYPES.number());

        validator.validate(data);

        // Проверка на владельца
        let [product] = await this._productStorage.searchProducts({
            id: data.id
        });

        if(!product){
            throw new TargetNotFound("Product by this ID is not found");
        }

        // if(product.author_id !== user.userId){
        //     throw new InsufficientPermission("You are not the author of this product");
        // }

        return await this._productStorage.updateProductPosition(data);
    }

    async updateProductComments(data, headers, user){
        let validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());
        validator.setRule('comment_resolution', Validator.TYPES.number());

        validator.validate(data);

        // Проверка на владельца
        let [product] = await this._productStorage.searchProducts({
            id: data.id
        });

        if(!product){
            throw new TargetNotFound("Product by this ID is not found");
        }

        // if(product.author_id !== user.userId){
        //     throw new InsufficientPermission("You are not the author of this product");
        // }

        return await this._productStorage.updateProductComments(data);
    }

    async updateActive(data, headers, user){
        let validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());
        validator.setRule('likes', Validator.TYPES.number().required());
        validator.setRule('author_id', Validator.TYPES.number().required());

        validator.validate(data);

        // Проверка на владельца
        let [product] = await this._productStorage.searchProducts({
            id: data.id
        });

        if(!product){
            throw new TargetNotFound("Product by this ID is not found");
        }

        // if(product.author_id !== user.userId){
        //     throw new InsufficientPermission("You are not the author of this product");
        // }

        return await this._productStorage.updateActive(data);
    }

    async updateZakrep(data, headers, user){
        let validator = new Validator();

        validator.setRule('author_id', Validator.TYPES.number().required());
        validator.setRule('productId', Validator.TYPES.number().required());
        validator.validate(data);


        let product = await this._productStorage.searchProducts({
            id: data.productId,
            author_id: data.author_id,
            zakrep: "true"
        });


        if(product){
            await this._productStorage.updateZakrepFalse({author_id: data.author_id, zakrep: "true", id: data.id});
        }

        await this._productStorage.updateZakrepTrue({author_id: data.author_id, zakrep: "false", id: data.id});
        // else {
        //     await this._productStorage.updateZakrep({
        //         id: product.id,
        //         zakrep: data.zakrep,
        //         author_id: data.author_id
        //     });
        // }

        // if(!product){
        //     throw new TargetNotFound("Product by this ID is not found");
        // }


        return product;
    }

    async searchProducts(data, headers, user) {
        let validator = new Validator();

        validator.setRule('author_id', Validator.TYPES.number());
        validator.setRule('id', Validator.TYPES.number());

        validator.validate(data);

        let whereObject = {};

        if(data.id){
            whereObject.id = data.id;
        }
        if(data.author_id){
            whereObject.author_id = data.author_id;
        }

        let products = await this._productStorage.searchProducts({...whereObject, active: CONSTANTS.Products.Published});


        for(let product of products){
            if(product.active === CONSTANTS.Products.UserBanned){
                product.banned = true;
            } else {
                product.banned = false;
            }

            if(product.active === CONSTANTS.Products.Deleted){
                product.deleted = true;
            } else {
                product.deleted = false;
            }

            if(!headers['auth-token'] === config.SERVICE_TOKEN){
                if(!user || (user.userId != product.author_id)){
                    delete product['download_link'];
                }
            }
        }

        const arrayReferralIds = products.map(elem => {return [elem.id, CONSTANTS.ReferralTargetType.Product]});
        const searchReferralProducts = await this._referralStorage.searchReferralTargetsByIds(arrayReferralIds)

        const arrayCommentsIds = products.map(elem => {return [elem.id, CONSTANTS.CommentType.Product]});
        const comments = await this._commentsStorage.searchCommentsByIds(arrayCommentsIds)

        let usersLikes
        const likes = await this._likesStorage.searchLikesByIds(arrayCommentsIds);
        // if(likes){
        //     console.log('search likes','-----------------------------------', likes.map(like => like.user_id), likes);
        //     usersLikes = await this._userService.findUsersByIds(likes.map(like => like.user_id));
        //     console.log('likes',usersLikes.map(i => i.id),'-----------------------------------');
        // }

        for (let product of products){
            const referralIndex = searchReferralProducts.findIndex(x => x.target_id === product.id);

            if(referralIndex || referralIndex === 0){
                product.referral = searchReferralProducts[referralIndex];
            }

            product.comments = []
            if(product.comment_resolution === CONSTANTS.CommentResolution.Allow){
                for(let comment of comments.reverse()){
                    if(comment.target_id === product.id){
                        if(comment.status === CONSTANTS.CommentStatus.Active){
                            product.comments.push(comment);
                        }
                    }
                }
            } else {
                product.comments = 'Автор запретил оставлять коментарии к даному продукту'
            }

            // product.likes = []
            // if(likes){
            //     for(let like of likes.reverse()){
            //         if(like.target_id === product.id && like.status === CONSTANTS.LikeStatus.Active){
            //             const userLikeProduct = usersLikes.find(user => user.id === like.user_id);
            //
            //             if(userLikeProduct){
            //                 const [profilePicture] = await this._userService.searchProfilePicture({id: userLikeProduct.profile_picture_id});
            //
            //                 like.user = {
            //                     profile_path: profilePicture.picture_path,
            //                     name: userLikeProduct.name,
            //                     login: userLikeProduct.login || null
            //                 }
            //             }
            //
            //             product.likes.push(like)
            //         }
            //     }
            // }

        }

        return products;
    }

    async searchProductsAdmin(data, headers, user) {
        let validator = new Validator();

        validator.validate(data);

        let whereObject = {};

        let products = await this._productStorage.searchProductsAdmin({...whereObject});

        return products;
    }

    async searchProductAdmin(data, headers, user) {
        let validator = new Validator();

        validator.validate(data);

        let whereObject = {};

        let covers = await this._productStorage.searchProductedAdmin({...whereObject});

        return covers;
    }
    async searchProductAcceptAdmin(data, headers, user) {
        let validator = new Validator();

        validator.validate(data);

        let whereObject = {};

        let covers = await this._productStorage.searchProductsAcceptAdmin({...whereObject});

        return covers;
    }
    async searchProductCancelAdmin(data, headers, user) {
        let validator = new Validator();

        validator.validate(data);

        let whereObject = {};

        let covers = await this._productStorage.searchCProductCancelAdmin({...whereObject});

        return covers;
    }

    async searchCoversByIds(data){
        const validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());
        validator.validate(data);

        return await this._productStorage.searchCoversByIds(data);
    }

    async banCoverForAdmin(data){
        let validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());
        validator.setRule('status', Validator.TYPES.number().required());

        validator.validate(data);
        return await this._productStorage.banCover(data);
    }

    async unbanCoverForAdmin(data){
        let validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());
        validator.setRule('status', Validator.TYPES.number().required());

        validator.validate(data);
        return await this._productStorage.unbanCover(data);
    }

    async searchUsers(data, headers, user) {
        let validator = new Validator();

        validator.validate(data);
        let whereObject = {};

        if(data.id){
            whereObject.id = data.id;
        }
        if(data.author_id){
            whereObject.author_id = data.author_id;
        }

        let products = await this._productStorage.searchUsers({...whereObject, reason_banned: null});
        return products;
    }

    async updateBanUser(data, headers, user){
        let validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());
        validator.setRule('reason_banned', Validator.TYPES.number().required());

        validator.validate(data);

        return await this._productStorage.updateBanUser(data);
    }

    async searchModerationProducts(data){
        const validator = new Validator();
        validator.setRule('active', Validator.TYPES.number().required());
        validator.validate(data);
        return await this._productStorage.searchProductsAdmin({active: data.active});
    }

    async searchComByIds(data){
        const validator = new Validator();
        validator.setRule('target_id', Validator.TYPES.number().required());
        validator.validate(data);
        return await this._commentsStorage.searchComByIds(data);
    }

    async searchProductsByIds(data){
        const validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());
        validator.validate(data);

        return await this._productStorage.searchProductsByIds(data);
    }

    async deleteProduct(data, headers, user){

        let validator = new Validator();
        validator.setRule('id', Validator.TYPES.number().required());
        validator.validate(data);

        let [product] = await this._productStorage.searchProducts({
            id: data.id
        });

        if(!product){
            throw new TargetNotFound("Product by this ID is not found");
        }

        // if(user.role !== CONSTANTS.ROLE_ADMIN){
        //     if(product.author_id !== user.userId){
        //         throw new InsufficientPermission("You are not the author of this product");
        //     }
        // }

        return this._productStorage.deleteProduct(data);
    }

    async likeProduct(data, headers, user){
        const validator = new Validator();

        validator.setRule('productId', Validator.TYPES.number().required());
        validator.setRule('img', Validator.TYPES.string().required());
        validator.setRule('name', Validator.TYPES.string().required());
        validator.validate(data);

        const [product] = await this._productStorage.searchProducts({id: data.productId});

        if(!product){
            throw new TargetNotFound('Product by this ID is not found')
        }

        const [like] = await this._likesStorage.searchLikes({
            type: CONSTANTS.LikeType.Product,
            target_id: product.id,
            status: CONSTANTS.LikeStatus.Active,
            user_id: 188
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
                type: CONSTANTS.LikeType.Product,
                target_id: product.id,
                name: data.name,
                user_id: 188,
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

    async addCommentWithProduct(data, headers, user){
        const validator = new Validator();

        validator.setRule('comment', Validator.TYPES.string().required());
        validator.setRule('img', Validator.TYPES.string().min(5).required());
        validator.setRule('name', Validator.TYPES.string().required());
        validator.setRule('productId', Validator.TYPES.number().required());

        validator.validate(data);

        const [product] = await this._productStorage.searchProducts({id: data.productId});

        if(!product){
            throw new TargetNotFound('Post by this ID is not found')
        }

        if(product.comment_resolution === CONSTANTS.CommentResolution.Ban){
            throw new CanNotAddComments();
        }

        await this._commentsStorage.addComment({
            type: CONSTANTS.CommentType.Product,
            status: CONSTANTS.CommentStatus.Created,
            target_id: data.productId,
            user_id: 188,
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


    async repostProduct(data, headers, user) {
        const validator = new Validator();

        validator.setRule('target_type', Validator.TYPES.number().required());
        validator.setRule('target_id', Validator.TYPES.number().required());
        validator.setRule('imgUser', Validator.TYPES.string().required());
        validator.setRule('name', Validator.TYPES.string().required());
        validator.setRule('imgProduct', Validator.TYPES.string().required());

        validator.validate(data);

        data.user_id = 188;
        data.type = CONSTANTS.RepostType.Wall;
        data.active = CONSTANTS.RepostActive.Active;

        let target;

        switch (data.target_type) {
            // case CONSTANTS.TargetType.Post:
            //     [target] = await this._productStorage.searchRepost({id: data.target_id}, headers);
            //     break;
            case CONSTANTS.TargetType.Product:
               const [target] = await this._productStorage.searchProducts({id: data.target_id});
                break;
            // case CONSTANTS.TargetType.Subscription:
            //     [target] = await this._productStorage.searchSubscription({id: data.target_id});
            //     break;
        }

        const [repost] = await this._likesStorage.searchRepost({
            type: CONSTANTS.RepostType.Wall,
            target_id: data.target_id,
            user_id: 188,
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
                user_id: 188,
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


    async FavorProduct(data, headers, user) {
        const validator = new Validator();

        validator.setRule('target_type', Validator.TYPES.number().required());
        validator.setRule('target_id', Validator.TYPES.number().required());
        validator.setRule('imgUser', Validator.TYPES.string().required());
        validator.setRule('name', Validator.TYPES.string().required());
        validator.setRule('imgProduct', Validator.TYPES.string().required());

        validator.validate(data);

        data.user_id = 188;
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
            user_id: 188,
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
                user_id: 188,
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










    async searchLikes(data){
        const validator = new Validator();
        validator.setRule('target_id', Validator.TYPES.number().required());
        validator.setRule('status', Validator.TYPES.number().required());
        validator.validate(data);
        return await this._likesStorage.searchLikes(data);
    }

    async myProductsPurchase(data){
        const validator = new Validator();

        validator.setRule('userId', Validator.TYPES.number().required());

        validator.validate(data);

        let ordersProductIds = (await this._productStorage.searchOrders({
            order_type: CONSTANTS.OrderTypes.Product,
            client_id: data.userId,
            status: CONSTANTS.StatusOrder.Payed
        })).map(elem => elem.target_id);

        return await this._productStorage.searchProductsByIds(ordersProductIds)
    }

    async addProductInReferralSystem(data, headers, user){
        const validator = new Validator();

        validator.setRule('targetId', Validator.TYPES.number().required());
        validator.setRule('referral_levels', Validator.TYPES.object().required());

        validator.validate(data);

        let [target] = await this.searchProducts({id: data.targetId, author_id: user.userId}, headers, user);

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
            type: CONSTANTS.ReferralTargetType.Product,
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
                throw new ReferralTargetExists('Referral product already exists');
            }
        }

        data.type = CONSTANTS.ReferralTargetType.Product;

        await this._referralStorage.addTargetInReferralSystem(data)

        return true;
    }

    async updateReferralProduct(data, headers, user){
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
            throw new ReferralTargetNotFound('Referral product not found');
        }

        const [target] = await this.searchProducts({id: searchReferral.target_id, author_id: user.userId}, headers, user);

        if(target.author_id !== user.userId){
            throw new NotAuthorThisTarget();
        }

        await this._referralStorage.updateReferralTargets({id: searchReferral.id}, {
            referral_levels: JSON.stringify(data.referral_levels)
        })

        return true;
    }

    async deleteReferralProduct(data, headers, user){
        const validator = new Validator();

        validator.setRule('referralId', Validator.TYPES.number().required());

        validator.validate(data);

        const [searchReferral] = await this._referralStorage.searchReferralTargets({id: data.referralId, type: CONSTANTS.ReferralTargetType.Product});

        if(!searchReferral){
            throw new ReferralTargetNotFound('Referral product not found');
        }

        const [target] = await this.searchProducts({id: searchReferral.target_id, author_id: user.userId}, headers, user);

        if(target.author_id !== user.userId){
            throw new NotAuthorThisTarget();
        }

        await this._referralStorage.deleteReferralTarget(searchReferral.id);

        return true;

    }

    async addUserInReferralProduct(data, headers, user) {
        const validator = new Validator();

        validator.setRule('referralId', Validator.TYPES.number().required());

        validator.validate(data);

        // TODO: если передают refKey то это означает что этот пользователь будет брать уровень 1, а автор 2

        const [searchCardUser] = await this._userService.searchCardUser({user_id: user.userId})

        if(!searchCardUser){
            throw new UserCardNotFound();
        }

        const [searchReferralTarget] = await this._referralStorage.searchReferralTargets({
            type: CONSTANTS.ReferralTargetType.Product,
            id: data.referralId
        });

        if (!searchReferralTarget) {
            throw new ReferralTargetNotFound('Referral product not found');
        }

        if (searchReferralTarget.active === CONSTANTS.ReferralActive.NotActive) {
            throw new ReferralTargetNotActive()
        }

        const [target] = await this.searchProducts({id: searchReferralTarget.target_id, author_id: user.userId}, headers, user);

        if (!target) {
            throw new TargetNotFound();
        }

        if (target.banned) {
            throw new TargetBanned();
        }

        if(target.author_id === user.userId){
            throw new AuthorThisReferralTarget('You are the author of this referral product');
        }

        data.level = 1;
        data.userId = user.userId;
        data.refKey = createRandomString(10);

        await this._referralStorage.createReferralUser(data);

        return true

    }

    async searchModerationComments(data){
        let comments = await this._commentsStorage.searchComments({status: CONSTANTS.CommentStatus.Created, type: CONSTANTS.CommentType.Product});

        let products = await this._productStorage.searchProductsByIds(comments.map(elem => elem.target_id));

        for(let comment of comments){
            const index = products.findIndex(elem => elem.id === comment.target_id);
            comment.target = products[index]
        }

        return comments
    }

    async confirmSendComment(data){

        const validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());

        validator.validate(data);

        return await this._commentsStorage.updateComment({id: data.id}, {status:CONSTANTS.CommentStatus.Active })
    }

    async myProductsForEditing(data, headers, user){
        return await this._productStorage.searchProducts({author_id: user.userId, active: CONSTANTS.Products.Editing});
    }

    async deleteProductForAdmin(data){
        return await this._productStorage.deleteProduct(data);
    }

    async banProductsForAdmin(data){
        let validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());
        validator.setRule('active', Validator.TYPES.number().required());

        validator.validate(data);
        return await this._productStorage.banProducts(data);
    }

    async unbanProductsForAdmin(data){
        let validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());
        validator.setRule('active', Validator.TYPES.number().required());

        validator.validate(data);
        return await this._productStorage.unbanProducts(data);
    }

    async updateProductForEditing(data){
        return await this._productStorage.updateProductForEditing(data);
    }
}

module.exports = Product;