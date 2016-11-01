"use strict";
const extend = require("xtend");
const prodConfig = require("./config.production");
const devConfig = require("./config.development");

module.exports = exports = ((environment) => {
    let environmentBasedConfig = (environment || 'development').toLowerCase() == 'production' ? prodConfig : devConfig;
    let defaults = {
        host: '127.0.0.1',
        port: 3000,
        middlewareDirectory: './server/middlewares',
        log: {
            directory: './log',
            accessLevel: 'info',
            errorLevel: 'warn'
        }
    };
    return extend({}, defaults, environmentBasedConfig);
})(process.env.ENV);