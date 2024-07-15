const db = require('../services/database');
const REDIRECT_TABLE_NAME = 'redirects';
const REDIRECT_CLICKS_TABLE_NAME = 'redirect_clicks';


class RedirectStorage {

    async createNewRedirect(data){
        let currentTime = Math.round(Date.now());

        let redirectObject = {
            author_id: data.author_id,
            short_link: data.short_link,
            redirect_link: data.redirect_link,
            title: data.title,
            subdomain: data.subdomain,
            active: 1,
            created_at: currentTime,
            updated_at: currentTime
        }

        return (await db(REDIRECT_TABLE_NAME).insert(redirectObject).returning('id'))[0];
    }

    async findRedirect(id){
        return db(REDIRECT_TABLE_NAME).where('id', id)
    }

    async updateRedirect(data){
        const update = {
            short_link: data.short_link,
            redirect_link: data.redirect_link,
            title: data.title,
            updated_at: Math.round(Date.now())
        }
        return db(REDIRECT_TABLE_NAME).where('id', data.redirectId).update(update);
    }

    async searchRedirect(where, fields = ['*'], orderBy = ['id']){
        return db(REDIRECT_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }

    async deleteRedirect(id){
        let redirectObject = {
            active: 2
        }
        return db(REDIRECT_TABLE_NAME).update(redirectObject).where({id: id});
    }

    async createRedirectClick(data){
        const clickObject = {
            redirect_id: data.redirect_id,
            clicked_user_id: data.clicked_user_id,
            clicked_ip: data.ip,
            user_agent: data.userAgent,
            country_code: data.country_code,
            created_at: Math.round(Date.now()),
        }
        return db(REDIRECT_CLICKS_TABLE_NAME).insert(clickObject);
    }

    async searchRedirectClicks(where, fields = ['*'], orderBy = ['id']){
        return db(REDIRECT_CLICKS_TABLE_NAME).where(where).select(fields).orderBy(orderBy);
    }
}

module.exports = new RedirectStorage();