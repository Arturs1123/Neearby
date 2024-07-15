var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const requestIp = require("request-ip");
const fs = require('file-system');
const fileUpload = require('express-fileupload');
dotenv.config({path: './secret/.env'});
const { PORT } = require('./secret/config');
const cors = require('cors');

const http = require("http");
const httpErrorHandler = require("http-errors-express").default;
const { hideKnexErrors, notFound } = require('./middlewares/index');


const { Server } = require("socket.io");


var app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({ createParentPath: true, extended: true }));
app.use(requestIp.mw())
app.use((req, res, next) => {
    req.headers.clientIp = req.clientIp;
    next();
});

const UserRouter = require('./routes/User');
app.use('/api/user', UserRouter);

const AdminRouter = require('./routes/Admin');
app.use('/api/admin', AdminRouter);

const MessageRouter = require('./routes/Messages');
app.use('/api/message', MessageRouter);

const AdsRouter = require('./routes/Ads');
app.use('/api/ads', AdsRouter);

const FollowingsRouter = require('./routes/Followings');
app.use('/api/follow', FollowingsRouter);

const PostsRouter = require('./routes/Posts');
app.use('/api/post', PostsRouter);

const OrdersRouter = require('./routes/Orders');
app.use('/api/order', OrdersRouter);

app.get("/", (_req, res) => {
    res.redirect("https://neearby.pro");
});


//Обработчики ошибок
const isProd = app.get("env") === "production";
app.use(hideKnexErrors);
app.use(notFound);
app.use(
    httpErrorHandler({
        formatError: (err, _req, _isExposed) => {
            return !isProd
                ? {
                    result: false,
                    error: {
                        name: err.message,
                        status: err.code,
                        message: err.data,
                        stack: err.stack,
                    }
                }
                : {
                    result: false,
                    error: {
                        name: err.message,
                        status: err.code,
                        message: err.data,
                    }
                };
        },
    })
);


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["*"],
        allowedHeaders: ["*"],
        credentials: true
    }
});


let websocketClass = require('./core/services/websocket');
websocketClass.io = io;

websocketClass.initialSetup();


server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(
        "Server is running at localhost:%d in %s mode",
        PORT,
        app.get("env")
    );
    console.log("Press CTRL-C to stop\n");
});


module.exports = app;
