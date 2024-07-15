const db = require('../services/database');
const CONSTANTS = require("../Constants");
const REPOST_TABLE_NAME = 'reposts';

class RepostStorage {

    async addRepost(data){
        return db(REPOST_TABLE_NAME).insert({...data, created_at: Date.now()});
    }

    async updateRepost(where, data){
        return db(REPOST_TABLE_NAME).where(where).update(data);
    }

    async searchRepost(where, fields = ['*'], orderBy = ['id']){
        return db(REPOST_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }

    async searchRepostByIds(arrayIds, fields = ['*'], orderBy = ['id']){
        return db(REPOST_TABLE_NAME).whereIn(['target_id', 'type'],arrayIds).select(fields).orderBy(orderBy);
    }

}

module.exports = new RepostStorage();