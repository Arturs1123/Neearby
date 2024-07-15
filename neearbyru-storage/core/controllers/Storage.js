const Validator = require('../helpers/validator');

const CONSTANTS = require('../Constants');

const {UnAuthorized} = require("../Errors");

class Storage {

    _fileStorage;
    _serviceUser;

    constructor(fileStorage, serviceUser) {
        this._fileStorage = fileStorage;
        this._serviceUser = serviceUser;
    }

    async upload(data, headers, files, user) {

        let addedFiles = [];

        for (let key in files) {
            let file = files[key];

            let randomString = Array(10).fill().map(() => ((Math.random() * 36) | 0).toString(36)).join('');
            let fileName = randomString + '.' + file.name.split('.').pop();

            let filePath = await this._fileStorage.WriteFileToFolder(files[key], user.userId, fileName);

            let [id] = await this._fileStorage.WriteToDatabase(file.name, filePath, user.userId);
            addedFiles.push({id, fileName, filePath});
        }

        return addedFiles;

    }

    async getFile(filePath, headers, res){

        let [fileInfo] = await this._fileStorage.GetFileData(filePath);

        let fileFullPath = await this._fileStorage.GetFileFullPath(fileInfo.file_path, fileInfo.user_id);



        if(+fileInfo.protected === 1){
            if(!headers.authorization){
                throw new UnAuthorized('asd');
            }

            let user = await this._serviceUser.whoami({}, {authorization: headers.authorization});
            if(user.role){
                return res.download(fileFullPath);
            }
        }

        return res.download(fileFullPath);



    }

}

module.exports = Storage