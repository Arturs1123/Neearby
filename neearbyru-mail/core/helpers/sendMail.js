const nodemailer = require('nodemailer')
const { mailer } = require('../../secret/config')

class SendMail{

    constructor() {
    }

    async sendMail(text) {
        const transporter = nodemailer.createTransport(mailer);
        await transporter.sendMail(text);
    }

}

module.exports = new SendMail();