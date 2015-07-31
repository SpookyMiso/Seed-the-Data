var models = require('../models');
var faker = require('faker');

var Product = models.Product;

models.sequelize
  .sync({force: true})
  .then(function () {
    var productInfo = [];
    var numberOfEntries = faker.random.number({min:10, max:15});

    for(var i = 0; i < numberOfEntries; i++){

      productInfo.push({
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        price: parseFloat(faker.commerce.price())
    });
  }
  return models.Product
    .bulkCreate(productInfo, {returning: true})
    .then(function (products){
      var createInventory = [];

      for(var i = 0; i < products.length; i++) {

        createInventory.push({
          quantity: faker.random.number({min:10}),
          product_id: faker.random.number({min:1, max:products.length})
        });
      }
      return models.Inventory
        .bulkCreate(createInventory)
        .then(function (orders) {
          var createOrders = [];

          for(var i = 0; i < orders.length; i++) {

            createOrders.push({
              name: faker.name.firstName(),
              product_id: faker.random.number({min:1, max:orders.length}),
              quantity: faker.random.number({min:10})
            });
          }
          return models.Order
            .bulkCreate(createOrders);
        });
    });

  });