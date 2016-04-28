var express = require('express');
var NavbarHelper = require('./lib/navbarHelper');
var queries = require('./lib/queries');
var database = require('./lib/database');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var navbar = new NavbarHelper();
  navbar.setOptions("default");
  navbar.setActive("Home");

  res.render('index', { title: 'Home', optionLinks: navbar.getOptions() });
});

router.get('/clients', function (req, res, next)
{
  var navbar = new NavbarHelper();
  navbar.setOptions("default");
  navbar.setActive("Clients");

  database.getClients(function(err, query, rows)
  {
    res.render('clients', { title: 'Clients', optionLinks: navbar.getOptions(), query: query , users: rows});
  });
});

router.get('/employees', function (req, res, next) {
  var navbar = new NavbarHelper();
  navbar.setOptions("default");
  navbar.setActive("Employees");

  database.getEmployees(function(err, query, rows)
  {
    res.render('employees', {title: 'Employees', optionLinks: navbar.getOptions(), query: query, employees: rows});
  });
});

router.get('/about', function (req, res, next) {
  var navbar = new NavbarHelper();
  navbar.setOptions("default");
  navbar.setActive("About");
  res.render('about', {title: 'About', optionLinks: navbar.getOptions()});
});

module.exports = router;
