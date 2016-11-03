"use strict";

module.exports = exports = function(app, models, log){
    const fs = require('fs');
    const path = require('path');
    app.use(require('compression')());

    const middlewareDirectoryPath = path.join(__dirname);
    const middlewares = fs
        .readdirSync(middlewareDirectoryPath)
        .filter((file) => (file.indexOf(".") !== 0) && (file !== "index.js") && (path.extname(file) == '.js'))
        .forEach((mw) => {
            let middlewarePath = path.join(middlewareDirectoryPath, mw);
            log.info(`Registering middleware ${mw} at ${middlewarePath}`);
            require(middlewarePath)(app, models, log);
        });
}