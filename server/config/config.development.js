"use strict";
module.exports = exports = ( () => {
    return {
        host: process.env.IP ,
        port: process.env.PORT,
        log: {
            directory: './log',
            accessLevel: 'info',
            errorLevel: 'warn'
        }
    }
})();