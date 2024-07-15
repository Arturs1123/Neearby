const SUBSCRIPTIONS_TABLE_NAME = 'subscription'

class SubscriptionStorage {

    async createNewSubscription(data, authorId){
        return true;
    }

    async updateSubscription(data){
        return {id: 12};
    }

    async searchSubscriptions(where, fields = ['*'], orderBy = ['id']){
        return [
            {
                id: 12,
                author_id: 50,
            }
        ];
    }

    async deleteSubscription(id){
        return true;
    }
}

module.exports = new SubscriptionStorage();