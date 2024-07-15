const assert = require('assert');
const MailController = require('../controllers/Mail');
const { STATUS_PAYED, STATUS_RENEWED } = require('../../core/Constants')

const { ValidationError } = require("../../core/Errors");

describe('Registration validation', () => {
    const inputData = [
        {
            title: 'Пришли пустые данные',
            data: {},
            expected: ValidationError
        },
        {
            title: 'Нет необходимых полей',
            data: {
                email: "root@admin.ru"
            },
            expected: ValidationError
        },
        {
            title: 'Валидация пройдена',
            data: {
                name: 'Ivan',
                link: 'https://testlink.com',
                email: "root@admin.ru",
                password: "darktwister"
            },
            expected: true
        },
    ];

    for (const _ of inputData){
        it(_.title, async ()=>{
            const callFunc = async () => {
                return MailController.mailRegistrationAndConfirmation(_.data);
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
                );
            }
        });
    }
});

describe('Buy product validation', () => {
    const inputData = [
        {
            title: 'Пришли пустые данные',
            data: {},
            expected: ValidationError
        },
        {
            title: 'Ошибка валидации нет поля "transaction"',
            data: {
                buyer: {},
                author: {},
                product: {},
            },
            expected: ValidationError
        },
        {
            title: 'Валидация пройдена',
            data: {
                buyer: {},
                author: {},
                product: {},
                order: {}
            },
            expected: true
        },
    ];
    console.log(inputData[3])
    for (const _ of inputData){
        it(_.title, async ()=>{
            const callFunc = async () => {
                return MailController.mailBuyProduct(_.data);
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
                );
            }
        });
    }
});

describe('Subscription renewal validation', () => {
    const inputData = [
        {
            title: 'Пришли пустые данные',
            data: {},
            expected: ValidationError
        },
        {
            title: 'Ошибка валидации нет поля "product"',
            data: {
                buyer: {},
                author: {},
            },
            expected: ValidationError
        },
        {
            title: 'Валидация пройдена',
            data: {
                buyer: {},
                author: {},
                product: {},
            },
            expected: true
        },
    ];
    console.log(inputData[3])
    for (const _ of inputData){
        it(_.title, async ()=>{
            const callFunc = async () => {
                return MailController.subscriptionRenewal(_.data);
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
                );
            }
        });
    }
});