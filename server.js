var sequelize = require('sequelize');
var config = require('./config/config.json');
var express = require('express');
var app = require('express');
var faker = require('faker');
var restify = require('restify');

var db = require('./models');

var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.use(restify.CORS());

///////////// PRODUCTS /////////////

server.get('/products/:id', function (req, res) {
  db.Product.findById(req.params.id)
    .then(function (product) {
      if(product) {
        return res.json(product);
      } else {
        res.json({});
      }
    });
});

server.get('/products',  function (req, res) {
  db.Product.findAll( {
    include: [{
      model: db.Inventory,
      required: true
    }]
  })
    .then(function (products) {
      res.json(products);
    });
});



///////////// END PRODUCTS /////////////


/////////// ORDERS /////////////

server.get('/orders',  function (req, res) {
  db.Order.findAll()
    .then(function (orders) {
      res.json(orders);
    });
});

server.get('/orders/:id', function (req, res) {
  db.Order.findById(req.params.id)
    .then(function (order) {
      if(order) {
        return res.json(order);
      } else {
        res.json({});
      }
    });
});

server.post('/orders', function (req, res) {
  db .Order.create({
    name: req.body.name,
    product_id: req.body.product_id,
    quantity: req.body.quantity
  })
  .then(function (order) {
    return res.json(order);
  });
});

///////////// END ORDERS /////////////

server.listen(8080, function() {
  console.log('Going hard in the paint');
});