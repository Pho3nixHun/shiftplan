"use strict";
module.exports = exports = ( () => {
    return {
        host: process.env.IP ,
        port: process.env.PORT,
        domains: [ process.env['C9_HOSTNAME'] ],
        useLetsEncrypt: false,
        log: {
            directory: './log',
            accessLevel: 'info',
            errorLevel: 'warn'
        }
    }
})();