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

  database.getEmployees(function(err, query, rows)
  {
    res.render('employees', {title: 'Employees', optionLinks: navbar.getOptions(), query: query, employees: rows});
  });
});

module.exports = router;