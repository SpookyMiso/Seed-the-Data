'use strict';
module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define('Order', {
    quantity: DataTypes.INTEGER,
    name: DataTypes.STRING,
    product_id: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        Order.hasMany(models.Inventory);
      }
    }
  });
  return Order;
};