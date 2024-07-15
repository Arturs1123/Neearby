const httpError = require('http-errors');
let UserController = require('../core/system/User');
const CONSTANTS = require("../core/Constants");
const config = require('../secret/config');
const {InvalidCredentials} = require("../core/Errors");

// обработчик URL не найден
function notFound (req, res, next) {
    console.log('Not found = ', req.url, req.method, req.data)
    res.status(404);
    const err = new Error('Not Found', req.url);
    next(err);
}

function protectSQL() {
    const keywords = [
        'UNION', 'ALTER', 'CREATE', 'DELETE', 'DROP', 'EXEC',
        'EXECUTE', 'INSERT', 'INSERT INTO', 'MERGE', 'SELECT',
        'UPDATE', 'UNION UNION ALL', 'FROM'
    ];

    return (req, res, next) => {
        if (!req.originalUrl) next();
        const result = hasInjections(req.originalUrl, req.body, keywords)
        if (result) {
            next();
        } else {
            next(httpError(403,'Detected injection'));
        }
    };
}

function hasInjections(url, body, keywords) {
    const result = keywords.filter(keyword => {
        const urlHaveInjectin = url.includes(keyword);
        const bodyHaveInjection = new RegExp(`(\\s|")+${keyword}(\\s|")+`).test(JSON.stringify(body));
        return urlHaveInjectin || bodyHaveInjection;
    });
    if (result.length === 0) return true;
    return false;
}

function hideKnexErrors(err, _req, _res, next) {
    if (err) {
        if (err.sqlMessage) next(httpError(500, 'Ошибка сервера'));
        next(err);
    } else {
        next();
    }
}

function allowRoles(roles){
    return async function (req, res, next) {
        console.log('======================= allow roles',req.url, req.method, req.body,'===================')
        try {
            req.user = await UserController.whoami({roles}, req.headers);
        }
        catch(error) {
            next(error);
        }

        next();
    }
}

function checkToken(req, res, next){
    console.log('------',req.url, req.method, req.body,'------')
    try {
        let headers = req.headers;
        if(headers['auth-token'] === config.SERVICE_TOKEN){
            next();
        }
        else {
            if(!headers[CONSTANTS.USER_TOKEN_NAME] && !req.body.token){
                next(new InvalidCredentials('noTokenProvided'));
            }
            else{
                next();
            }

        }
    } catch (e){
        console.log(1);
    }

}

module.exports = { notFound, protectSQL, hideKnexErrors, allowRoles, checkToken};