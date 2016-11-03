'use strict';

const config = require("./config");
const fs = require("fs");
const path = require("path");
const death = require('death')({uncaughtException: true});
const express = require('express');
const letsencryptExpress = require('letsencrypt-express');
const winstonExpress = require('winston-express');
const winstonExpressMiddleware = winstonExpress({
    accessLevel: config.log.accessLevel,
    accessFileName: 'combined.log',
    errorLevel: config.log.errorLevel,
    errorFileName: 'error.log',
    logFolder: path.join(process.cwd(), config.log.directory),
    maxFileSize: 5242880, //5MB
    maxFiles: 5,
    json: true,
    console: true,
    consoleLevel: 'info',
    consoleColor: true,
    consoleJson: false,
    suppressExceptions: false,
    format: 'combined'
});
const log = winstonExpressMiddleware.logger;

const models = require('./models');
models.sequelize.sync().then(() => {
    const app = express();
    app.use(winstonExpressMiddleware);
    require('./middlewares')(app, models, log);
    let server;
    if (config.useLetsEncrypt) {
        server = letsencryptExpress.create({
            server: 'staging',
            email: 'john.doe@example.com',
            agreeTos: true,
            approveDomains: config.domains,
            app: app
        }).listen(config.httpPort, config.port);
    } else {
        server = app.listen(config.port, config.host);
    }
    server.on('error', (err) => {
        log.error(err);
    });
    server.on('listening', () => {
        let host = server.address().address;
        let port = server.address().port;
        log.info('App listening at https://%s:%s', host, port);
    });
});

death((signal, err) => {
    if (err) log.error(err);
    else if(signal) log.warn(`Received ${signal} signal.`);
    else log.error('Unexpected exit.', signal, err);
    process.exit(err ? -1 : 0);
});
