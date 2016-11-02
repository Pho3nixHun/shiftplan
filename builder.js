"use strict";

class Timer{
    constructor(){
        Object.defineProperty(this, 'interval', {
            get: () => {
                if (this.startTime && this.stopTime){
                    return this.stopTime - this.startTime;
                } else if (this.startTime){
                    return new Date() - this.startTime;
                }
                return -1;
            }
        });
    }
    start(){
        if(this.startTime) return new Error('Already started');
        let start = new Date();
        Object.defineProperty(this, 'startTime', {
            get: () => start
        });
        return this;
    }
    stop(){
        if(this.endTime) return new Error('Already stopped');
        let end = new Date();
        Object.defineProperty(this, 'stopTime', {
            get: () => end
        });
        return this;
    }
    toSeconds(digits){
        return (this.interval/1000).toFixed(digits);
    }
}

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


