"use strict";
const Timer = require("./Timer");
const timer = new Timer().start();
const spinner = new (require('cli-spinner').Spinner)('%s Building...');
const Builder = require('systemjs-builder');

// optional constructor options
// sets the baseURL and loads the configuration file
let builder = new Builder('./client', './client/systemjs.config.js');

console.log(`Build started at ${timer.startTime.toTimeString()}`);
spinner.setSpinnerString(1);
spinner.start();

builder
.bundle('./client/app/boot.js', './client/app/bundle.js', { minify: true })
.then(function() {
    spinner.stop(true);
    console.log(`Build completed (in ${timer.toSeconds()} seconds)`);
})
.catch(function(err) {
    spinner.stop(true);
    console.log(`Build error (in ${timer.toSeconds()} seconds)`);
    console.log(err);
});


