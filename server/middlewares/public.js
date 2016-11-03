"use strict";
const express = require('express');
const path = require("path");

module.exports = exports = function(app, models, log) {
    let publicDirectory = path.join(process.cwd(), 'client');
    app.use(express.static(publicDirectory));
}