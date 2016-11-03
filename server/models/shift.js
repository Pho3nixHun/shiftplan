"use strict";

module.exports = function(sequelize, DataTypes) {
  var Shift = sequelize.define("Shift", {
    startDate: DataTypes.DATE,
    length: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Shift.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: true
          }
        });
      }
    }
  });

  return Shift;
};