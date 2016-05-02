var express = require('express');
var NavbarHelper = require('./lib/navbarHelper');
var queries = require('./lib/queries');
var database = require('./lib/database');
var router = express.Router();

router.get('/client/', function(req, res, next)
{
  var navbar = new NavbarHelper();
  navbar.setOptions('default');
  var id = req.query.id;

  database.getClient(id, function(err, query, rows)
  {
    var client = rows[0];
    res.render('client', {title: 'Client', optionLinks: navbar.getOptions(), query: query, client: client});
  });
});

router.get('/', function (req, res, next)
{
  var navbar = new NavbarHelper();
  navbar.setOptions("default");
  navbar.setActive("Clients");
  var queryError = (req.query.queryError === 'true');

  database.getClients(function(err, query, rows)
  {
    res.render('clients', { title: 'Clients', optionLinks: navbar.getOptions(), query: query , users: rows, queryError: queryError});
  });
});

router.get('/create', function(req, res, next)
{
  var navbar = new NavbarHelper();
  navbar.setOptions("default");

  res.render('createclient', {title: 'Create Client', optionLinks: navbar.getOptions() });
});

router.post('/create', function(req, res, next)
{
  var name = req.body.name;
  var address = req.body.address;

  database.createClient(name, address, function(err, query, rows)
  {
    res.redirect('/clients');
  });
});

router.post('/delete/:id', function(req, res, next)
{
  var id = req.params.id;

  database.deleteClient(id, function(err, query, rows)
  {
    res.redirect('/clients?queryError=' + err);
  });
});


module.exports = router;