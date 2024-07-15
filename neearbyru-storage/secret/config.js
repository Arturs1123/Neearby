const {ROLE_REGISTERED} = require("../core/Constants");
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

config['SERVICE_TOKEN'] = 'asd';
config['PORT'] = 3002;
config['STORAGE_PATH'] = 'storage/files'

//service-mail
config['SERVICE_MAIL_HOST'] = 'http://127.0.0.1';
config['SERVICE_MAIL_PORT'] = '3001';
config['SERVICE_MAIL_TOKEN'] = 'asd';

//service-user
config['SERVICE_USER_HOST'] = 'http://127.0.0.1';
config['SERVICE_USER_PORT'] = '3000';
config['SERVICE_USER_TOKEN'] = 'asd';


// if (fs.existsSync(path.join(__dirname, 850/))) {
//     const localConfig = require(localFileName);

//     for (let keyItem in config) {
//         if ((localConfig.hasOwnProperty(keyItem))) {
//             config[keyItem] = localConfig[keyItem];
//         }
//     }
// }

module.exports = config;
