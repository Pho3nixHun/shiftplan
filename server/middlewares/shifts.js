"use strict";
const bodyParser = require('body-parser');
module.exports = exports = function(app, models, log) {
    const jsonParser = bodyParser.json();
    const urlEncoded = bodyParser.urlencoded({ extended: true });

    const Shift = models.Shift;
    const User = models.User;

    app.get('/api/shift/:year/:month?/:day?', (req, res, next) => {
        let year = Number(req.params.year);
        let month = Number(req.params.month);
        let day = Number(req.params.day);
        let startDate, endDate;
        if (year && month && month > 0 && day && day > 0){
            startDate = new Date(year, month-1, day, 0, 0, 0, 0);
            endDate = new Date(year, month, day, 23, 59, 59, 999);
        }else if(year && month && month > 0){
            startDate = new Date(year, month-1, 1, 0, 0, 0, 0);
            endDate = new Date(year, month, 0, 23, 59, 59, 999);
        }else if(year){
            startDate = new Date(year, 0, 1, 0, 0, 0, 0);
            endDate = new Date(year, 11, 31, 23, 59, 59, 999);
        }
        Shift.findAll({
            where: {
                startDate: {
                    $between: [startDate.getTime(), endDate.getTime()]
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
        });
    });
    
    app.post('/api/shift', urlEncoded, (req, res, next) => {
        let data = req.body;
        Shift.create(data).then((instance) => {
            res.json(instance);
            next();
        }).catch((err)=>{
            res.json(err);
            next();
        });
    });
    
    app.delete('/api/shift/:id', (req, res, next) => {
        let id = Number(req.params.id);
        Shift.destroy({
            where:{
                id: id
            }
        }).then((data) => {
            res.json({count: data});
            next();
        }).catch((err)=>{
            res.json(err);
            next();
        });
    });
    
    app.put('/api/shift/:id', urlEncoded, (req, res, next) => {
        let id = Number(req.params.id);
        let data = req.body;
        Shift.update(data, {
            where:{
                id: id
            }
        }).then((data) => {
            res.json(data);
            next();
        }).catch((err)=>{
            res.json(err);
            next();
        });
    });
}