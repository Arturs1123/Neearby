const Validator = require('../helpers/validator');
const {UserAlreadyFollowing, UserNotFound, UserNotFollowing, CannotFollowYourself} = require("../Errors");
const CONSTANTS = require('../Constants');


class Followings {

    _followersStorage;
    _userStorage;

    constructor(followersStorage, userStorage) {
        this._followersStorage = followersStorage;
        this._userStorage = userStorage;
    }

    // Стать фолловером
    async followAuthor(data, headers, user) {
        let validator = new Validator();

        validator.setRule('authorId', Validator.TYPES.number().required());

        validator.validate(data);

        let [checkIfExists] = await this._followersStorage.searchFollowings({
            author_id: data.authorId,
            follower_id: user.userId,
            active: true
        });

        if(data.authorId === user.userId){
            throw new CannotFollowYourself();
        }

        if(checkIfExists){
            throw new UserAlreadyFollowing();
        }

        let [authorSearch] = await this._userStorage.findUser({
            id: data.authorId,
            active: CONSTANTS.ACTIVE_USER_ACTIVE,
            role: CONSTANTS.ROLE_AUTHOR
        });

        if(!authorSearch){
            throw new UserNotFound();
        }

        await this._followersStorage.createFollowing({
            authorId: data.authorId,
            followerId: user.userId,
        });
    }

    // Перестать фолловить автора
    async unfollowAuthor(data, headers, user){
        let validator = new Validator();

        validator.setRule('authorId', Validator.TYPES.number().required());

        validator.validate(data);

        let [checkIfExists] = await this._followersStorage.searchFollowings({
            author_id: data.authorId,
            follower_id: user.userId,
            active: true
        });

        if(!checkIfExists){
            throw new UserNotFollowing();
        }

        await this._followersStorage.unfollowAuthor({
            authorId: data.authorId,
            followerId: user.userId,
        });
    };

    async getUserFollowings(data, headers){
        let validator = new Validator();

        validator.setRule('userId', Validator.TYPES.number().required());

        validator.validate(data);

        return await this._followersStorage.searchFollowings({
            follower_id: data.userId,
            active: true
        });
    }
}


module.exports = Followings;