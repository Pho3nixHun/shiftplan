"use strict";

const uuid = require('node-uuid');

module.exports = function(sequelize, DataTypes) {
  var Token = sequelize.define("Token", {
    token: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        defaultValue: uuid.v1
    },
    expires: {
        type: DataTypes.BIGINT,
        defaultValue: () => {
            return +new Date() + 1000*60*60;
        }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Token.belongsTo(models.User)
      }
    },
    getterMethods: {
        expired: () => {
            return this.expires < new Date().getTime();
        }
    }
  });

  return Token;
};