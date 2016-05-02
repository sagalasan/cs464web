var express = require('express');
var NavbarHelper = require('./lib/navbarHelper');
var queries = require('./lib/queries');
var database = require('./lib/database');
var router = express.Router();

router.get('/', function(req, res, next)
{
  var navbar = new NavbarHelper();
  navbar.setOptions('default');
  navbar.setActive('Transactions');

  database.getTransactions(function(err, query, rows)
  {
    res.render('transactions', {title: 'Transactions', optionLinks: navbar.getOptions(), query: query, transactions: rows});
  });
});

router.get('/create', function(req, res, next)
{
  var navbar = new NavbarHelper();
  navbar.setOptions('default');

  database.getEmployees(function(eErr, eQuery, eRows)
  {
    database.getClients(function(cErr, cQuery, cRows)
    {
      database.getItems(function(iErr, iQuery, iRows)
      {
        res.render('createtransaction', {title: 'Create Transaction', optionLinks: navbar.getOptions(),
        employees: eRows, clients: cRows, items: iRows});
      });
    });
  });
});

router.post('/create', function(req, res, next)
{
  var employeeId = req.body.employee;
  var clientId = req.body.client;
  var itemId = req.body.item;
  var quantity = req.body.quantity;
  var price = req.body.price;
  var orderType = req.body.orderType;

  database.createTransaction(employeeId, clientId, itemId, quantity, price, orderType, function(err, query, rows)
  {
    res.redirect('/transactions');
  });
});

router.post('/delete/:client')


router.get('/moneylost', function(req, res, next)
{
  var navbar = new NavbarHelper();
  navbar.setOptions('default');

  database.moneyLostOnInventory(function(err, query, rows)
  {
    res.render('moneylost', {title: 'Money Lost', optionLinks: navbar.getOptions(), query: query, rows: rows});
  });
});

router.get('/updates', function(req, res, next)
{
  database.inventoryUpdates(function(err, query, rows)
  {
    res.render('inventoryupdates', {title: 'Inventory Updates', query: query, updates: rows});
  });
});

router.get('/buy', function(req, res, next)
{
  database.orders('buy', function(err, query, rows)
  {
    res.render('buyorders', {title: 'Buy Orders', query: query, orders: rows});
  });
});

router.get('/sell', function(req, res, next)
{
  database.orders('sell', function(err, query, rows)
  {
    res.render('sellorders', {title: 'Sell Orders', query: query, orders: rows});
  });
});

module.exports = router;