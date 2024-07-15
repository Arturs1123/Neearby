var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

const requestIp = require("request-ip");
const { PORT } = require('./secret/config');
const cors = require('cors');

const fileUpload = require('express-fileupload')
const http = require("http");
const httpErrorHandler = require("http-errors-express").default;
const { hideKnexErrors, notFound } = require('./middlewares/index');

var app = express();
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({ extended: true }));
app.use(requestIp.mw())
app.use((req, res, next) => {
    req.headers.clientIp = req.clientIp;
    next();
});
app.use(cors());

app.use(cookieParser())




app.use('/api/product', require('./routes/Product'));
app.use('/api/subscription', require('./routes/Subscription'));
app.use('/api/redirect', require('./routes/Redirect'));
app.use('/api/post', require('./routes/Post'));
app.use('/api/referral', require('./routes/Referral'));

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
