"use strict";

const credential = require("credential");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Shift)
      }
    },
    setterMethods: {
      password: (value) => {
        let pw = credential();
        pw.hash(value, (err, hash) => {
          this.setDataValue('passwordHash', hash);
        })
      }
    }
  });

  return User;
};