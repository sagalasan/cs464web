var express = require('express');
var NavbarHelper = require('./lib/navbarHelper');
var queries = require('./lib/queries');
var database = require('./lib/database');
var router = express.Router();

function renderHome(req, res)
{
  var navbar = new NavbarHelper();
  navbar.setOptions('default');
  navbar.setActive('Items');
  var queryError = req.query.queryError;

  database.getItems(function(err, query, rows)
  {
    res.render('items', {title: 'Items', optionLinks: navbar.getOptions(), query: query, items: rows, queryError: queryError});
  });
}

router.get('/', renderHome);

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

router.get('/create', function(req, res, next)
{
  var navbar = new NavbarHelper();
  navbar.setOptions('default');

  res.render('createitem', {title: 'Create Item', optionLinks: navbar.getOptions()});
});

router.post('/create', function(req, res)
{
  var navbar = new NavbarHelper();
  navbar.setOptions('default');
  var name = req.body.name;
  var desc = req.body.description;
  var price = req.body.price;

  database.createItem(name, desc, price, function(err, query, rows)
  {
    var createPass = true;
    if(err) createPass = false;
    console.log(query);
    res.render('createitem', {title: 'Create Item', optionLinks: navbar.getOptions(), alertName: name, createPass: createPass})
  });
});

router.post('/delete/:id', function(req, res, next)
{
  var navbar = new NavbarHelper();
  navbar.setOptions('default');
  var id = req.params.id;

  database.deleteItem(id, function(err, query, rows)
  {
    res.redirect('/items?queryError=true');
  });
});

module.exports = router;