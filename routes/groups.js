var express = require('express');
var NavbarHelper = require('./lib/navbarHelper');
var queries = require('./lib/queries');
var database = require('./lib/database');
var router = express.Router();

router.get('/', function(req, res, next)
{
  var navbar = new NavbarHelper();
  navbar.setOptions('default');

  database.getGroups(function(err, query, rows)
  {
    res.render('groups', {title: 'Groups', optionLinks: navbar.getOptions(), query: query, groups: rows});
  });
});

router.get('/group/', function(req, res, next)
{
  var navbar = new NavbarHelper();
  navbar.setOptions('default');
  var name = req.query.name;

  database.getGroup(name, function(err, query, rows)
  {
    database.getItemsInGroup(name, function(iErr, iQuery, iRows)
    {
      res.render('group', {title: 'Group', optionLinks: navbar.getOptions(), query: query, group: rows[0],
      itemsQuery: iQuery, items: iRows});
    });
  });
});

router.get('/create', function(req, res, next)
{
  var navbar = new NavbarHelper();
  navbar.setOptions('default');

  res.render('creategroup', {title: 'Create Group', optionLinks: navbar.getOptions()});
});


module.exports = router;