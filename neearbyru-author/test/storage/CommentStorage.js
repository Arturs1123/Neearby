const COMMENTS_TABLE_NAME = 'comments';

class CommentStorage {

    async searchCommentsByIds(arrayIds, fields = ['*'], orderBy = ['id']){
        return [];
    }

}

module.exports = new CommentStorage();