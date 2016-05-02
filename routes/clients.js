var express = require('express');
var NavbarHelper = require('./lib/navbarHelper');
var queries = require('./lib/queries');
var database = require('./lib/database');
var router = express.Router();

router.get('/client/', function (req, res, next) {
  var id = req.query.id;

  database.getClient(id, function (err, query, rows) {
    database.transactionsClientSum(id, function (tErr, tQuery, tRows) {
      database.totalBuyClient(id, function (bErr, bQuery, bRows) {
        database.totalSellClient(id, function (sErr, sQuery, sRows) {
          database.transactionsClient(id, function (cErr, cQuery, cRows) {
            var client = rows[0];
            var totalOrders = tRows[0].count;
            var totalSell = sRows[0].sales;
            var totalBuy = bRows[0].orders;
            res.render('client', {
              title: 'Client', query: query, client: client, totalOrders: totalOrders,
              totalSell: totalSell, totalBuy: totalBuy, transactions: cRows, totalOrdersQuery: tQuery,
              totalBuyQuery: bQuery, totalSellQuery: sQuery, transactionsQuery: cQuery
            });
          });
        });
      });
    });
  });
});

router.get('/', function (req, res, next) {
  var navbar = new NavbarHelper();
  navbar.setOptions("default");
  navbar.setActive("Clients");
  var queryError = (req.query.queryError === 'true');

  database.getClients(function (err, query, rows) {
    res.render('clients', {
      title: 'Clients',
      optionLinks: navbar.getOptions(),
      query: query,
      users: rows,
      queryError: queryError
    });
  });
});

router.get('/create', function (req, res, next) {
  var navbar = new NavbarHelper();
  navbar.setOptions("default");

  res.render('createclient', {title: 'Create Client', optionLinks: navbar.getOptions()});
});

router.post('/create', function (req, res, next) {
  var name = req.body.name;
  var address = req.body.address;

  database.createClient(name, address, function (err, query, rows) {
    res.redirect('/clients');
  });
});

router.post('/delete/:id', function (req, res, next) {
  var id = req.params.id;

  database.deleteClient(id, function (err, query, rows) {
    res.redirect('/clients?queryError=' + err);
  });
});

router.get('/orders', function(req, res, next)
{
  database.clientsOrders(function(err, query, rows)
  {
    res.render('orders', {title: "Orders", query: query, orders: rows});
  });
});


module.exports = router;