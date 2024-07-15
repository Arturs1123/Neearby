const db = require('../services/database');
const CONSTANTS = require("../Constants");
const COMMENTS_TABLE_NAME = 'comments';

class CommentStorage {

    async addComment(data){
        return db(COMMENTS_TABLE_NAME).insert({...data, created_at: Date.now()});
    }

    async updateComment(where, data){
        return db(COMMENTS_TABLE_NAME).where(where).update(data);
    }

    async searchComments(where, data, fields = ['*'], orderBy = ['id']){
        return db(COMMENTS_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }

    async searchCommentsByIds(arrayIds, fields = ['*'], orderBy = ['id']){
        return db(COMMENTS_TABLE_NAME).whereIn(['target_id', 'type'],arrayIds).select(fields).orderBy(orderBy);
    }

    async searchComByIds(where, fields = ['*'], orderBy = ['id']){
        return db(COMMENTS_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }

}

module.exports = new CommentStorage();