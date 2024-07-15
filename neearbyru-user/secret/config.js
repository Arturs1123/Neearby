const {ROLE_REGISTERED} = require("../core/Constants");
const fs = require("fs");
const path = require("path");
const config = {};

const localFileName = './config.local.js';

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

config['JWT_KEY'] = 'JWT_KEY';
config['TOKEN_LIFETIME'] = '7d';
config['USER_DEFAULT_ROLE'] = ROLE_REGISTERED;
config['SERVICE_TOKEN'] = 'asd';
config['PORT'] = 3001;


config['SERVICE_MAIL_HOST'] = '127.0.0.1';
config['SERVICE_MAIL_PORT'] = '3003';
config['SERVICE_MAIL_TOKEN'] = 'asd';

config['SERVICE_STORAGE_HOST'] = '127.0.0.1';
config['SERVICE_STORAGE_PORT'] = '3002';
config['SERVICE_STORAGE_TOKEN'] = 'asd';

config['SERVICE_AUTHOR_HOST'] = '127.0.0.1';
config['SERVICE_AUTHOR_PORT'] = '3000';
config['SERVICE_AUTHOR_TOKEN'] = 'asd';

config['SERVICE_BANK_HOST'] = '127.0.0.1';
config['SERVICE_BANK_PORT'] = '3004';
config['SERVICE_BANK_TOKEN'] = 'asd';

config['FRONT_ADDRESS'] = 'neearby.pro'

config['USER_NEEARBY_SUPPORT_EMAIL'] = 'admin@neearby.com';
config['USER_NEEARBY_SUPPORT_PASSWORD'] = 'alexhotpro';


if (fs.existsSync(path.join(__dirname, localFileName))) {
    const localConfig = require(localFileName);

    for (let keyItem in config) {
        if ((localConfig.hasOwnProperty(keyItem))) {
            config[keyItem] = localConfig[keyItem];
        }
    }
}

module.exports = config;
