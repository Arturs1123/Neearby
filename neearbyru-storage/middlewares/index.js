const httpError = require('http-errors');
let FileStorage = require('../core/system/Storage');
const CONSTANTS = require("../core/Constants");
const config = require('../secret/config');
const {InvalidCredentials, AccountIsNotVerified} = require("../core/Errors");
const ServiceUser = require('../core/services/serviceUser');

// обработчик URL не найден
function notFound (req, res, next) {
    res.status(404);
    const err = new Error('Not Found ', req.url);
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
            console.log(`here`);
            let user = await ServiceUser.whoami({}, req.headers);
            if(!user.active){
                next(new AccountIsNotVerified());
            }
            req.user = user;
            console.log(req.user);
        }
        catch(error) {
            next(error);
        }

        next();
    }
}

function checkToken(req, res, next){

    console.log(req.headers);

    if(req.headers['auth-token'] === config.SERVICE_TOKEN){
        console.log(`true`);
        next();
    }
    else {
        next(new InvalidCredentials('noTokenProvided'));
    }
}

module.exports = { notFound, protectSQL, hideKnexErrors, allowRoles, checkToken};