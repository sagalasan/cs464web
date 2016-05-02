var express = require('express');
var NavbarHelper = require('./lib/navbarHelper');
var queries = require('./lib/queries');
var database = require('./lib/database');
var router = express.Router();

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

router.get('/', function (req, res, next) {
  var navbar = new NavbarHelper();
  navbar.setOptions("default");
  navbar.setActive("Employees");
  var queryError = (req.query.queryError === 'true');

  database.getEmployees(function(err, query, rows)
  {
    res.render('employees', {title: 'Employees', optionLinks: navbar.getOptions(), query: query, employees: rows, queryError: queryError});
  });
});

router.get('/create', function(req, res, next)
{
  var navbar = new NavbarHelper();
  navbar.setOptions("default");

  res.render('createemployee', {title: 'Create Employee', optionLinks: navbar.getOptions()});
});

router.post('/create', function(req, res, next)
{
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var address = req.body.address;

  database.createEmployee(firstName, lastName, address, function(err, query, rows)
  {
    res.redirect('/employees');
  });
});

router.post('/delete/:id', function(req, res, next)
{
  var id = req.params.id;

  database.deleteEmployee(id, function(err, query, rows)
  {
    res.redirect('/employees?queryError=' + err);
  });
});

module.exports = router;