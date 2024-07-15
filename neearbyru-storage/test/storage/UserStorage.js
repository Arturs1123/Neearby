
class UserStorage {

    async findUser(email) {
        return [
            {
                id: 1,
                email: 'root@admin.ru',
                password: '$2a$10$0Cm8MkHoaU84B6w5BSCFPeFYUp/JTx5AiEEdog7KXnhGQ7u4sQrXy',
                role: 1,
                name: 'Андрей кукусиков'
            }
        ]
    }

    async createNewUser(data) {
        return true;
    }

    async insertSessionIntoDatabase(token, userId, ip) {
        return true;
    }

}

module.exports = new UserStorage();