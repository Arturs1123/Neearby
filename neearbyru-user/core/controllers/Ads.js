const Validator = require('../helpers/validator');
const Constants = require("../Constants");
const {ProductNotFound, UserNotFound, AdsDelete, AdsNotPaid, AdsNotFound, InsufficientRole, AdsAlreadyPublished, NotEnoughBalance, AdsNoMethodPaying,
    NotAuthorThisTarget
} = require("../Errors");
const Message = require('../system/Message');

class Ads {

    _adsStorage;
    _userStorage;
    _serviceMail;
    _serviceAuthor;

    constructor(adsStorage, userStorage, serviceMail, serviceAuthor) {
        this._adsStorage = adsStorage;
        this._userStorage = userStorage;
        this._serviceMail = serviceMail;
        this._serviceAuthor = serviceAuthor;
    }

    async create(data, headers, user){
        const validator = new Validator();

        validator.setRule('type', Validator.TYPES.number().required());
        validator.setRule('author_id', Validator.TYPES.number().required()); // id того к кому хотят прикрепить обьявление
        validator.setRule('product_id', Validator.TYPES.number().required());
        validator.setRule('payingType', Validator.TYPES.number().required());
        validator.setRule('description', Validator.TYPES.string().required());

        validator.validate(data);

        let product;

        if (data.type === Constants.OrderTypes.Subscription) {
            [product] = await this._adsStorage.searchSubscription({id: data.product_id} );
        } else if (data.type === Constants.OrderTypes.Product){
            [product] = await this._adsStorage.searchProduct({id: data.product_id} );
        }

        const [checkUser] = await this._userStorage.findUser({id: data.author_id});

        if (!checkUser) {
            throw new UserNotFound();
        }

        if (!product){
            throw new ProductNotFound();
        }

        const [author] = await this._userStorage.findUser({id: data.author_id})

        if(!author){
            throw new UserNotFound('This author not found');
        }

        data.creator_id = user.userId;
        data.active = Constants.AdsTypes.NotPayed;

        let payment;

        if(data.payingType === Constants.PayingType.Balance) { // со счета нерби

            if(user.balance < Constants.PriceCreateAds){
                throw new NotEnoughBalance()
            }

            // TODO: нужно ли это? деньги списывать с баланса в данном методе и нужно еще начислять на баланс автору
            // await this._userStorage.updateUser({id: user.userId}, {balance: user.balance - Constants.PriceCreateAds}); // деньги за обьявления вычитаются с баланса
            // await this._userStorage.updateUser({id: author.шв}, {balance: author.balance + Constants.PriceCreateAds}); // деньги за обьявления начисляются на баланс

            data.active = Constants.AdsTypes.Permission;

            const adsId = await this._adsStorage.createAds(data);

            const [ads] = await this._adsStorage.searchAds({id: adsId})

            await this._serviceMail.sendMailBuyAds({
                buyer: user,
                author: author,
                ads: ads,
                order: {
                    status: Constants.StatusOrder.Payed,
                    price: Constants.PriceCreateAds
                }
            })

        } else if(data.payingType === Constants.PayingType.Card) { // оплата по карте
            data.active = Constants.AdsTypes.NotPayed;

            const id = await this._adsStorage.createAds(data);

            const orderId = await OrderStorage.createOrder({
                client_id: user.userId,
                author_id: product.author_id,
                type: Constants.OrderTypes.Ads,
                targetId: id,
                status: Constants.StatusOrder.Process,
                price: Constants.PriceCreateAds,
            });

            payment = await ServiceBank.createPayment({
                authorId: product.author_id,
                type: Constants.OrderTypes.Ads,
                orderId: orderId,
                amount: Constants.PriceCreateAds,
                clientId: user.userId
            });

            await OrderStorage.updateOrder({id: orderId}, {payment_link: payment})

            const adsId = await this._adsStorage.createAds(data);

            const [ads] = await this._adsStorage.searchAds({id: adsId})

            await this._serviceMail.sendMailBuyAds({
                buyer: user,
                author: author,
                ads: ads,
                order: {
                    status: Constants.StatusOrder.Create,
                    price: Constants.PriceCreateAds,
                    payment_link: payment
                }
            })
        }


        if(payment){
            return payment
        }

        return true
    }

    async myAdsForEditing(data, headers, user){
        const ads = await this._adsStorage.searchAds({creator_id: user.userId, active: Constants.AdsTypes.Editing});

        const searchTargets = {
            1: [],
            2: [],
        }


        for(let adsId of ads){
            if(adsId.type === Constants.OrderTypes.Product){
                searchTargets[Constants.OrderTypes.Product].push(adsId.product_id)
            } else if(adsId.type === Constants.OrderTypes.Subscription){
                searchTargets[Constants.OrderTypes.Subscription].push(adsId.product_id)
            }
        }


        const products = await this._serviceAuthor.searchProductsByIds({
            ids: searchTargets[Constants.OrderTypes.Product]
        });

        const subscriptions = await this._serviceAuthor.searchSubscriptionsByIds({
            ids: searchTargets[Constants.OrderTypes.Subscription]
        });

        return {ads, products, subscriptions}
    }

    async updateAds(data, headers, user){
        const validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());
        validator.setRule('type', Validator.TYPES.number().required());
        validator.setRule('product_id', Validator.TYPES.number().required());
        validator.setRule('description', Validator.TYPES.string().required());

        validator.validate(data);

        let product

        if (data.type === Constants.OrderTypes.Subscription) {
            [product] = await this._adsStorage.searchSubscription({id: data.product_id} );
        } else if (data.type === Constants.OrderTypes.Product){
            [product] = await this._adsStorage.searchProduct({id: data.product_id} );
        }

        const [ads] = await this._adsStorage.searchAds({id: data.id});

        if(!ads){
            throw new AdsNotFound();
        }

        if(user.role !== Constants.ROLE_ADMIN){
            if(user.userId !== ads.creator_id){
                throw new NotAuthorThisTarget('Yoy not author this ads');
            }
        }

        return await this._adsStorage.updateAds({id: data.id}, {
            type: data.type,
            product_id: data.product_id,
            description: data.description,
            active: Constants.AdsTypes.Permission
        })
    }

    async getAuthorAds (data, user) {

        const validator = new Validator();

        validator.setRule('author_id', Validator.TYPES.number().required());
        validator.setRule('active', Validator.TYPES.number());

        validator.validate(data);

        if (data.active === undefined) {
            data.active = Constants.AdsTypes.Published;
        }

        const ads = await this._adsStorage.searchAds({author_id: data.author_id, active: data.active});

        const array = {
            "not_payed": [],
            "permission": [],
            "published": [],
            "deleted": []
        }
        let keys = Object.keys(array);

        const allProductsId = ads.map((el, i) => ({
            id: el.id,
            product_id: el.product_id,
            type: el.type
        }));

        for (let i in allProductsId){
            const [product] = allProductsId[i].type === Constants.OrderTypes.Subscription
                ? await this._adsStorage.searchSubscription({id: allProductsId[i].product_id})
                : await this._adsStorage.searchProduct({id: allProductsId[i].product_id})
            ads[i].product = product
        }

        for (let i = 0; i < ads.length; i++){
            let key = keys[data.active];
            array[key].push(ads[i])
        }

        return array;
    }

    async deleteAds(data, headers, user) {
        const validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());
        validator.setRule('delete_reason', Validator.TYPES.string().required()); // на клиенте подготовить фразы для этого

        validator.validate(data);

        const [searchAds] = await this._adsStorage.searchAds({id: data.id});

        if(!searchAds){
            throw new AdsNotFound()
        }

        if(user.role !== Constants.ROLE_ADMIN){
            if (searchAds.user_id !== user.userId) {
                throw new InsufficientRole('User role is insufficient to use this method');
            }
        }

        if(searchAds.active === Constants.AdsTypes.Deleted){
            throw new AdsDelete();
        }

        const [creator] = await this._userStorage.findUser({id: searchAds.creator_id});
        const [author] = await this._userStorage.findUser({id: searchAds.author_id});

        searchAds.delete_reason = data.delete_reason;

        await Message.sendMessageSupportNeearby(
            {
                userId: creator.id,
                message: data.delete_reason
            },
            headers
        );

        await this._serviceMail.deleteAds({creator, author, ads: searchAds});

        return await this._adsStorage.delete(data)
    }

    async publicationAds(data, headers, user){
        const validator = new Validator();

        validator.setRule('id', Validator.TYPES.number().required());

        validator.validate(data);

        const [searchAds] = await this._adsStorage.searchAds({id: data.id});

        if(!searchAds){
            throw new AdsNotFound()
        }

        if(user.role !== Constants.ROLE_ADMIN){
            if(searchAds.author_id !== user.userId){
                throw new InsufficientRole();
            }
        }

        if(searchAds.active === Constants.AdsTypes.NotPayed) {
            throw new AdsNotPaid();
        }

        if(searchAds.active === Constants.AdsTypes.Published){
            throw new AdsAlreadyPublished();
        }

        const publication = await this._adsStorage.publication(data);

        const allAds = await (await this._adsStorage.searchAds({author_id: user.userId, active: Constants.AdsTypes.Published}))
            .map(i => (
                {
                    id: i.id,
                    author_id: i.author_id,
                    creator_id: i.creator_id,
                    upd: i.updated_at
                }
            )
        ).sort((b, a) => b.upd - a.upd);

        if (allAds.length > 5) { // если у автора больше 5-ти объявлений то самое первое опубликованное удаляется
            const deleteReason = "Another tenant took your place";
            await this._adsStorage.delete({id: allAds[0].id, delete_reason: deleteReason});

            const [creator] = await this._userStorage.findUser({id: allAds[0].creator_id});
            const [author] = await this._userStorage.findUser({id: allAds[0].author_id});

            allAds[0].delete_reason = deleteReason;

            await Message.sendMessageSupportNeearby(
                {
                    userId: creator.id,
                    message: allAds[0].delete_reason
                },
                headers
            );

            await this._serviceMail.deleteAds({creator, author, ads: allAds[0]});
        }

        return publication
    }

    // Admin route
    async allAds(data, headers, user){

        const validator = new Validator();

        validator.setRule('active', Validator.TYPES.number());

        validator.validate(data);

        if (data.active === undefined) {
            data.active = Constants.AdsTypes.Published;
        }

        if (user.role !== Constants.ROLE_ADMIN) {
            throw new InsufficientRole();
        }

        const ads = await this._adsStorage.searchAds({active: data.active});

        const array = {
            "not_payed": [],
            "permission": [],
            "published": [],
            "deleted": []
        }
        let keys = Object.keys(array);

        const allProductsId = ads.map((el, i) => ({
            id: el.id,
            product_id: el.product_id,
            type: el.type
        }));

        for (let i in allProductsId){
            const [product] = allProductsId[i].type === Constants.OrderTypes.Subscription
                ? await this._adsStorage.searchSubscription({id: allProductsId[i].product_id})
                : await this._adsStorage.searchProduct({id: allProductsId[i].product_id})
            ads[i].product = product
        }

        for (let i = 0; i < ads.length; i++){
            let key = keys[data.active];
            array[key].push(ads[i])
        }

        return array;
    }

    async searchAds(data){
        return await this._adsStorage.searchAds({id: data.id});
    }

    async payingAds(data){
        return await this._adsStorage.updateAds({id: data.id}, {active: Constants.AdsTypes.Permission});
    }

    async updateAdsForEditing(data){
        return await this._adsStorage.updateAds({id: data.id}, {active: Constants.AdsTypes.Editing});
    }
}

module.exports = Ads;