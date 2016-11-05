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
try { module.exports = exports = Timer; } catch (ex) { }