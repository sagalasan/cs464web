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

router.get('/item/', function(req, res, next)
{
  var navbar = new NavbarHelper();
  navbar.setOptions('default');
  var id = req.query.id;

  database.getItem(id, function(err, query, rows)
  {
    var item = rows[0];
    res.render('item', {title: 'Item', optionLinks: navbar.getOptions(), query: query, item: item});
  });
});

router.get('/items', function(req, res, next)
{
  var navbar = new NavbarHelper();
  navbar.setOptions('default');
  navbar.setActive('Items');

  database.getItems(function(err, query, rows)
  {
    res.render('items', {title: 'Items', optionLinks: navbar.getOptions(), query: query, items: rows});
  });
});

router.get('/createitem', function(req, res, next)
{
  var navbar = new NavbarHelper();
  navbar.setOptions('default');

  res.render('createitem', {title: 'Create Item', optionLinks: navbar.getOptions()});
});


router.get('/groups', function(req, res, next)
{
  var navbar = new NavbarHelper();
  navbar.setOptions('default');

  database.getGroups(function(err, query, rows)
  {
    res.render('groups', {title: 'Groups', optionLinks: navbar.getOptions(), query: query, groups: rows});
  });
});

router.get('/transactions', function(req, res, nex)
{
  var navbar = new NavbarHelper();
  navbar.setOptions('default');
  navbar.setActive('Transactions');

  database.getTransactions(function(err, query, rows)
  {
    res.render('transactions', {title: 'Transactions', optionLinks: navbar.getOptions(), query: query, transactions: rows});
  });
});

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

router.get('/employee/', function(req, res, next)
{
  var navbar = new NavbarHelper();
  navbar.setOptions('default');
  var id = req.query.id;

  database.getEmployee(id, function(err, query, rows)
  {
    var employee = rows[0];
    res.render('employee', {title: 'Employee', optionLinks: navbar.getOptions(), query: query, employee: employee});
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
