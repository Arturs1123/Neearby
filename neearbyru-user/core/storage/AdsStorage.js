const db = require('../services/database');
const ADS_TABLE_NAME = 'ads';
const SUBSCRIPTIONS_TABLE_NAME = 'subscription';
const PRODUCTS_TABLE_NAME = 'products';
const CONSTANTS = require('../Constants')

class AdsStorage {

    async createAds(data){
        let currentTime = Math.round(Date.now());

        const createData = {
            creator_id: data.creator_id,
            author_id: data.author_id,
            product_id: data.product_id,
            type: data.type,
            description: data.description,
            active: Number(data.active), // 0 - на проверке оплаты, 1 - на проверке автора, 2 - опубликованно, 3 - удаленно
            delete_reason: null,
            created_at: currentTime,
            updated_at: currentTime
        }

        return db(ADS_TABLE_NAME).insert(createData);
    }

    async updateAds(where, data){
        return db(ADS_TABLE_NAME).where(where).update(data);
    }

    async searchAds(where, fields = ['*'], orderBy = ['id']) {
        return db(ADS_TABLE_NAME).where(where).orderBy(orderBy);
    }

    async delete(data){
        return db(ADS_TABLE_NAME).where('id', data.id).update({
            active:CONSTANTS.AdsTypes.Deleted,
            delete_reason: data.delete_reason,
            updated_at: Math.round(Date.now())
        });
    }

    async publication(data) {
        return db(ADS_TABLE_NAME).where('id', data.id).update({
            active:CONSTANTS.AdsTypes.Published,
            delete_reason: null,
            updated_at: Math.round(Date.now())
        });
    }

    async searchSubscription(where, fields = ['*'], orderBy = ['id']){
        return db(SUBSCRIPTIONS_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }

    async searchProduct(where, fields = ['*'], orderBy = ['id']){
        return db(PRODUCTS_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }

}

module.exports = new AdsStorage();