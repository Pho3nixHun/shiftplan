"use strict";
module.exports = exports = (() => {
    return {
        host: process.env.IP || '127.0.0.1',
        port: process.env.PORT || 3000,
        domains: [ process.env['C9_HOSTNAME'] ],
        useLetsEncrypt: false,
        log: {
            directory: './log',
            accessLevel: 'info',
            errorLevel: 'warn'
        }
    }
})();