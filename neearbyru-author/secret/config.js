const fs = require("fs");
const path = require("path");

const config = {};

// const localFileName = './config.local.js';

config['database'] = {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '', // Gy=29J[Ft
        database: 'neearby'
    },
    asyncStackTraces: true,
};

// config['database'] = {
//     client: 'mysql2',
//     connection: {
//         host: '127.0.0.1',
//         user: 'admin',
//         password: 'password',
//         database: 'neearby'
//     },
//     asyncStackTraces: true,
// };


config['SERVICE_TOKEN'] = 'asd';
config['PORT'] = 3000;

//service-mail
//service-mail
config['SERVICE_MAIL_HOST'] = '127.0.0.1';
config['SERVICE_MAIL_PORT'] = '3003';
config['SERVICE_MAIL_TOKEN'] = 'asd';


//service-user
config['SERVICE_USER_HOST'] = '127.0.0.1';
config['SERVICE_USER_PORT'] = '3001';
config['SERVICE_USER_TOKEN'] = 'vyAdGum6njoJzI5ofJwKMdAUS9SCn1Xa';

//service-author
config['SERVICE_AUTHOR_HOST'] = '127.0.0.1';
config['SERVICE_AUTHOR_PORT'] = '3000';
config['SERVICE_AUTHOR_TOKEN'] = 'asd';


// if (fs.existsSync(path.join(__dirname, localFileName))) {
//     const localConfig = require(localFileName);

//     for (let keyItem in config) {
//         if ((localConfig.hasOwnProperty(keyItem))) {
//             config[keyItem] = localConfig[keyItem];
//         }
//     }
// }

module.exports = config;
