var express = require('express');
var NavbarHelper = require('./lib/navbarHelper');
var queries = require('./lib/queries');
var database = require('./lib/database');
var router = express.Router();

router.get('/', function(req, res, next)
{
  var navbar = new NavbarHelper();
  navbar.setOptions('default');
  navbar.setActive('Items');

  database.getItems(function(err, query, rows)
  {
    res.render('items', {title: 'Items', optionLinks: navbar.getOptions(), query: query, items: rows});
  });
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

router.get('/createitem', function(req, res, next)
{
  var navbar = new NavbarHelper();
  navbar.setOptions('default');

  res.render('createitem', {title: 'Create Item', optionLinks: navbar.getOptions()});
});

module.exports = router;