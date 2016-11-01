"use strict";
const bodyParser = require('body-parser');

module.exports = exports = function(app, log) {
    app.use(bodyParser.json());
    app.get('/api', function (req, res, next) {
        res.json({hello:'world'});
        next();
    });
}