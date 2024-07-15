const db = require('../services/database');
const path = require('path');
const fs = require('fs');
const {STORAGE_PATH} = require('../../secret/config');
const {ServiceError, BadRequestError} = require("../Errors");
const {string} = require("joi");

const FILE_STORAGE_TABLE_NAME = 'file_storage';


class FileStorage {

    constructor() {
        if (!fs.existsSync(STORAGE_PATH)) {
            fs.mkdirSync(STORAGE_PATH);
        }
    }

    async WriteFileToFolder(file, userId, fileName) {
        let userFolderPath = path.join(STORAGE_PATH, userId.toString());

        if (!fs.existsSync(userFolderPath)) {
            fs.mkdirSync(userFolderPath);
        }
        await file.mv(path.join(userFolderPath, fileName));
        return fileName;
    }

    async WriteToDatabase(fileName, filePath, userId) {
        return db(FILE_STORAGE_TABLE_NAME).insert({
            file_path: filePath,
            file_name: fileName,
            user_id: userId
        }).returning('id')
    }

    async GetFileData(filePath){
        return db(FILE_STORAGE_TABLE_NAME).where({file_path: filePath});
    }

    GetFileFullPath(filePath, user_id){
        return path.join(STORAGE_PATH, String(user_id), filePath);
    }

}

module.exports = new FileStorage();