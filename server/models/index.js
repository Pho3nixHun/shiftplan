"use strict";

const fs = require('fs');
const path = require('path');
const dataDir = path.join(process.cwd(), 'data');
try { fs.accessSync(dataDir, fs.constants.F_OK ) } catch(ex) { fs.mkdirSync(dataDir) }

const Sequelize = require("sequelize");

const sequelize = new Sequelize('database', null, null, {
  //timezone: '+00:00', 
  dialect: 'sqlite',
  storage: path.join(dataDir, 'db.sqlite')
});
const db = {};

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf(".") !== 0) && (file !== "index.js"))
  .forEach((file) => {
    let model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;