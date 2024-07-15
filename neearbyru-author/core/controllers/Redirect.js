const Validator = require('../helpers/validator');
const CONSTANTS = require('../Constants');

const { RedirectNotFound, RedirectNotAuthor, RedirectAlreadyDelete} = require("../Errors");
const axios = require("axios");

class Redirect {

    _redirectStorage;
    _userService;

    constructor(redirectStorage, userService) {
        this._redirectStorage = redirectStorage;
        this._userService = userService;
    }

    async createRedirect(data, headers, user){

        const validator = new Validator();

        validator.setRule('title', Validator.TYPES.string().required());
        validator.setRule('short_link', Validator.TYPES.number());
        validator.setRule('redirect_link', Validator.TYPES.string().min(0).required());

        validator.validate(data);

        if(!data.short_link){
            data.short_link = [...Array(10)].map(() => Math.random().toString(36)[2]).join('')
        }

        data.author_id = user.userId;
        data.subdomain = user.login;

        let id = await this._redirectStorage.createNewRedirect(data);

        return {id: id};
    }

    async updateRedirect(data, headers, user){

        const validator = new Validator();

        validator.setRule('redirectId', Validator.TYPES.number().required());
        validator.setRule('title', Validator.TYPES.string().required());
        validator.setRule('redirect_link', Validator.TYPES.string().min(0).required());

        validator.validate(data);

        const [redirectValid] = await this._redirectStorage.findRedirect(data.redirectId);

        if (!redirectValid){
            throw new RedirectNotFound();
        }

        if (redirectValid.author_id !== user.userId){
            throw new RedirectNotAuthor()
        }

        data.subdomain = user.login;

        const id = await this._redirectStorage.updateRedirect({...redirectValid, ...data});

        return {id: id};
    }

    async clickRedirect(req, res, redirectPath, next){

        let [redirect] = await this._redirectStorage.searchRedirect({short_link: redirectPath});

        if(!redirect){
            next(new RedirectNotFound());
        }

        let ip = req.ip;
        let userAgent = req.headers['user-agent'];

        let country_code = await axios.get(`https://api.cleantalk.org/?method_name=ip_info&ip=${ip}`);
        let code = await country_code.data.data[ip].country_code;

        let user = {};

        try {
            user = await this._userService.whoami({token: req.cookies.token});
        }
        catch(e){}

        await this._redirectStorage.createRedirectClick({
            redirect_id: redirect.id,
            clicked_user_id: user.userId,
            ip,
            userAgent,
            country_code: code
        });


        res.cookie('redirectedFrom', redirect.redirect_link, { expires: new Date(Date.now() + 7884000000)}) // 3 months
        res.redirect(redirect.redirect_link);

    }
    //TODO: Возвращать отдельно количество переходов, а не все строки.
    async redirectStats(data, headers, user){

        const validator = new Validator();

        validator.setRule('redirectId', Validator.TYPES.number().required());

        validator.validate(data);

        let [redirect] = await this._redirectStorage.searchRedirect({id: data.redirectId});

        if(!redirect){
            throw new RedirectNotFound()
        }

        if(redirect.author_id !== user.userId){
            throw new RedirectNotAuthor()
        }

        let redirectClicks = await this._redirectStorage.searchRedirectClicks({redirect_id: redirect.id})

        return {
            clicks: redirectClicks,
            clicksCount: redirectClicks.length
        };
    }

    async deleteRedirect(data, headers, user) {
        const validator = new Validator();

        validator.setRule('redirectId', Validator.TYPES.number().required());

        validator.validate(data);

        const [searchRedirect] = await this._redirectStorage.findRedirect(data.redirectId)

        if(!searchRedirect){
            throw new RedirectNotFound()
        }

        if(searchRedirect.active === 2){
            throw new RedirectAlreadyDelete()
        }

        if(searchRedirect.author_id !== user.userId){
            throw new RedirectNotAuthor()
        }

        const deleteRedirect = await this._redirectStorage.deleteRedirect(data.redirectId)
        return deleteRedirect
    }

}

module.exports = Redirect