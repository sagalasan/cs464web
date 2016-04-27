var express = require('express');
var NavbarHelper = require('./lib/navbarHelper');
var MysqlConnection = require('./lib/mysqlconnection');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var navbar = new NavbarHelper();
  navbar.setOptions("default");
  navbar.setActive("Home");

  var mysql = new MysqlConnection();
  mysql.printRows();

  res.render('index', { title: 'Express', optionLinks: navbar.getOptions() });
});

router.get('/clients', function (req, res, next) {
  var navbar = new NavbarHelper();
  navbar.setOptions("default");
  navbar.setActive("Clients");
  res.render('clients', {title: 'Clients', optionLinks: navbar.getOptions()});
});

router.get('/employees', function (req, res, next) {
  var navbar = new NavbarHelper();
  navbar.setOptions("default");
  navbar.setActive("Employees");
  res.render('employees', {title: 'Employees', optionLinks: navbar.getOptions()});
});

router.get('/about', function (req, res, next) {
  var navbar = new NavbarHelper();
  navbar.setOptions("default");
  navbar.setActive("About");
  res.render('about', {title: 'About', optionLinks: navbar.getOptions()});
});

module.exports = router;
