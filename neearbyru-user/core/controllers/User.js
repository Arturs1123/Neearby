const Validator = require('../helpers/validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const CONSTANTS = require('../Constants');
const config = require('../../secret/config');
const uuid = require('uuid')
const path = require('path');
const {
    BadRequestError, InvalidCredentials, InvalidSession,
    SessionExpired, UnAuthorized, AccountIsNotVerified,
    UserNotFound, RecoveryTokenNotFound, InsufficientRole, UserNoRights, UserDeleted, TargetNotFound, UserIsBanned,
    UserNotRoleAuthor, SubdomainAlreadyTaken, ComplaintNotFound, FavoriteNotFound, NotAuthorThisTarget, RepostNotFound
} = require("../Errors");

const createRandomString = require("../helpers/createRandomString");

class User {

    static ROLE_REGISTERED = 1;
    static ROLE_AUTHOR = 2;
    static ROLE_ADMIN = 3;

    static ROLES = {
        'user': User.ROLE_REGISTERED,
        'author': User.ROLE_AUTHOR,
        'admin': User.ROLE_ADMIN,
    }


    _userStorage;
    _messageStorage;
    _messageController;
    _tokenSettings;
    _userDefaultSettings;
    _serviceMail;
    _serviceAuthor;

    constructor(userStorage, tokenSettings, userDefaultSettings, serviceMail, serviceAuthor, messageStorage, messageController) {
        this._userStorage = userStorage;
        this._messageStorage = messageStorage;
        this._messageController = messageController;
        this._tokenSettings = tokenSettings;
        this._userDefaultSettings = userDefaultSettings;
        this._serviceMail = serviceMail;
        this._serviceAuthor = serviceAuthor;
        this.salt = bcrypt.genSaltSync(10)
    }

    async getNotifications(data, headers, user) {
        let validator = new Validator();

        let notificationsList = await this._userStorage.searchNotification({target_user_id: user.userId});

        return notificationsList;
    }

    async getUnreadNotifications(data, headers, user) {
        let validator = new Validator();

        let notificationsList = await this._userStorage.searchUnreadNotification({target_user_id: user.userId})

        return notificationsList;
    }

    async readNotification(data, headers, user){
        let validator = new Validator();

        validator.setRule('notification_id', Validator.TYPES.number().required());
        validator.setRule('status', Validator.TYPES.number());

        validator.validate(data);


        await this._userStorage.readNotification({notification_id: data.notification_id}, data.status);

        return true;
    }

    async setSubdomain(data, headers, user) {
        let validator = new Validator();

        validator.setRule('login', Validator.TYPES.string().max(30).required());
        validator.validate(data);

        let usersBySubdomain = await this._userStorage.searchUser({login: data.login});

        for (let i in usersBySubdomain) {
            if (usersBySubdomain.id !== user.userId) {
                throw new SubdomainAlreadyTaken();
            }
        }

        await this._userStorage.updateUser({id: user.userId,}, {login: data.login});
        return {status: "Updated"};
    }

    async getProfile(data, headers) {

        let validator = new Validator();

        validator.setRule('login', Validator.TYPES.string().allow(null));
        validator.setRule('id', Validator.TYPES.number().allow(null))

        validator.validate(data);

        let searchObject = {
            active: CONSTANTS.ACTIVE_USER_ACTIVE
        }

        if (data.login) {
            searchObject.login = data.login
        }
        searchObject.login
        if (data.id) {
            searchObject.id = data.id
        }

        let [user] = await this._userStorage.searchUser(searchObject,
            ['id', 'login', 'name', 'phone', 'email', 'description', 'followers_count', 'reason_banned', 'subscribers_count', 'sells_count', 'cover_path_id', 'profile_picture_id']);

        const [coverPath] = await this._userStorage.searchCover({id: Number(user.cover_path_id)});
        const [profilePicture] = await this._userStorage.searchProfilePicture({id: Number(user.profile_picture_id)});

        user.cover_path = coverPath.cover_path;
        user.miniature = coverPath.miniature;
        user.profile_path = profilePicture.picture_path;
        user.profile_miniature = profilePicture.miniature;

        // delete user['profile_picture_id'];
        // delete user['cover_path_id'];

        return user;

    }

    // data - { role: 'user' }
    async whoami(data, headers) {

        if (!headers[CONSTANTS.USER_TOKEN_NAME] && !data.token) {
            throw new UnAuthorized("User is not authorized");
        }

        data.token = headers[CONSTANTS.USER_TOKEN_NAME]?.split(' ')[1] || data.token; // Вытаскиваем либо из header либо из body
        let validator = new Validator();
        validator.setRule('token', Validator.TYPES.string().required());
        validator.setRule('roles', Validator.TYPES.array());

        if (!data.roles || data.roles.length === 0) {
            data.roles = Object.keys(User.ROLES);
        }
        validator.validate(data);

        let decodedToken = await this.verifyToken(data.token);

        let [session] = await this._userStorage.findSession({token: data.token});

        if (!session) {
            throw new InvalidSession('Session was not found');
        }

        if (Date.now() / 1000 > decodedToken.exp) {
            throw new SessionExpired('Session expired');
        }

        let [user] = await this._userStorage.findUser({id: decodedToken.userObject.userId});

        if (!user) {
            throw new InvalidSession('User was not found');
        }

        let allowedRoles = [];

        for (let role of data.roles) {
            allowedRoles.push(User.ROLES[role]);
        }

        if (!allowedRoles.includes(user.role)) {
            throw new InsufficientRole()
        }

        const [coverPath] = await this._userStorage.searchCover({id: Number(user.cover_path_id)});
        const [profilePicture] = await this._userStorage.searchProfilePicture({id: Number(user.profile_picture_id)});

        return {
            email: decodedToken.userObject.email,
            phone: decodedToken.userObject.phone,
            userId: decodedToken.userObject.userId,
            name: decodedToken.userObject.name,
            role: user.role,
            sessionCreatedAt: session.created_at,
            sessionId: session.id,
            active: user.active,
            login: user.login,
            profile_picture_path: profilePicture.picture_path,
            profile_picture_id: user.profile_picture_id,
            profile_miniature: profilePicture.miniature,
            coverPath: coverPath.cover_path,
            coverPathId: user.cover_path_id,
            moderationRights: user.moderation_rights,
            moderationId: user.moderationId,
            balance: user.balance,
        }
    }

    async findUser(data, headers) {
        return await this._userStorage.findUser(data)
    }

    async searchCardUser(data) {
        return await this._userStorage.searchCardUser(data)
    }

    async addCard(data, headers, user) {
        const validator = new Validator();

        validator.setRule('card_number', Validator.TYPES.string().required());

        validator.validate(data);
        const [searchCard] = await this.searchCardUser({user_id: user.userId})

        if (!searchCard) {
            await this._userStorage.addCard({
                user_id: user.userId,
                card_number: data.card_number
            });

            return true;
        }

        await this._userStorage.updateCard({id: searchCard.id}, {
            card_number: data.card_number
        });

        return true;
    }

    async findSessions(data, headers, user) {
        let sessionsList = await this._userStorage.findSessionCreatedLater(user.sessionCreatedAt);

        let sessionsInfo = {
            currentSessionId: user.sessionId,
            sessions: sessionsList
        }

        return sessionsInfo;
    }

    async deleteSession(data, headers, user) {

        let validator = new Validator();
        validator.setRule('sessionId', Validator.TYPES.number().required());
        validator.validate(data);

        let sessionsList = await this._userStorage.findSessionCreatedLater(user.sessionCreatedAt);

        sessionsList = sessionsList.filter(element => element.id === data.sessionId);

        if (!sessionsList.length) {
            throw new InvalidSession('Session with provided ID was not found');
        }

        await this._userStorage.deleteSession(data.sessionId);

        return `Session with ID ${data.sessionId} was deleted`;


    }

    async passwordRecovery(data, headers) {

        let validator = new Validator();
        validator.setRule('email', Validator.TYPES.string().email().required());
        validator.validate(data);

        let [user] = await this._userStorage.findUser({email: data.email});

        if (!user) {
            throw new UserNotFound('User with provided email was not found');
        }

        // let recoveryToken = [...Array(50)].map(() => Math.random().toString(36)[2]).join('')
        // await this._userStorage.addPasswordRecoveryToken({
        //     user_id: user.id,
        //     token: recoveryToken
        // })

        let newPassword = createRandomString(30);

        await this._userStorage.updateUser(
            {
                email: data.email
            },
            {
                password: bcrypt.hashSync(newPassword, this.salt)
            })

        await this._serviceMail.passwordRecovery({
            email: user.email,
            name: user.name,
            password: newPassword
        })

        return true;


    }

    async passwordRecoveryWithToken(data, headers) {

        let validator = new Validator();

        validator.setRule('password', Validator.TYPES.string().min(6).max(40).required());
        validator.setRule('token', Validator.TYPES.string().required());
        validator.validate(data);

        let [tokenInfo] = await this._userStorage.findRecoveryToken({token: data.token})

        if (!tokenInfo) {
            throw new RecoveryTokenNotFound('Provided token not found');
        }

        let [user] = await this._userStorage.findUser({id: tokenInfo.user_id});

        if (!user) {
            throw new UserNotFound('User with attached token id not found');
        }

        let encryptedPassword = bcrypt.hashSync(data.password, this.salt);

        await this._userStorage.updateUserPassword(user.id, encryptedPassword);
        await this._userStorage.clearRecoveryTokensForUser(user.id);


        return true;
    }

    //---------------------------------------------------Модерация обложки и аватарки----------------------------------------------
    async addPictureInUser(data, headers, user) {
        const validator = new Validator();

        validator.setRule('picture_path', Validator.TYPES.string().required());

        validator.validate(data)

        const [pictureId] = await this._userStorage.createProfilePicture({picture_path: data.picture_path, active: 1});

        return await this._userStorage.updateUser({id: user.userId}, {profile_picture_id: pictureId})
    }

    async updateProfilePicture(data, headers, user) {
        const validator = new Validator();

        validator.setRule('picture_path', Validator.TYPES.string().required());

        validator.validate(data);

        let active = 0

        if (user.role === CONSTANTS.ROLE_ADMIN) {
            active = 1
        }

        return await this._userStorage.updateProfilePicture({id: user.profilePictureId}, {
            picture_path: data.picture_path,
            active: active,
        });
    }

    // async searchProfilePicture(data) {
    //     return await this._userStorage.updateProfilePicture({id: user.profile_picture_id},{picture_path: data.picture_path, active: active});
    // }

    async updateProfilePictureMiniature(data, headers, user){
        const validator = new Validator();

        validator.setRule('miniature', Validator.TYPES.string().required());
        validator.validate(data);

        await this._userStorage.updateProfileAvatar({id: user.profile_picture_id},{miniature: data.miniature});
        return true
    }

    async updateProfileCoverMiniature(data, headers, user){
        const validator = new Validator();

        validator.setRule('miniature', Validator.TYPES.string().required());
        validator.validate(data);

        await this._userStorage.updateProfileCover({id: user.coverPathId},{miniature: data.miniature});
        return true
    }

    async updateProfileAvatar(data, headers, user){
        const validator = new Validator();
        validator.setRule('id', Validator.TYPES.number());
        validator.setRule('picture_path', Validator.TYPES.string());
        validator.validate(data);
        return await this._userStorage.updateProfileAvatar({id: data.id}, {picture_path: data.picture_path, miniature: ''});
    }
    async deleteAvatar(data, headers, user){
        return await this._userStorage.updateProfileAvatar({id: user.profile_picture_id}, {picture_path: 'defaultPicture.jpg', miniature: ''});
    }
    async updateModerationProfileAvatar(data, headers, user){
        const {img} = data;
        let fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, '../', '..','static', fileName));
        return await this._userStorage.updateModerationProfileAvatar({id: user.id, img_path: fileName, name_user: user.name, number_user: user.phone, email_user: user.email, avatar_id: user.profile_picture_id, status: 0, created_at: Date.now()});
    }

    // async findModerationProfileAvatar(data) {
    //     const covered = await this._userStorage.searchedCover({img_path: data.img_path});
    //     return covered;
    // }
    // async deleteModerationAvatar(data, headers, user){
    //     return await this._userStorage.updateModerationProfileAvatar({id: user.profile_picture_id}, {picture_path: 'defaultPicture.jpg', miniature: ''});
    // }

    async updateProfileCover(data, headers, user){
        const validator = new Validator();
        validator.setRule('id', Validator.TYPES.number());
        validator.setRule('cover_path', Validator.TYPES.string());
        validator.validate(data);
        return await this._userStorage.updateProfileCover({id: data.id}, {cover_path: data.cover_path, miniature: ''});
    }
    async deleteCover(data, headers, user){
        return await this._userStorage.updateProfileCover({id: user.coverPathId}, {cover_path: 'defaultCover.jpg', miniature: ''});
    }

    async updateModerationProfileCover(data, headers, user){
        const {img} = data;
        let fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, '../', '..','static', fileName));
        return await this._userStorage.updateModerationProfileCover({id: user.id, img_path: fileName, name_user: user.name, number_user: user.phone, email_user: user.email, cover_id: user.coverPathId, status: 0, created_at: Date.now()});
    }

    // async findModerationProfileCover(data) {
    //     const covered = await this._userStorage.searchedCover({img_path: data.img_path});
    //     return covered;
    // }

    // async deleteCoverModer(data, headers, user){
    //     return await this._userStorage.updateModerationProfileCover({id: user.userId}, {img_path: 'defaultCover.jpg'});
    // }


    // async deleteModerationCover(data, headers, user){
    //     return await this._userStorage.updateModerationProfileCover({id: user.coverPathId}, {cover_path: 'defaultCover.jpg', miniature: ''});
    // }

    // async updateModerationProfileCoverStatus(data, headers, user){
    //     return await this._userStorage.updateModerationProfileCover({id: user.id, img_path: fileName, cover_id: user.coverPathId, status: 0});
    // }

    async updateModerationProfileAvatarStatus(data, headers, user){
        let validator = new Validator();

        validator.setRule('status', Validator.TYPES.number());

        validator.validate(data);
        return await this._userStorage.updateProfileAvatarStatus(data.status);
    }
    async updateModerationProfileAvatarStatusCancel(data, headers, user){
        let validator = new Validator();

        validator.setRule('status', Validator.TYPES.number());

        validator.validate(data);
        return await this._userStorage.updateProfileAvatarStatusCancel(data.status);
    }

    async updateModerationProfilePictureStatus(data, headers, user){
        let validator = new Validator();

        validator.setRule('status', Validator.TYPES.number());

        validator.validate(data);
        return await this._userStorage.updateProfilePictureStatus(data.status);
    }
    async updateModerationProfilePictureStatusCancel(data, headers, user){
        let validator = new Validator();

        validator.setRule('status', Validator.TYPES.number());

        validator.validate(data);
        return await this._userStorage.updateProfilePictureStatusCancel({id: user.id}, data.status);
    }


    async findModerationProfileCover(data) {
        return await this._userStorage.searchModerProfilePicture({
            img_path: data.img_path,
            status: data.status
        });
    }

    async searchCoverAcceptAdmin(data, headers, user) {
        let validator = new Validator();

        validator.validate(data);

        let whereObject = {};

        let covers = await this._userStorage.searchCoversAcceptAdmin({...whereObject});

        return covers;
    }
    async searchCoverCancelAdmin(data, headers, user) {
        let validator = new Validator();

        validator.validate(data);

        let whereObject = {};

        let covers = await this._userStorage.searchCoversCancelAdmin({...whereObject});

        return covers;
    }


    async findModerationProfileAvatars(data) {
        return await this._userStorage.searchModerProfileAvatars({
            img_path: data.img_path,
            status: data.status
        });
    }

    async searchAvatarsAcceptAdmin(data, headers, user) {
        let validator = new Validator();

        validator.validate(data);

        let whereObject = {};

        let covers = await this._userStorage.searchAvatarsAcceptAdmin({...whereObject});

        return covers;
    }
    async searchAvatarsCancelAdmin(data, headers, user) {
        let validator = new Validator();

        validator.validate(data);

        let whereObject = {};

        let covers = await this._userStorage.searchAvatarsCancelAdmin({...whereObject});

        return covers;
    }

    async banAvatarsForAdmin(data){
        let validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());
        validator.setRule('status', Validator.TYPES.number().required());

        validator.validate(data);
        return await this._userStorage.banAvatar(data);
    }

    async unbanAvatarsForAdmin(data){
        let validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());
        validator.setRule('status', Validator.TYPES.number().required());

        validator.validate(data);
        return await this._userStorage.unbanAvatar(data);
    }



    async searchProductAdmin(data, headers, user) {
        let validator = new Validator();

        validator.validate(data);

        let whereObject = {};

        let products = await this._userStorage.searchProductAdmin({...whereObject});

        return products;
    }
    async searchProductAcceptAdmin(data, headers, user) {
        let validator = new Validator();

        validator.validate(data);

        let whereObject = {};

        let products = await this._userStorage.searchProductAcceptAdmin({...whereObject});

        return products;
    }
    async searchProductCancelAdmin(data, headers, user) {
        let validator = new Validator();

        validator.validate(data);

        let whereObject = {};

        let products = await this._userStorage.searchProductCancelAdmin({...whereObject});

        return products;
    }

    async deleteCoverModer(data, headers, user){
        return await this._userStorage.deleteModerCover({id: data.id});
    }


    async findModerationProfileAvatar(data) {
        return await this._userStorage.searchModerProfileAvatar({
            img_path: data.img_path,
            status: data.status
        });
    }

    async findModerationProfileAvatarStatus(data) {
        return await this._userStorage.searchModerProfileAvatarStatus({
            img_path: data.img_path,
            status: data.status
        });
    }

    async findModerationProfileCoverStatus(data) {
        return await this._userStorage.searchModerProfileCoverStatus({
            img_path: data.img_path,
            status: data.status
        });
    }

    async searchCoversByIds(data){
        const validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());
        validator.validate(data);

        return await this._userStorage.searchCoveredByIds(data);
    }

    async searchAvatarsByIds(data){
        const validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());
        validator.validate(data);

        return await this._userStorage.searchAvataredByIds(data);
    }

    async deleteCoverAvatar(data, headers, user){
        // return await this._userStorage.deleteModerAvatar({id: data.id});

        await this._userStorage.deleteModerAvatar(user.id);

        return true;
    }

    async searchProfilePicture(data) {
        return await this._userStorage.searchProfilePicture(data);
    }

    async addCoverInUser(data, headers, user) {
        const validator = new Validator();

        validator.setRule('cover_path', Validator.TYPES.string().required());

        validator.validate(data)

        const [coverId] = await this._userStorage.createCover({cover_path: data.cover_path, active: 1});

        return await this._userStorage.updateUser({id: user.userId}, {cover_path_id: coverId})
    }

    async updateCover(data, headers, user) {
        const validator = new Validator();

        validator.setRule('cover_path', Validator.TYPES.string().required());

        validator.validate(data)

        let active = 0

        if (user.role === CONSTANTS.ROLE_ADMIN) {
            active = 1
        }

        return await this._userStorage.updateCover({id: user.coverPathId}, {
            cover_path: data.cover_path,
            active: active
        })
    }

    async searchCoversForModeration(data) {
        const covers = await this._userStorage.searchCover({active: 0});

        const coversIds = covers.map(elem => elem.id)
        const users = await this._userStorage.findUsersByCoversIds(coversIds)

        for (let cover of covers) {
            cover.user = users.find(elem => elem.cover_path_id === cover.id);
        }

        return covers;
    }

    async searchProfilePicturesForModeration(data) {
        const pictures = await this._userStorage.searchProfilePicture({active: 0});

        const pictureIds = pictures.map(elem => elem.id);
        const users = await this._userStorage.findUsersByProfilePicturesIds(pictureIds);

        for (let picture of pictures) {
            picture.user = users.find(elem => elem.profile_picture_id === picture.id);
        }

        return pictures;
    }

    async confirmModerationCover(data) {
        const validator = new Validator();

        validator.setRule('coverId', Validator.TYPES.number().required());

        validator.validate(data);

        return await this._userStorage.updateCover({id: data.coverId}, {active: 1});
    }

    async confirmModerationProfilePicture(data) {
        const validator = new Validator();

        validator.setRule('pictureId', Validator.TYPES.number().required());

        validator.validate(data);

        return await this._userStorage.updateProfilePicture({id: data.pictureId}, {active: 1});
    }

    //--------------------------------------------------------------------------------------------

    async confirmedRegistration(body) {
        const validator = new Validator();

        validator.setRule('token', Validator.TYPES.string().required());

        validator.validate(body);

        const confirmedRow = await this._userStorage.findTokenForConfirmedRegistration({token: body.token})

        if (!confirmedRow) {
            return false
        }

        await this._userStorage.confirmedRegistration(confirmedRow.id, confirmedRow.user_id);

        const [user] = await this._userStorage.findUser({id: confirmedRow.user_id});

        await this._serviceMail.mailAfterConfirmedRegistration({
            name: user.name,
            email: user.email
        });

        return true
    }

    async authenticate(data, headers) {

        let validator = new Validator();
        console.log(data);
        validator.setRule('email', Validator.TYPES.string().email().required());
        validator.setRule('password', Validator.TYPES.string().required());

        validator.validate(data);

        let [user] = await this._userStorage.findUser({email: data.email});

        if (!user) {
            throw new InvalidCredentials("No user with specified login and password found");
        }

        if (user.active === 0) {
            throw new AccountIsNotVerified("You need to verify account to proceed");
        }

        let compared = bcrypt.compareSync(data.password, user.password);

        if (compared === true) {

            let userObject = {
                userId: user.id,
                email: user.email,
                phone: user.phone,
                name: user.name,
                ip: headers.clientIp,
                role: user.role
            }
            return await this.createToken(userObject)
        }

        throw new InvalidCredentials("No user with specified login and password found");

    }

    async registration(data, headers) {

        let validator = new Validator();

        validator.setRule('name', Validator.TYPES.string().min(2).required());
        validator.setRule('email', Validator.TYPES.string().email().required());
        validator.setRule('phone',
            Validator.TYPES.string()
                .regex(new RegExp('^(\\+7|7|8)?[\\s\\-]?\\(?[489][0-9]{2}\\)?[\\s\\-]?[0-9]{3}[\\s\\-]?[0-9]{2}[\\s\\-]?[0-9]{2}$'))
                .required());
        validator.setRule('password', Validator.TYPES.string().min(6).max(40));

        validator.validate(data);

        let checkIfUserExists = await this._userStorage.findUser({email: data.email});

        if (checkIfUserExists.length) {
            throw new BadRequestError("User already exists");
        }

        if (!data.password) {
            data.password = createRandomString(30);
        }

        data.encryptedPassword = bcrypt.hashSync(data.password, this.salt);

        console.log(data.password, data.encryptedPassword);

        data.role = User.ROLE_REGISTERED;


console.log('regUser: ', data)

        let userId = await this._userStorage.createNewUser(data);

        let userObject = {
            userId,
            email: data.email,
            phone: data.phone,
            name: data.name,
            ip: headers.clientIp,
            role: this._userDefaultSettings.USER_DEFAULT_ROLE
        }

        let tokenConfirmedRegistration = await this.generateToken(32);
        await this._userStorage.insertConfirmedTokenIntroDatabase(tokenConfirmedRegistration, userId);

        await this.addCoverInUser({
            cover_path: 'defaultCover.jpg',
        }, headers, {userId: userId});

        await this.addPictureInUser({
            picture_path: 'defaultPicture.jpg',
        }, headers, {userId: userId});

        const adminAuthToken = await this.authenticate({
            email: config.USER_NEEARBY_SUPPORT_EMAIL,
            password: config.USER_NEEARBY_SUPPORT_PASSWORD
        }, headers);

        headers[CONSTANTS.USER_TOKEN_NAME] = adminAuthToken;

        const neearbySupportUser = await this.whoami({token: adminAuthToken, roles: ['admin']}, headers)

        const [chatId] = await this._messageStorage.createChat({title: neearbySupportUser.name}, neearbySupportUser.userId);
        await this._messageStorage.addUserToChat({chatId: chatId, userId: userObject.userId});

        await this._userStorage.createNotification({
            target_user_id: userId,
            payload: {
                type: 'service',
                from: {
                    name: 'Neearby.com',
                    link: 'http://neearby.ru'
                },
                text: `${data.name}, поздравляем! Теперь вы сможете продавать товары и подписки`,
                onShow: 'http://neearby.ru/messenger'
            }
        })

        await this._messageStorage.sendMessage({
            userId: 2,
            chatId: chatId,
            text: `${data.name}, здравствуйте! \n` +
                'На связи команда Neearby. <br> \n' +
                ' \n' +
                'Поздравляем Вас! Вы выполнили уже 50% шагов. <br> \n' +
                'Осталось ещё 50%, чтобы начать зарабатывать. <br> \n' +
                ' <br> \n' +
                'Шаг 1. Вам нужно создать свои товары для разовой <br> \n' +
                'оплаты от Ваших клиентов. <br> \n' +
                'Не знаете какой товар создать? Воспользуйтесь готовым <br> \n' +
                'каталогом популярных товаров с правами-перепродажи и <br> \n' +
                'начните зарабатывать на них. <br> \n' +
                ' \n' +
                'Войти в каталог товаров с правами-перепродажи >>>  <a style="color: blue" target="_blank" href="https://alexhotpro.neearby.com/catalog-of-goods-with-resale-rights">https://alexhotpro.neearby.com/catalog-of-goods-with-resale-rights</a> <br> \n' +
                ' \n' +
                'Шаг 2. Ежемесячные платежи или ежемесячный доход на автомате.<br>  \n' +
                'Не знаете какую подписку создать? Воспользуйтесь готовым <br> \n' +
                'каталогом популярных подписок с правами-перепродажи и <br> \n' +
                'начните зарабатывать на них. <br> \n' +
                ' \n' +
                'Войти в каталог подписок с правами-перепродажи >>> <a style="color: blue" target="_blank" href="https://alexhotpro.neearby.com/resell-rights-subscription-catalog">https://alexhotpro.neearby.com/resell-rights-subscription-catalog</a> \n' +
                ' <br> \n' +
                'Эти 2 необходимых шага, которые Вам необходимо сделать <br> \n' +
                'для того, чтобы Вы смогли получать деньги. <br> \n' +
                ' \n' +
                '  \n' +
                'Как только сделайте этот шаг - загрузите свою  фотографию, <br> обложку, укажите в разделе  вывод средств свою карту для получения  денежных средств после продаж. <br> \n' +
                ' \n' +
                'Не знаете как рекламировать? Возникают какие-то  другие сложности? <br> \n' +
                ' <br> \n' +
                'Приведите в наш официальный Telegram-бот  <br> <a style="color: blue" target="_blank" href="https://t.me/neearbycom1_bot">https://t.me/neearbycom1_bot</a> друзей, получите <br> \n' +
                'на свой баланс 500 рублей и конечно же <br> \n' +
                'полную инструкцию заработка на Neeaby 2.0! <br> \n' +
                ' \n' +
                'Есть вопросы? Обращайтесь - поможем!  support@neearby.com <br> \n' +
                ' <br> \n' +
                'P.S. Обязательно сохраните это письмо! <br> \n' +
                ' <br> \n' +
                'С уважением, команда Neearby <br> \n' +
                'Neearby — всегда рядом!<br> '
        })

        await this._serviceMail.registrationAndConfirmation({
            name: data.name,
            email: data.email,
            link: `http://${config.FRONT_ADDRESS}/thank-you-for-registering?token=${tokenConfirmedRegistration}`,  // Ссылка на подтверждение регистрации
            password: data.password
        });

        return {
            ...userObject,
            token: await this.createToken(userObject)
        }
    }

    async becomeAuthor(data, headers, user) {

        let validator = new Validator();

        validator.setRule('login', Validator.TYPES.string().min(4).required());

        validator.validate(data);

        if (!user) {
            throw new UserNotFound();
        }

        let checkIfUsed = await this._userStorage.findUser({login: data.login});

        if(checkIfUsed.length){
            throw new SubdomainAlreadyTaken();
        }

        await this._userStorage.updateUser({id: user.userId}, {
            login: data.login,
            role: CONSTANTS.ROLE_AUTHOR
        });

        await this._serviceMail.mailAfterBecomeAuthor({
            name: user.name,
            email: user.email
        });

        return true
    }

    async getAllUsers(filter, value) {
        let users

        switch (filter) {
            case 'all':
                users = await this._userStorage.findAllUser();
                break;
            case 'banned':
                users = await this._userStorage.findUser({active: 2});
                break;
            case 'notBanned':
                users = await this._userStorage.findUser({active: 1});
                break;
            case 'notConfirmed':
                users = await this._userStorage.findUser({active: 0});
                break;
            default:
                users = await this._userStorage.findAllUser();
                break;
        }

        if (users.length === 0) {
            throw new UserNotFound();
        }

        return users
    }

    async banUser(data, headers, user) {

        const validator = new Validator();

        validator.setRule('userId', Validator.TYPES.number().required());
        validator.setRule('reason_banned', Validator.TYPES.string().required());

        validator.validate(data);

        if (user.role !== CONSTANTS.ROLE_ADMIN) {
            throw new UserNoRights();
        }

        const [userBan] = await this._userStorage.findUser({id: data.userId})

        if (!userBan) {
            throw new UserNotFound();
        }

        await this._userStorage.updateUser(
            {id: data.userId},
            {
                active: CONSTANTS.ACTIVE_USER_BANNED, reason_banned: JSON.stringify({
                    admin_id: user.userId,
                    reason_banned: data.reason_banned
                })
            }
        );

        return true
    }

    async unbanUser(data, headers, user) {

        const validator = new Validator();

        validator.setRule('userId', Validator.TYPES.number().required());

        validator.validate(data);

        if (user.role !== CONSTANTS.ROLE_ADMIN) {
            throw new UserNoRights();
        }

        const [userUnBan] = await this._userStorage.findUser({id: data.userId})

        if (!userUnBan) {
            throw new UserNotFound();
        }
        if (userUnBan.active === CONSTANTS.ACTIVE_USER_DELETED) {
            throw new UserDeleted();
        }

        await this._userStorage.updateUser(
            {id: data.userId},
            {active: CONSTANTS.ACTIVE_USER_ACTIVE, reason_banned: null}
        );

        return true
    }

    async createComplaint(data, headers, user) {
        const validator = new Validator();

        validator.setRule('type', Validator.TYPES.number().required());
        validator.setRule('id', Validator.TYPES.number().required());
        validator.setRule('message', Validator.TYPES.string().required());

        validator.validate(data);

        let complaint;

        switch (data.type) {
            case CONSTANTS.ComplaintTarget.Product:
                [complaint] = await this._serviceAuthor.searchProduct({id: data.id});
                break;
            case CONSTANTS.ComplaintTarget.Subscription:
                [complaint] = await this._serviceAuthor.searchSubscription({id: data.id});
                break;
            case CONSTANTS.ComplaintTarget.Post:
                [complaint] = await this._serviceAuthor.searchPost({id: data.id});
                break;
            case CONSTANTS.ComplaintTarget.Ads:
                // TODO:для обьявлений
                break;
            case CONSTANTS.ComplaintTarget.Cover:
                [complaint] = await this._userStorage.searchCover({id: data.id});
                break;
            case CONSTANTS.ComplaintTarget.ProfilePicture:
                [complaint] = await this._userStorage.searchProfilePicture({id: data.id});
                break;
            case CONSTANTS.ComplaintTarget.Message:
                [complaint] = await this._messageStorage.searchMessage({id: data.id});
                break;
            case CONSTANTS.ComplaintTarget.Comment:
                [complaint] = await this._userStorage.searchComment({id: data.id});
                break;
        }

        if (!complaint) {
            throw new ComplaintNotFound();
        }

        data.clientId = user.userId;

        await this._userStorage.createComplaint(data);

        return true
    }

    async addFavorites(data, headers, user) {
        const validator = new Validator();

        validator.setRule('type', Validator.TYPES.number()); // 1-Likes 2-Comments 3-Reposts 4-Favorites
        validator.setRule('target_type', Validator.TYPES.number().required());
        validator.setRule('target_id', Validator.TYPES.number().required());

        validator.validate(data);

        let target

        switch (data.target_type) {
            case CONSTANTS.TargetType.Product:
                [target] = await this._userStorage.searchProduct({id: data.target_id});
                break;
            case CONSTANTS.TargetType.Subscription:
                [target] = await this._userStorage.searchSubscription({id: data.target_id});
                break;
            case CONSTANTS.TargetType.Post:
                [target] = await this._userStorage.searchPost({id: data.target_id});
                break;
        }

        if (!target) {
            throw new TargetNotFound();
        }

        data.user_id = user.userId;

        if (!data.type) {
            data.type = CONSTANTS.FavoriteType.Favorites;
        }

        await this._userStorage.addInFavorites(data)

        return true
    }

    async searchFavorites(data, headers, user) {
        const validator = new Validator();

        validator.setRule('type', Validator.TYPES.number().required());

        validator.validate(data);

        const favorites = await this._userStorage.searchFavorites({
            user_id: user.userId,
            active: CONSTANTS.FavoriteActive.Active,
            type: data.type
        });

        if (!favorites.length) {
            return [];
        }

        const targetIds = {
            1: [],  // productsIds
            2: [],  // subscriptionsIds
            3: [],  // postsIds
        };

        for (let favorite of favorites) targetIds[favorite.target_type].push(favorite.target_id);

        const productsByFavorite = await this._serviceAuthor.searchProductsByIds({ids: targetIds[CONSTANTS.TargetType.Product]});
        const subscriptionsByFavorite = await this._serviceAuthor.searchSubscriptionsByIds({ids: targetIds[CONSTANTS.TargetType.Subscription]});
        const postsByFavorite = await this._serviceAuthor.searchPostsByIds({ids: targetIds[CONSTANTS.TargetType.Post]});

        for (let favorite of favorites.reverse()) {
            let target

            if (favorite.target_type === CONSTANTS.TargetType.Product) {
                target = productsByFavorite.find(product => product.id === favorite.target_id);
            } else if (favorite.target_type === CONSTANTS.TargetType.Subscription) {
                target = subscriptionsByFavorite.find(subscription => subscription.id === favorite.target_id);
            } else if (favorite.target_type === CONSTANTS.TargetType.Post) {
                target = postsByFavorite.find(post => post.id === favorite.target_id);
            }

            favorite.target = target;
        }

        return favorites;
    }

    async deleteFavorite(data, headers, user) {
        const validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());

        validator.validate(data);

        const [searchFavorite] = await this._userStorage.searchFavorites({
            id: data.id,
            active: CONSTANTS.FavoriteActive.Active
        });

        if (!searchFavorite) {
            throw new FavoriteNotFound();
        }

        if (user.role !== CONSTANTS.ROLE_ADMIN) {
            if (user.userId !== searchFavorite.user_id) {
                throw new NotAuthorThisTarget('You not author this target in favorites');
            }
        }

        await this._userStorage.deleteFavorite({id: data.id});

        return true;
    }

    async serviceDeleteFavorite(data) {
        return await this._userStorage.updateFavorite(data, {active: CONSTANTS.FavoriteActive.Delete});
    }

    async searchComplaints(data, headers, user) {

        if (data.complaintId) {
            data.id = Number(data.complaintId)
            delete data.complaintId
            delete data.clientId
        } else if (data.clientId) {
            data.client_id = Number(data.clientId)
            delete data.complaintId
            delete data.clientId
        } else if (!data.complaintId && !data.clientId) {
            delete data.complaintId
            delete data.clientId
        }

        const complaints = await this._userStorage.searchComplaint({...data, active: CONSTANTS.ComplaintType.Created});

        const ids = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
        }

        complaints.forEach(elem => {
            ids[elem.type].push(elem.target_id)
        })

        const targets = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
        }

        for (let key in ids) {
            switch (Number(key)) {
                case CONSTANTS.ComplaintTarget.Product:
                    targets[CONSTANTS.TargetType.Product] = await this._serviceAuthor.searchProductsByIds({ids: ids[key]})
                    break
                case CONSTANTS.ComplaintTarget.Subscription:
                    targets[CONSTANTS.TargetType.Subscription] = await this._serviceAuthor.searchSubscriptionsByIds({ids: ids[key]})
                    break
                case CONSTANTS.ComplaintTarget.Post:
                    targets[CONSTANTS.TargetType.Post] = await this._serviceAuthor.searchPostsByIds({ids: ids[key]})
                    break
                case CONSTANTS.ComplaintTarget.Ads:
                    // TODO:для обьявлений
                    break;
                case CONSTANTS.ComplaintTarget.Cover:
                    targets[CONSTANTS.ComplaintTarget.Cover] = await this._userStorage.searchCoverByIds(ids[key])
                    break;
                case CONSTANTS.ComplaintTarget.ProfilePicture:
                    targets[CONSTANTS.ComplaintTarget.ProfilePicture] = await this._userStorage.searchProfilePictureByIds(ids[key])
                    break;
                case CONSTANTS.ComplaintTarget.Message:
                    targets[CONSTANTS.ComplaintTarget.Message] = await this._messageStorage.searchMessageByIds(ids[key])
                    break;
                case CONSTANTS.ComplaintTarget.Comment:
                    targets[CONSTANTS.ComplaintTarget.Comment] = await this._userStorage.searchCommentByIds(ids[key])
                    break;
            }
        }

        const usersIds = [];

        for (let key in targets) {
            targets[key].forEach(elem => {
                if (Number(key) === CONSTANTS.ComplaintTarget.Post ||
                    Number(key) === CONSTANTS.ComplaintTarget.Product ||
                    Number(key) === CONSTANTS.ComplaintTarget.Subscription ||
                    Number(key) === CONSTANTS.ComplaintTarget.Ads) {
                    usersIds.push(elem.author_id)
                } else if (
                    Number(key) === CONSTANTS.ComplaintTarget.Comment
                ) {
                    usersIds.push(elem.user_id)
                } else if (
                    Number(key) === CONSTANTS.ComplaintTarget.Message
                ) {
                    usersIds.push(elem.message_author_id)
                }
            })
        }

        const allUsers = await this._userStorage.findUsersByArrayId(usersIds);

        for (let i = 0; i < complaints.length; i++) {
            const target = targets[complaints[i].type].find(el => el.id === complaints[i].target_id);
            const author = allUsers.find(el => el.id === Number(target.author_id));
            if (author) {
                complaints[i].author = author;
                complaints[i].target = target;

                complaints[i].userDeleted = false;
                complaints[i].userBanned = false;
                if (author.active === CONSTANTS.ACTIVE_USER_DELETED) {
                    complaints[i].userDeleted = true;
                } else if (author.active === CONSTANTS.ACTIVE_USER_BANNED) {
                    complaints[i].userBanned = true;
                }
            }

        }

        return complaints
    }

    async myPurchases(data, headers, user) {
        const validator = new Validator();

        validator.setRule('type', Validator.TYPES.number());

        validator.validate(data);

        if (data.type === undefined || !data.type) {
            data.type = 1
        }

        let targets

        switch (data.type) {
            case CONSTANTS.TargetType.Product:
                targets = await this._serviceAuthor.myProductsPurchase({userId: user.userId});
                break;

            case CONSTANTS.TargetType.Subscription:
                targets = await this._serviceAuthor.mySubscriptionsPurchase({userId: user.userId});
                break;

            case CONSTANTS.TargetType.Post:
                targets = await this._serviceAuthor.myPostsPurchase({userId: user.userId});
                break
        }

        return targets
    }

    async deleteComplaints(data, headers, user) {
        return await this._userStorage.deleteComplaints({id: data.complaintId})
    }

    async updateModerationRights(data) {
        const [user] = await this._userStorage.findUser({id: data.userId});
        if (user.active === CONSTANTS.ACTIVE_USER_BANNED) {
            throw new UserIsBanned();
        }

        if (user.role === CONSTANTS.ROLE_REGISTERED) {
            throw new InsufficientRole('User not have role author');
        }

        await this._userStorage.updateUser({id: data.userId}, {moderation_rights: data.moderationRights});

        return true;
    }

    async repostOnWall(data, headers, user) {
        const validator = new Validator();

        validator.setRule('target_type', Validator.TYPES.number().required());
        validator.setRule('target_id', Validator.TYPES.number().required());

        validator.validate(data);

        data.user_id = user.userId;
        data.type = CONSTANTS.RepostType.Wall;
        data.active = CONSTANTS.RepostActive.Active;

        let target;

        switch (data.target_type) {
            case CONSTANTS.TargetType.Post:
                [target] = await this._serviceAuthor.searchPost({id: data.target_id}, headers);
                break;
            case CONSTANTS.TargetType.Product:
                [target] = await this._serviceAuthor.searchProduct({id: data.target_id});
                break;
            case CONSTANTS.TargetType.Subscription:
                [target] = await this._serviceAuthor.searchSubscription({id: data.target_id});
                break;
        }

        await this._userStorage.addRepost(data);

        await this.addFavorites({
            type: CONSTANTS.FavoriteType.Reposts,
            target_type: data.target_type,
            target_id: data.target_id
        }, headers, user);

        return true;
    }

    async repostOnMessage(data, headers, user) {
        const validator = new Validator();

        validator.setRule('target_type', Validator.TYPES.number().required());
        validator.setRule('target_id', Validator.TYPES.number().required());
        validator.setRule('chat_id', Validator.TYPES.number().required());

        validator.validate(data);

        const chatId = data.chat_id;
        delete data.chat_id;

        data.user_id = user.userId;
        data.type = CONSTANTS.RepostType.Message;
        data.active = CONSTANTS.RepostActive.Active;

        let target;

        switch (data.target_type) {
            case CONSTANTS.TargetType.Post:
                [target] = await this._serviceAuthor.searchPost({id: data.target_id}, headers);
                break;
            case CONSTANTS.TargetType.Product:
                [target] = await this._serviceAuthor.searchProduct({id: data.target_id});
                break;
            case CONSTANTS.TargetType.Subscription:
                [target] = await this._serviceAuthor.searchSubscription({id: data.target_id});
                break;
        }

        await this._userStorage.addRepost(data);

        await this.addFavorites({
            type: CONSTANTS.FavoriteType.Reposts,
            target_type: data.target_type,
            target_id: data.target_id
        }, headers, user);

        await this._messageController.sendMessage({
            text: JSON.stringify({...target, reposted_from: target.author_id}),
            chatId: chatId
        }, headers, user);

        return true;
    }

    async searchMyReportsOnWall(data, headers, user) {
        const reposts = await this._userStorage.searchReposts({user_id: user.userId});

        const targetIds = {
            1: [], // products
            2: [], // subscription
            3: []  // posts
        };

        for (let repost of reposts) targetIds[repost.target_type].push(repost.target_id);

        const products = await this._serviceAuthor.searchProductsByIds({ids: targetIds[CONSTANTS.TargetType.Product]});
        const subscriptions = await this._serviceAuthor.searchSubscriptionsByIds({ids: targetIds[CONSTANTS.TargetType.Subscription]});
        const posts = await this._serviceAuthor.searchPostsByIds({ids: targetIds[CONSTANTS.TargetType.Post]});

        for (let repost of reposts) {
            let target;

            switch (repost.target_type) {
                case CONSTANTS.TargetType.Product:
                    target = products.find(product => product.id === repost.target_id);
                    break;
                case CONSTANTS.TargetType.Subscription:
                    target = subscriptions.find(product => product.id === repost.target_id);
                    break;
                case CONSTANTS.TargetType.Post:
                    target = posts.find(product => product.id === repost.target_id);
                    break
            }


            repost.target = target;

            const [authorTarget] = await this._userStorage.findUser({id: target.author_id});
            const [profilePicture] = await this.searchProfilePicture({id: authorTarget.profile_picture_id});

            repost.target.author = {
                profile_path: profilePicture.picture_path,
                name: authorTarget.name,
                login: authorTarget.login || null
            };
        }

        return reposts;
    }

    async deleteRepost(data, headers, user) {
        const validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());

        validator.validate(data);

        const [repost] = await this._userStorage.searchReposts({
            id: data.id,
            active: CONSTANTS.RepostActive.Active
        });

        if (!repost) {
            throw new RepostNotFound();
        }

        const [favorite] = await this._userStorage.searchFavorites({
            target_type: repost.target_type,
            target_id: repost.target_id,
            type: repost.type,
            user_id: repost.user_id,
            active: CONSTANTS.FavoriteActive.Active
        });

        await this._userStorage.deleteRepost({id: repost.id});

        if (!favorite) {
            return true;
        }

        await this._userStorage.deleteFavorite({id: favorite.id});

        return true;
    }

    async createToken(userObject) {
        let token = jwt.sign({
            userObject
        }, this._tokenSettings.JWT_KEY, {expiresIn: this._tokenSettings.TOKEN_LIFETIME});

        await this._userStorage.insertSessionIntoDatabase(token, userObject.userId, userObject.ip);
        return token;
    }

    async verifyToken(token) {
        try {
            let decoded = jwt.verify(token, this._tokenSettings.JWT_KEY);
            return decoded;
        } catch (error) {
            throw new UnAuthorized('Invalid token');
        }

    }

    async generateToken(length) {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }

    async findUsersByIds(data) {
        console.log(data, 'find users by ids')
        return await this._userStorage.findUsersByArrayId(data);
    }

}

module.exports = User
