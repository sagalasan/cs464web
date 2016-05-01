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

router.get('/moneylost', function(req, res, next)
{
  var navbar = new NavbarHelper();
  navbar.setOptions('default');

  database.moneyLostOnInventory(function(err, query, rows)
  {
    res.render('moneylost', {title: 'Money Lost', optionLinks: navbar.getOptions(), query: query, rows: rows});
  });
});

module.exports = router;