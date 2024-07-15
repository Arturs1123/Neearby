const httpError = require('http-errors');
const CONSTANTS = require("../core/Constants");
const config = require('../secret/config');
const {InvalidCredentials, AccountIsNotVerified} = require("../core/Errors");
const ServiceUser = require('../core/services/serviceUser');
const {log} = require("debug");

// обработчик URL не найден
// function notFound (req, res, next) {
//     res.status(404);
//     const err = new Error(`Not Found ${req.url}`);
//     next(err);
// }

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
        try {
            delete req.headers['content-length'];
            console.log(req.headers);
            let user = await ServiceUser.whoami({roles}, req.headers);
            if(!user.active){
                next(new AccountIsNotVerified());
            }
            req.user = user;
        }
        catch(error) {
            next(error);
        }

        next();
    }
}

function softAuth(){
    return async function (req, res, next) {
        try {

            delete req.headers['content-length'];
            let user = await ServiceUser.whoami({}, req.headers);

            if(!user.active){
                next();
            }
            req.user = user;
        }
        catch(error) {

        }

        next();
    }
}

function checkToken(req, res, next){

    let headers = req.headers;

    if(headers['auth-token'] === config.SERVICE_TOKEN){
        next();
    }
    else {
        next(new InvalidCredentials('Wrong Access Token'));
    }
}

function isHasToken(roles){
    return async function (req, res, next) {
        try {
            delete req.headers['content-length'];
            let user = await ServiceUser.whoami({roles}, req.headers);
            if(!user.active){
                next(new AccountIsNotVerified());
            }
            req.user = user;
        }
        catch(error) {

        }

        next();
    }
}

module.exports = { notFound, protectSQL, hideKnexErrors, allowRoles, checkToken, isHasToken, softAuth};