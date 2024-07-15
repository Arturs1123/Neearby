const db = require('../services/database');
const CONSTANTS = require("../Constants");
const LIKES_TABLE_NAME = 'likes';
const REPOST_TABLE_NAME = 'reposts';
const FAVOR_TABLE = 'favorites';

class LikesStorage {

    async addLike(data){
        return db(LIKES_TABLE_NAME).insert({...data, created_at: Date.now()});
    }

    async updateLike(where, data){
        return db(LIKES_TABLE_NAME).where(where).update(data);
    }

    async searchLikes(where, fields = ['*'], orderBy = ['id']){
        return db(LIKES_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }

    async searchLikesByIds(arrayIds, fields = ['*'], orderBy = ['id']){
        return db(LIKES_TABLE_NAME).whereIn(['target_id', 'type'],arrayIds).select(fields).orderBy(orderBy);
    }

    async addRepost(data){
        return db(REPOST_TABLE_NAME).insert({...data, created_at: Date.now()});
    }

    async updateRepost(where, data){
        return db(REPOST_TABLE_NAME).where(where).update(data);
    }

    async searchRepost(where, fields = ['*'], orderBy = ['id']){
        return db(REPOST_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }

    async searchRepostByIds(where, fields = ['*'], orderBy = ['id']){
        return db(REPOST_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }


    async addFavor(data){
        return db(FAVOR_TABLE).insert({...data, created_at: Date.now()});
    }

    async updateFavor(where, data){
        return db(FAVOR_TABLE).where(where).update(data);
    }

    async searchFavor(where, fields = ['*'], orderBy = ['id']){
        return db(FAVOR_TABLE).where(where).select(fields).orderBy(orderBy);
    }

    async searchFavorByIds(where, fields = ['*'], orderBy = ['id']){
        return db(FAVOR_TABLE).where(where).select(fields).orderBy(orderBy);
    }
    async searchWallFavorByIds(where, fields = ['*'], orderBy = ['id']){
        return db(FAVOR_TABLE).where(where).select(fields).orderBy(orderBy);
    }

    async searchWallRepostByIds(where, fields = ['*'], orderBy = ['id']){
        return db(REPOST_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }

}

module.exports = new LikesStorage();