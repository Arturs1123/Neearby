const assert = require('assert');
const SubscriptionController = require('../controllers/Subscription');

const {ValidationError, InvalidCredentials} = require("../../core/Errors");

describe('Run create new subscription', () => {

    const inputData = [
        {
            title: 'Пришли пустые данные',
            data: {},
            expected: ValidationError
        },
        {
            title: 'Неверные данные для содания ( нет одного обязательного поля )',
            data: {
                title: "test subs",
                description: "test description",
                subscription_image_path: ""
            },
            expected: ValidationError
        },
        {
            title: 'Верные данные',
            data: {
                title: "test subs",
                price: 1223,
                description: "test description"
            },
            expected: true
        },
    ];


    for (const _ of inputData) {
        it(_.title, async () => {

            const callFunc = async () => {
                return SubscriptionController.createSubscription(_.data, {}, {userId: 12});
            };

            if (_.expected === true) {
                await callFunc()
                    .then((response) => {
                        assert(response);
                    });
            } else {
                await assert.rejects(
                    callFunc,
                    _.expected
                )
            }
        });
    }
});

describe('Run update subscription', () => {

    const inputData = [
        {
            title: 'Пришли пустые данные',
            data: {},
            expected: ValidationError
        },
        {
            title: 'Нет поля id для поиска подписки',
            data: {
                title: "test subs",
                price: 1221,
                description: "test description",
                subscription_image_path: ""
            },
            expected: ValidationError
        },
        {
            title: 'Верные данные',
            data: {
                id: 12,
                subscription_image_path: ""
            },
            expected: true
        },
    ];


    for (const _ of inputData) {
        it(_.title, async () => {

            const callFunc = async () => {
                return SubscriptionController.updateSubscription(_.data, {}, {userId: 50});
            };

            if (_.expected === true) {
                await callFunc()
                    .then((response) => {
                        assert(response);
                    });
            } else {
                await assert.rejects(
                    callFunc,
                    _.expected
                )
            }
        });
    }
});

describe('Run search subscriptions', () => {

    const inputData = [
        {
            title: 'Поиск только по id подписки',
            data: {
                id: 12
            },
            expected: true
        },
        {
            title: 'Поиск только по author_id подписки',
            data: {
                author_id: 50,
            },
            expected: true
        },
    ];


    for (const _ of inputData) {
        it(_.title, async () => {

            const callFunc = async () => {
                return SubscriptionController.searchSubscriptions(_.data, {}, {userId: 50});
            };

            if (_.expected === true) {
                await callFunc()
                    .then((response) => {
                        assert(response);
                    });
            } else {
                await assert.rejects(
                    callFunc,
                    _.expected
                )
            }
        });
    }
});

describe('Run delete subscription', () => {

    const inputData = [
        {
            title: 'Неверные данные',
            data: {},
            expected: ValidationError
        },
        {
            title: 'Успешное удаление',
            data: {
                id: 12,
            },
            expected: true
        },
    ];


    for (const _ of inputData) {
        it(_.title, async () => {

            const callFunc = async () => {
                return SubscriptionController.deleteSubscription(_.data, {}, {userId: 50});
            };

            if (_.expected === true) {
                await callFunc()
                    .then((response) => {
                        assert(response);
                    });
            } else {
                await assert.rejects(
                    callFunc,
                    _.expected
                )
            }
        });
    }
});