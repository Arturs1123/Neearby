const UserController = require("../system/User");
const CONSTANTS = require('../Constants')

class Websocket {

    static io = {};
    static connectedUsers = [];

    static initialSetup() {
        Websocket.io.use(async (socket, next) => {
            const token = socket.handshake.headers.authorization;
            if (!token) {
                return next(new Error("No token provided"));
            }

            try {
                socket.user = await UserController.whoami({roles: Object.keys(CONSTANTS.USER_ROLES)}, socket.handshake.headers);

            } catch (error) {
                console.log(`websocket error`, JSON.stringify(error));
                next(new Error(error));
            }


            next();

            socket.on('chat-message', (value) => {
                console.log(value);
            })
        });

        Websocket.io.on('connection', (socket) => {
            socket.emit('hello', 'world');
        });
    }

    static async SendPrivateMessage(toUserId, message){
        const sockets = await Websocket.io.fetchSockets();
        let targetSockets = sockets.filter(element => element.user.userId === toUserId);

        console.log(sockets);

        for(let socket of targetSockets){
            socket.emit('chat-message', message);
        }
    }


}

module.exports = Websocket;