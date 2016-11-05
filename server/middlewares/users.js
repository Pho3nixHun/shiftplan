"use strict";
const bodyParser = require('body-parser');
module.exports = exports = function(app, models, log) {
    const jsonParser = bodyParser.json();
    const urlEncoded = bodyParser.urlencoded({ extended: true });

    const User = models.User;
    const Token = models.Token;

    app.get('/api/user/:id?', (req, res, next) => {
        let id = req.params.id || null;
        let options = id ? { where: { id: id } } : null;

        User.findAll(options).then(
            (instances) => {
                res.json(instances);
                next();
            }
        ).catch((err)=>{
            res.json(err);
            next();
        });
    });
    
    app.post('/api/user', urlEncoded, (req, res, next) => {
        let data = req.body;
        User.create(data).then((instance) => {
            res.json(instance);
            next();
        }).catch((err)=>{
            res.json(err);
            next();
        });
    });
    
    app.delete('/api/user/:id', (req, res, next) => {
        let id = Number(req.params.id);
        User.destroy({
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
    
    app.put('/api/user/:id', urlEncoded, (req, res, next) => {
        let id = Number(req.params.id);
        let data = req.body;
        User.update(data, {
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
    
    app.post('/api/user/login', urlEncoded, (req, res, next) => {
        let data = req.body;
        res.setStatus(500)
        res.json({error:'not implemented'});
    });
}