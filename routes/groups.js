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

module.exports = router;