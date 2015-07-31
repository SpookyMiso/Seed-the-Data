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
  db.Product.findAll()
    .then(function (products) {
      res.json(products);
    });
});

server.listen(8080, function () {
  console.log('Going hard in the paint');
});