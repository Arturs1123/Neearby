const assert = require('assert');
const UserController = require('../controllers/User');

const {ValidationError, InvalidCredentials} = require("../../core/Errors");

describe('Run user authentication', () => {

    const inputData = [
        {
            title: 'Пришли пустые данные',
            data: {},
            expected: ValidationError
        },
        {
            title: 'Неверные данные для входа',
            data: {
                email: "root@admin.ru",
                password: "darktwister1"
            },
            expected: InvalidCredentials
        },
        {
            title: 'Верные данные',
            data: {
                email: "root@admin.ru",
                password: "darktwister"
            },
            expected: true
        },
        {
            title: 'Только одно поле',
            data: {
                password: "darktwister"
            },
            expected: ValidationError
        },
    ];


    for (const _ of inputData) {
        it(_.title, async () => {

            const callFunc = async () => {
                return UserController.authenticate(_.data, {});
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
