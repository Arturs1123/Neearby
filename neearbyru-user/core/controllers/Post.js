const Validator = require('../helpers/validator');

const {} = require('../Constants');
const {} = require("../Errors");

class Post {

    _postStorage;

    constructor(postStorage) {
        this._postStorage = postStorage;
    }

    async getPurchasedPosts(data, headers){

        let validator = new Validator();

        validator.setRule('userId', Validator.TYPES.number().required());

        validator.validate(data);

        let posts = await this._postStorage.searchPurchasedPosts({
            client_id: data.userId
        })

        return posts;

    }

}

module.exports = Post;