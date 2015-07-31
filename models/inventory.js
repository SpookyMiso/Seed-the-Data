'use strict';
module.exports = function(sequelize, DataTypes) {
  var Inventory = sequelize.define('Inventory', {
    quantity: DataTypes.INTEGER,
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id'
      }
    }
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        Inventory.belongsTo(models.Product);
      }
    }
  });
  return Inventory;
};