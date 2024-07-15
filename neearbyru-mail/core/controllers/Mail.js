const Validator = require('../helpers/validation')
const Constants = require('../Constants')

class Mail {

    _mailStorageUser;       // Text for user
    _mailStorageAuthor;     // Text for author
    _sendMail;

    constructor( mailTextUser, mailTextAuthor, sendMail ) {
        this._mailStorageUser = mailTextUser;
        this._mailStorageAuthor = mailTextAuthor;
        this._sendMail = sendMail;
    }

    // async registrationMail(user) {
    //
    //     const validator = new Validator();
    //
    //     validator.setRule('email', Validator.TYPES.string().email().required());
    //     validator.setRule('password', Validator.TYPES.string().required());
    //
    //     validator.validate(user);
    //
    //     const mailText = await this._mailStorageUser.registrationMailText(user);
    //     return await this._sendMail.sendMail(mailText);
    // }

    async mailBuyProduct(data) {

        const validator = new Validator();

        validator.setRule('buyer', Validator.TYPES.object().required());
        validator.setRule('author', Validator.TYPES.object().required());
        validator.setRule('product', Validator.TYPES.object().required());
        validator.setRule('order', Validator.TYPES.object().required());

        validator.validate(data);

        let mailUserText; // Text for send mail
        let mailAuthorText; // Text form author
        switch (data.order.status) {
            case Constants.StatusOrder.Process: // status create product
                mailUserText = await this._mailStorageUser.productOrderPayedMail(data);
                mailAuthorText = await this._mailStorageAuthor.productOrderPayedMail(data);
                break;

            case Constants.StatusOrder.Payed: // status buy product
                mailUserText = await this._mailStorageUser.buyProductMail(data);
                mailAuthorText = await this._mailStorageAuthor.buyProductMail(data);
                break;
        }

        await this._sendMail.sendMail(mailUserText);
        await this._sendMail.sendMail(mailAuthorText);

        return true
    }

    async mailBuySubscription(data){
        const validator = new Validator();

        validator.setRule('buyer', Validator.TYPES.object().required());
        validator.setRule('author', Validator.TYPES.object().required());
        validator.setRule('subscription', Validator.TYPES.object().required());
        validator.setRule('order', Validator.TYPES.object().required());

        validator.validate(data);

        let mailUserText; // Text for send mail
        let mailAuthorText; // Text form author

        switch (data.order.status) {
            case Constants.StatusOrder.Process: // status create product
                mailUserText = await this._mailStorageUser.subscriptionOrderPayedMail(data);
                mailAuthorText = await this._mailStorageAuthor.subscriptionOrderPayedMail(data);
                break;

            case Constants.StatusOrder.Payed: // status buy product
                mailUserText = await this._mailStorageUser.buySubscriptionMail(data);
                mailAuthorText = await this._mailStorageAuthor.buySubscriptionMail(data);
                break;
        }

        await this._sendMail.sendMail(mailUserText);
        await this._sendMail.sendMail(mailAuthorText);

        return true
    }

    async mailBuyPost(data){
        const validator = new Validator();

        validator.setRule('buyer', Validator.TYPES.object().required());
        validator.setRule('author', Validator.TYPES.object().required());
        validator.setRule('post', Validator.TYPES.object().required());
        validator.setRule('order', Validator.TYPES.object().required());

        validator.validate(data);

        let mailUserText; // Text for send mail
        let mailAuthorText; // Text form author

        switch (data.order.status) {
            case Constants.StatusOrder.Process: // status create product
                mailUserText = await this._mailStorageUser.postOrderPayedMail(data);
                mailAuthorText = await this._mailStorageAuthor.postOrderPayedMail(data);
                break;

            case Constants.StatusOrder.Payed: // status buy product
                mailUserText = await this._mailStorageUser.buyPostMail(data);
                mailAuthorText = await this._mailStorageAuthor.buyPostMail(data);
                break;
        }

        await this._sendMail.sendMail(mailUserText);
        await this._sendMail.sendMail(mailAuthorText);

        return true
    }

    async mailBuyAds(data){
        const validator = new Validator();

        validator.setRule('buyer', Validator.TYPES.object().required());
        validator.setRule('author', Validator.TYPES.object().required());
        validator.setRule('ads', Validator.TYPES.object().required());
        validator.setRule('order', Validator.TYPES.object().required());

        validator.validate(data);

        let mailUserText; // Text for send mail
        let mailAuthorText; // Text form author

        switch (data.order.status) {
            case Constants.StatusOrder.Process: // status create product
                mailUserText = await this._mailStorageUser.adsOrderPayedMail(data);
                mailAuthorText = await this._mailStorageAuthor.adsOrderPayedMail(data);
                break;

            case Constants.StatusOrder.Payed: // status buy product
                mailUserText = await this._mailStorageUser.buyAdsMail(data);
                mailAuthorText = await this._mailStorageAuthor.buyAdsMail(data);
                break;
        }

        await this._sendMail.sendMail(mailUserText);
        await this._sendMail.sendMail(mailAuthorText);

        return true
    }

    async mailRecoverPassword(data) {
        const validator = new Validator();

        validator.setRule('password', Validator.TYPES.string().required());
        validator.setRule('email', Validator.TYPES.string().required());
        validator.setRule('name', Validator.TYPES.string().required());

        validator.validate(data);

        const mailUserText = await this._mailStorageUser.mailRecoverPassword(data)
        await this._sendMail.sendMail(mailUserText);

        return true
    }

    async mailRegistrationAndConfirmation(data) {
        const validator = new Validator();

        validator.setRule('name', Validator.TYPES.string().required());
        validator.setRule('link', Validator.TYPES.string().required());
        validator.setRule('email', Validator.TYPES.string().required());
        validator.setRule('password', Validator.TYPES.string().required());

        validator.validate(data);

        const mailUserText = await this._mailStorageUser.mailRegistrationAndConfirmation(data)

        await this._sendMail.sendMail(mailUserText);

        return true
    }


    async mailAfterConfirmedRegistration(data) {
        const validator = new Validator();

        validator.setRule('name', Validator.TYPES.string().required());
        validator.setRule('email', Validator.TYPES.string().required());

        validator.validate(data);

        const mailUserText = await this._mailStorageUser.mailAfterConfirmedRegistration(data)

        await this._sendMail.sendMail(mailUserText);

        return true
    }

    async mailAfterConfirmedRegistration(data) {
        const validator = new Validator();

        validator.setRule('name', Validator.TYPES.string().required());
        validator.setRule('email', Validator.TYPES.string().required());

        validator.validate(data);

        const mailUserText = await this._mailStorageUser.mailAfterConfirmedRegistration(data)

        await this._sendMail.sendMail(mailUserText);

        return true
    }

    async mailAfterBecomeAuthor(data){
        const validator = new Validator();

        validator.setRule('name', Validator.TYPES.string().required());
        validator.setRule('email', Validator.TYPES.string().required());

        validator.validate(data);

        const mailUserText = await this._mailStorageAuthor.mailAfterBecomeAuthor(data)

        await this._sendMail.sendMail(mailUserText);

        return true
    }

    async subscriptionRenewal(data){
        const validator = new Validator();

        validator.setRule('buyer', Validator.TYPES.object().required());
        validator.setRule('author', Validator.TYPES.object().required());
        validator.setRule('product', Validator.TYPES.object().required());

        validator.validate(data);

        const mailUserText = await this._mailStorageUser.subscriptionRenewalMail(data);
        const mailUserAuthor = await this._mailStorageAuthor.subscriptionRenewalMail(data);

        await this._sendMail.sendMail(mailUserText);
        await this._sendMail.sendMail(mailUserAuthor);

        return true
    }

    async deleteAds (data) {
        const validator = new Validator();

        validator.setRule('author', Validator.TYPES.object().required());
        validator.setRule('creator', Validator.TYPES.object().required());
        validator.setRule('ads', Validator.TYPES.object().required());

        validator.validate(data);

        const mailText = await this._mailStorageUser.deleteAdsText(data);
        await this._sendMail.sendMail(mailText);

        return true;
    }

    async sendMailing(data){
        const validator = new Validator();

        validator.setRule('title', Validator.TYPES.string().required());
        validator.setRule('message', Validator.TYPES.string().required());
        validator.setRule('users', Validator.TYPES.array().required());
        validator.setRule('author', Validator.TYPES.object().required());


        validator.validate(data);

        for(let i = 0; i < data.users.length; i++){
            const mailText = await this._mailStorageUser.textMailing({
                title: data.title,
                message: data.message,
                user: data.users[i],
                author: data.author,
            })
            await this._sendMail.sendMail(mailText);
        }

        return true;
    }

    async mailDeleteTarget(data){
        const validator = new Validator();

        validator.setRule('author', Validator.TYPES.object().required());
        validator.setRule('target', Validator.TYPES.object().required());
        validator.setRule('message', Validator.TYPES.string().required());
        validator.setRule('type', Validator.TYPES.number().required());

        validator.validate(data);

        let mailText

        switch(data.type){
            case Constants.TargetType.Product:
                mailText = await this._mailStorageUser.deleteProduct(data)
                break;
            case Constants.TargetType.Subscription:
                mailText = await this._mailStorageUser.deleteSubscription(data)
                break;
            case Constants.TargetType.Post:
                mailText = await this._mailStorageUser.deletePost(data)
                break;
        }

        await this._sendMail.sendMail(mailText);

        return true

    }

    async mailUnsubscribe(data){
        const validator = new Validator();

        validator.setRule('author', Validator.TYPES.object().required());
        validator.setRule('user', Validator.TYPES.object().required());
        validator.setRule('subscription', Validator.TYPES.object().required());

        validator.validate(data);

        const mailText = await this._mailStorageAuthor.unsubscribeUser(data);

        await this._sendMail.sendMail(mailText);

        return true
    }

}

module.exports = Mail;