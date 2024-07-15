const assert = require('assert');
const UserController = require('../controllers/User');

const {ValidationError, InvalidCredentials} = require("../../core/Errors");

describe('Run user authentication', () => {

    const inputData = [

    ];


    for (const _ of inputData) {
        it(_.title, async () => {

            const callFunc = async () => {
                //return true;
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
