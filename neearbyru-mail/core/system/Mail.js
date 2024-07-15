const MailController = require('../controllers/Mail');
const { MailTextUser, MailTextAuthor } = require('../storage/MailText')
const SendMail = require('../helpers/sendMail')

const mailTextUser = new MailTextUser();
const mailTextAuthor = new MailTextAuthor();

module.exports = new MailController(mailTextUser, mailTextAuthor, SendMail);