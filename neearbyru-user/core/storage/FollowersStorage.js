const db = require('../services/database');
const FOLLOWINGS_TABLE_NAME = 'followings';

class FollowersStorage {

    async searchFollowings(where, fields = ['*'], orderBy = ['id']){
        return db(FOLLOWINGS_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }

    async createFollowing(data){
        let followingObject = {
            author_id: data.authorId,
            follower_id: data.followerId,
            created_at: Math.round(Date.now()),
            active: true
        }

        await db(FOLLOWINGS_TABLE_NAME).insert(followingObject);
    }

    async unfollowAuthor(data){
        let followingObject = {
            author_id: data.authorId,
            follower_id: data.followerId,
        }

        await db(FOLLOWINGS_TABLE_NAME).update({active: false}).where(followingObject);
    }

}

module.exports = new FollowersStorage();