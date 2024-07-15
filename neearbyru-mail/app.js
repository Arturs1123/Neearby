var express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: './secret/.env'});
const httpErrorHandler = require("http-errors-express").default;
const { hideKnexErrors, notFound } = require('./middlewares/index');


const { PORT } = require('./secret/config');

const http = require("http");

var app = express();
app.use(express.json());


const MailRouter = require('./routes/Mail');
app.use('/api/mail', MailRouter);

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
