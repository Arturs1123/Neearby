const MailController = require('../../core/controllers/Mail');
const { MailTextUser, MailTextAuthor } = require('../../core/storage/MailText')
const SendMail = require('../helpers/sendMail')

const mailTextUser = new MailTextUser();
const mailTextAuthor = new MailTextAuthor();

module.exports = new MailController( mailTextUser, mailTextAuthor, SendMail )