const db = require('../services/database');
const PRODUCTS_TABLE_NAME = 'products'
const ORDERS_TABLE_NAME = 'orders'
const CONSTANTS = require("../Constants");
const {date} = require("joi");
const COMMENTS_TABLE_NAME = 'comments';
const USERS_TABLE_NAME = 'users';
const COVER_TABLE_NAME = 'cover_moderation_list';
class ProductStorage {

    async createNewProduct(data, user){
        let currentTime = Math.round(Date.now());

        let active = CONSTANTS.Products.Created;

        // if (user.moderationRights === CONSTANTS.ModerationRights.OnlyProducts ||
        //     user.moderationRights === CONSTANTS.ModerationRights.All) {
        //     active = CONSTANTS.Subscriptions.Published;
        // }

        let productObject = {
            title: data.title,
            author_id: data.author_id,
            description: data.description,
            price: data.price,
            discount_price: data.discount_price,
            name_user: data.name_user,
            number_user: data.number_user,
            email_user: data.email_user,
            download_link: data.download_link,
            product_link: data.product_link,
            created_at: currentTime,
            updated_at: currentTime,
            product_image_path: data.product_image_path,
            type: data.type,
            active: active,
            zakrep: "false",
            comment_resolution: CONSTANTS.CommentResolution.Allow
        }
        return (await db(PRODUCTS_TABLE_NAME).insert(productObject).returning('id'))[0];
    }

    async updateProduct(data){
        let currentTime = Math.round(Date.now());

        let productObject = {
            title: data.title,
            description: data.description,
            price: data.price,
            discount_price: data.discount_price,
            product_link: data.product_link,
            download_link: data.download_link,
            updated_at: currentTime,
            product_image_path: data.product_image_path,
            type: data.type,
            active: CONSTANTS.Products.Created,
        }
        return db(PRODUCTS_TABLE_NAME).update(productObject).where({id: data.id});
    }

    async updateProductPosition(data){
        let currentTime = Math.round(Date.now());

        let productObject = {
            delete_reason: data.delete_reason,
            updated_at: currentTime,
        }
        return db(PRODUCTS_TABLE_NAME).update(productObject).where({id: data.id});
    }
    async updateProductComments(data){
        let currentTime = Math.round(Date.now());

        let productObject = {
            comment_resolution: data.comment_resolution,
            updated_at: currentTime,
        }
        return db(PRODUCTS_TABLE_NAME).update(productObject).where({id: data.id});
    }

    async updateActive(data){
        let currentTime = Math.round(Date.now());

        let productObject = {
            likes: data.likes,
            updated_at: currentTime,
        }
        return db(PRODUCTS_TABLE_NAME).update(productObject).where({id: data.id});
    }

    async updateZakrepTrue(data){
        let currentTime = Math.round(Date.now());

        let productObject = {
            id: data.id,
            author_id: data.author_id,
            zakrep: "false",
            updated_at: currentTime,
        }
        return db(PRODUCTS_TABLE_NAME).update(productObject).returning('id');
    }
    async updateZakrepFalse(data){
        let currentTime = Math.round(Date.now());

        let productObject = {
            id: data.id,
            author_id: data.author_id,
            zakrep: "true",
            updated_at: currentTime,
        }
        return db(PRODUCTS_TABLE_NAME).update(productObject).returning('id');
    }

    async updateProducts(where, data){
        return db(PRODUCTS_TABLE_NAME).where(where).update(data);
    }



    async banProducts(data){
        return db(PRODUCTS_TABLE_NAME).update(
            {active: CONSTANTS.Products.Deleted}
        ).where({id: data.id});
    }

    async unbanProducts(data){
        return db(PRODUCTS_TABLE_NAME).update(
            {active: CONSTANTS.Products.Published}
        ).where({id: data.id});
    }

    async searchProducts(where, fields = ['*'], orderBy = ['id']){
        return db(PRODUCTS_TABLE_NAME).where(where).select(fields).orderBy(orderBy).orWhere('active', CONSTANTS.Products.Deleted);
    }

    async searchProductsAdmin(where, fields = ['*'], orderBy = ['id']){
        return db(PRODUCTS_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }

    async searchProductedAdmin(where, fields = ['*'], orderBy = ['id']){
        return db(PRODUCTS_TABLE_NAME).where(where).select(fields).orderBy(orderBy).orWhere('active', 0);
    }
    async searchProductsAcceptAdmin(where, fields = ['*'], orderBy = ['id']){
        return db(PRODUCTS_TABLE_NAME).where(where).select(fields).orderBy(orderBy).orWhere('active', 1);
    }
    async searchCProductCancelAdmin(where, fields = ['*'], orderBy = ['id']){
        return db(PRODUCTS_TABLE_NAME).where(where).select(fields).orderBy(orderBy).orWhere('active', 2);
    }

    async searchCoversByIds(where, fields = ['*'], orderBy = ['id']){
        return db(COVER_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }

    async banCover(data){
        return db(COVER_TABLE_NAME).update(
            {status: CONSTANTS.Products.Deleted}
        ).where({id: data.id});
    }

    async unbanCover(data){
        return db(COVER_TABLE_NAME).update(
            {status: CONSTANTS.Products.Published}
        ).where({id: data.id});
    }

    async searchUsers(where, fields = ['*'], orderBy = ['id']){
        return db(USERS_TABLE_NAME).where(where).select(fields).orderBy(orderBy).orWhere('reason_banned', null);
    }

    async updateBanUser(data){
        let productObject = {
            reason_banned: 1,
        }
        return db(USERS_TABLE_NAME).update(productObject).where({id: data.id});
    }

    async searchProductsByIds(where, fields = ['*'], orderBy = ['id']){
        return db(PRODUCTS_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }

    async deleteProduct(where, orderBy = ['id']){
        return db(PRODUCTS_TABLE_NAME).delete().where(where).orderBy(orderBy);
    }

    async likeProduct(data){
        return db(PRODUCTS_TABLE_NAME).where('id', data.productId).update({
            likes: JSON.stringify(data.likes)
        });
    }

    async searchOrders(where, fields = ['*'], orderBy = ['id']){
        return db(ORDERS_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }

    async updateProductForEditing(data){
        return db(PRODUCTS_TABLE_NAME).where('id', data.id).update({
            active: CONSTANTS.Products.Editing
        })
    }
}

module.exports = new ProductStorage();