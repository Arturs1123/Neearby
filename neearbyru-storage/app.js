var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const requestIp = require("request-ip");
const fileUpload = require('express-fileupload');
const { PORT } = require('./secret/config');
const cors = require('cors');


const http = require("http");
const httpErrorHandler = require("http-errors-express").default;
const { hideKnexErrors, notFound } = require('./middlewares/index');

var app = express();


app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(cors());

app.use(express.json());
app.use(requestIp.mw())
app.use((req, res, next) => {
    req.headers.clientIp = req.clientIp;
    next();
});



const storageRounter = require('./routes/FileStorage');

app.use('/api/storage', storageRounter);

app.get("/", (_req, res) => {
    res.redirect("https://neearby.com");
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


http.createServer(app).listen(PORT, (err) => {
    if (err) throw err;
    console.log(
        "Server is running at localhost:%d in %s mode",
        PORT,
        app.get("env")
    );
    console.log("Press CTRL-C to stop\n");
});


module.exports = app;
