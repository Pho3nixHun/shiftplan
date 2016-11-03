"use strict";
const bodyParser = require('body-parser');
module.exports = exports = function(app, models, log) {
    const jsonParser = bodyParser.json();
    const urlEncoded = bodyParser.urlencoded({ extended: true });

    const Shift = models.Shift;
    const User = models.User;

    app.get('/api/shifts/:year/:month?/:day?', (req, res, next) => {
        let year = Number(req.params.year);
        let month = Number(req.params.month);
        let day = Number(req.params.day);
        let startDate, endDate;
        console.log(year, month, day);
        if (year && month && month > 0 && day && day > 0){
            console.log('Full-day')
            startDate = new Date(year, month-1, day, 0, 0, 0, 0);
            endDate = new Date(year, month, day, 23, 59, 59, 999);
        }else if(year && month && month > 0){
            console.log('Full-month')
            startDate = new Date(year, month-1, 1, 0, 0, 0, 0);
            endDate = new Date(year, month, 0, 23, 59, 59, 999);
        }else if(year){
            console.log('Full-year')
            startDate = new Date(year, 0, 1, 0, 0, 0, 0);
            endDate = new Date(year, 11, 31, 23, 59, 59, 999);
        }
        Shift.findAll({
            where: {
                startDate: {
                    $between: [startDate, endDate]
                }
            }
        }).then(
            (instances) => {
                res.json(instances);
                next();
            }
        ).catch((err)=>{
            res.json(err);
            next();
        })
    });
    app.post('/api/shifts', urlEncoded, (req, res, next) => {
        let data = req.body;
        console.log(data);
        Shift.create(data).then((instance) => {
            res.json(instance);
            next();
        }).catch((err)=>{
            res.json(err);
            next();
        });
    })
}