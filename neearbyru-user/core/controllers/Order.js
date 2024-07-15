const Constants = require('../Constants')
const Validator = require('../helpers/validator');
const {OrderNotFound} = require("../Errors");

class Order {

    _orderStorage;
    _userController;
    _serviceAuthor;
    _serviceBank;
    _serviceMail;
    _adsController;

    constructor(orderStorage, userController, serviceAuthor, serviceBank, serviceMail, adsController) {
        this._orderStorage = orderStorage;
        this._userController = userController;
        this._serviceAuthor = serviceAuthor;
        this._serviceBank = serviceBank;
        this._serviceMail = serviceMail;
        this._adsController = adsController;
    }

    async createOrder(data, headers, user) {

        const validator = new Validator();

        validator.setRule('targetId', Validator.TYPES.number().required());
        validator.setRule('type', Validator.TYPES.number().required());
        validator.setRule('referralKey', Validator.TYPES.string());

        validator.validate(data);

        let target;

        switch (data.type) {
            case Constants.OrderTypes.Product:
                [target] = await this._serviceAuthor.searchProduct({id: data.targetId});
                break
            case Constants.OrderTypes.Subscription:
                [target] = await this._serviceAuthor.searchSubscription({id: data.targetId});
                break
            case Constants.OrderTypes.PostPurchase:
                [target] = await this._serviceAuthor.searchPost({id: data.targetId}, {
                    Authorization: headers[Constants.USER_TOKEN_NAME]
                });
                break
            case Constants.OrderTypes.Ads:
                [target] = await this._adsController.searchAds({adsId: data.targetId});
                target.price = Constants.PriceCreateAds;
                break
        }

        data.client_id = user.userId;
        data.author_id = target.author_id;
        data.status = Constants.StatusOrder.Create;
        data.price = target.price;


        if(data.referralKey){
            const referral = await this._serviceAuthor.searchReferralTarget({referralKey: data.referralKey});

            if(referral){
                if(referral.type === data.type && referral.target_id === target.id){
                    data.referral = referral;
                } else if(referral.type === data.type && referral.target_id === target.id){
                    data.referral = referral;
                }
            }
        }

        const [orderId] = await this._orderStorage.createOrder(data);

        let payment = await this._serviceBank.createPayment({
            authorId: data.author_id,
            type: data.type,
            orderId: orderId,
            amount: data.price,
            clientId: data.client_id
        });

        await this._orderStorage.updateOrder({id: orderId}, {
            payment_link: payment,
            status: Constants.StatusOrder.Process
        });

        const [order] = await this._orderStorage.searchOrders({id: orderId})

        const [author] = await this._userController.findUser({id: target.author_id});

        switch (data.type) {
            case Constants.OrderTypes.Product:
                await this._serviceMail.sendMailByProduct({
                    buyer: user,
                    author: author,
                    product: target,
                    order: order
                });
                break
            case Constants.OrderTypes.Subscription:
                await this._serviceMail.sendMailBuySubscription({
                    buyer: user,
                    author: author,
                    subscription: target,
                    order: order
                })
                break
            case Constants.OrderTypes.PostPurchase:
                await this._serviceMail.sendMailBuyPost({
                    buyer: user,
                    author: author,
                    post: target,
                    order: order
                })
                break
            case Constants.OrderTypes.Ads:
                await this._serviceMail.sendMailBuyAds({
                    buyer: user,
                    author: author,
                    ads: target,
                    order: order
                });
                target.price = Constants.PriceCreateAds;
                break
        }

        return payment;
    }

    async getOrders(data, headers, user) {

        let validator = new Validator();

        validator.setRule('period', Validator.TYPES.string().allow(...Object.keys(Constants.selectPeriods)).required());
        validator.setRule('orderType', Validator.TYPES.number());

        validator.validate(data);

        let returnObject = {
            all: {
                ordersAmount: 0,
                value: 0
            },
            payed: {
                ordersAmount: 0,
                value: 0
            },
            waiting: {
                ordersAmount: 0,
                value: 0
            },
            orders: []
        };

        let orders = await this._orderStorage.searchOrders({
            client_id: user.userId
        }, ['*'], 'created_at', Constants.selectPeriods[data.period]);

        for (let order of orders) {
            if (order.status === Constants.StatusOrder.Payed) {
                returnObject.payed.ordersAmount++;
                returnObject.payed.value += Number(order.price);
            }
            if (order.status === Constants.StatusOrder.Create) {
                returnObject.waiting.ordersAmount++;
                returnObject.waiting.value += Number(order.price);
            }
            returnObject.orders.push(order);
        }

        returnObject.all.ordersAmount = Number(returnObject.payed.ordersAmount) + Number(returnObject.waiting.ordersAmount);
        returnObject.all.value = (Number(returnObject.payed.value) + Number(returnObject.waiting.value)).toFixed(2);

        return returnObject;

    }

    async orderConfirmed(data) {
        const validator = new Validator();

        validator.setRule('orderId', Validator.TYPES.number().required());

        validator.validate(data);

        await this._orderStorage.updateOrder({id: data.orderId},{
            status: Constants.StatusOrder.Payed,
            updated_at: Math.round(Date.now() / 1000)
        });

        const [order] = await this._orderStorage.searchOrders({id: data.orderId, status: Constants.StatusOrder.Payed});

        if(!order){
            throw new OrderNotFound();
        }

        const [client] = await this._userController.findUser({id: order.client_id});
        const [author] = await this._userController.findUser({id: order.author_id});

        if(order.order_type === Constants.OrderTypes.Product){

            const [product] = await this._serviceAuthor.searchProduct({id: order.target_id});

            await this._serviceMail.sendMailByProduct({
                buyer: client,
                author: author,
                product: product,
                order: order
            });
        } else if(order.order_type === Constants.OrderTypes.Subscription){
            const [subscription] = await this._serviceAuthor.searchSubscription({id: order.target_id});
            let referral = {}
            if(order.referral){
                referral = {
                    referral_id: order.referral.referral_id,
                    type: order.referral.type,
                    target_id: order.referral.target_id
                }
            }

            await this._serviceAuthor.createSubscribedUser({
                subscriptionId: subscription.id,
                subscriberId: client.id,
                referral: referral
            });

            await this._serviceMail.sendMailBuySubscription({
                buyer: client,
                author: author,
                subscription: subscription,
                order: order
            });
        } else if(order.order_type === Constants.OrderTypes.PostPurchase){
            const [post] = await this._serviceAuthor.searchPost({id: order.target_id});

            await this._serviceAuthor.createPurchasedPosts({
                postId: post.id,
                clientId: client.id
            });

            await this._serviceMail.sendMailBuyPost({
                buyer: client,
                author: author,
                post: post,
                order: order
            });
        } else if(order.order_type === Constants.OrderTypes.Ads){
            const [ads] = await this._adsController.searchAds({id: order.target_id});

            await this._adsController.payingAds({id: ads.id});

            await this._serviceMail.sendMailBuyAds({
                buyer: client,
                author: author,
                ads: ads,
                order: order
            });
        }

        if(order.referral){

            const money = order.price * order.referral.percent / 100

            await this._userController.addMoneyForBalance({
                money: money.toFixed(2),
                userId: order.referral.referral_id
            })

            await this._userController.addMoneyForBalance({
                money: order.price - money.toFixed(2),
                userId: order.author_id
            })

        } else {
            await this._userController.addMoneyForBalance({
                money: order.price,
                userId: order.author_id
            })
        }

        await this._orderStorage.updateOrder({id: order.id}, {status: Constants.StatusOrder.Payed})

        return true;
    }

    // admin
    async allOrders(data) {

        let orders;

        switch (data.status) {
            case Constants.StatusOrder.Create:
                orders = await this._orderStorage.searchOrders({status: Constants.StatusOrder.Create});
                break;
            case Constants.StatusOrder.Process:
                orders = await this._orderStorage.searchOrders({status: Constants.StatusOrder.Process});
                break;
            case Constants.StatusOrder.Payed:
                orders = await this._orderStorage.searchOrders({status: Constants.StatusOrder.Payed});
                break;
            default:
                orders = await this._orderStorage.searchOrders({status: Constants.StatusOrder.Payed});
                break
        }

        const targetsIds = {
            1: [],   // products
            2: [],   // subscriptions
            3: [],   // posts
        };

        orders.forEach(elem => {
            targetsIds[elem.order_type].push(elem.target_id);
        })

        const targets = {
            1: [],
            2: [],
            3: [],
        };

        for (let key in targetsIds) {
            switch (Number(key)) {
                case Constants.TargetType.Product:
                    targets[key] = await this._serviceAuthor.searchProductsByIds({ids: targetsIds[key]});
                    break
                case Constants.TargetType.Subscription:
                    targets[key] = await this._serviceAuthor.searchSubscriptionsByIds({ids: targetsIds[key]});
                    break
                case Constants.TargetType.Post:
                    targets[key] = await this._serviceAuthor.searchPostsByIds({ids: targetsIds[key]});
                    break
            }
        }

        let output = [];

        orders.forEach(elem => {
            let tar = targets[elem.order_type];
            elem.target = tar.find(el => elem.target_id === el.id);
            output.push(elem);
        });

        return output;
    }

    async findOrder(data){
        const validator = new Validator();

        validator.setRule('orderId', Validator.TYPES.number().required());

        validator.validate(data);

        const [order] = await this._orderStorage.searchOrders({id: data.orderId});

        if(order.referral){
            const [referral] = await this._userController.findUser({id: order.referral.referral_id});
            const [numberCard] = await this._userController.searchCardUser({user_id: referral.id})

            if(!numberCard){
                order.referral_card = false
            } else {
                order.referral_card = numberCard.card_number
            }

        }

        const [author] = await this._userController.findUser({id: order.author_id});
        const [authorCard] = await this._userController.searchCardUser({user_id: author.id})

        if(!authorCard){
            order.author_card = false
        } else {
            order.author_card = authorCard.card_number
        }

        return order;
    }

}

module.exports = Order;