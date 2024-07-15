const fs = require("fs");
const path = require("path");
const config = {};

// const localFileName = './config.local.js';


config['mailer'] = {
    host: 'mail.smtp2go.com',
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    auth: {
        user: 'neearby.pro', // generated ethereal user
        pass: 'shXCwU4lYY4FGuEE', // generated ethereal password
    },
    tls: {
        rejectUnauthorized:false
    },
    logger: true,
    debug: true
    
}

config['SERVICE_TOKEN'] = 'asd';
config['PORT'] = 3003;


// if (fs.existsSync(path.join(__dirname, localFileName))) {
//     const localConfig = require(localFileName);

//     for (let keyItem in config) {
//         if ((localConfig.hasOwnProperty(keyItem))) {
//             config[keyItem] = localConfig[keyItem];
//         }
//     }
// }

module.exports = config;


