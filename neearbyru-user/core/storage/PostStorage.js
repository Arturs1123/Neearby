const db = require('../services/database');
const PURCHASED_POSTS_TABLE = 'purchased_posts';


class PostStorage {

    async searchPurchasedPosts(where, fields = ['*'], orderBy = ['id']){
        return db(PURCHASED_POSTS_TABLE).where(where).select(fields).orderBy(orderBy);
    }

}

module.exports = new PostStorage();