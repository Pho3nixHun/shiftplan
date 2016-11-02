'use strict';

const config = require("./config/config");
const fs = require("fs");
const path = require("path");
const express = require('express');
const compression = require('compression');
const letsencryptExpress = require('letsencrypt-express');
const winstonExpress = require('winston-express');
const winstonExpressMiddleware = winstonExpress({
    accessLevel: config.log.accessLevel,
    accessFileName: 'combined.log',
    errorLevel: config.log.errorLevel,
    errorFileName: 'error.log',
    logFolder: config.log.directory,
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
const death = require('death')({uncaughtException: true});

const app = express();
app.use(winstonExpressMiddleware);
app.use(compression());
const middlewareDirectoryPath = path.join(process.cwd(), config.middlewareDirectory);
const middlewares = fs.readdirSync(middlewareDirectoryPath).filter((file) => path.extname(file) == '.js');
middlewares.forEach((mw) => {
   let middlewarePath = path.join(middlewareDirectoryPath, mw);
   log.info(`Registering middleware ${mw} at ${middlewarePath}`);
   require(middlewarePath)(app, log);
});

let server;
if (config.useLetsEncrypt) {
    server = letsencryptExpress.create({
        server: 'staging',
        email: 'john.doe@example.com',
        agreeTos: true,
        approveDomains: config.domains,
        app: app
    }).listen(config.httpPort, config.port);
}else{
    server = app.listen(config.port, config.host);
}
server.on('listening', () => {
  let host = server.address().address;
  let port = server.address().port;
  log.info('App listening at https://%s:%s', host, port);
});

death((signal, err) => {
    if (err) log.error(err);
    else if(signal) log.warn(`Received ${signal} signal.`);
    process.exit(err ? -1 : 0);
});