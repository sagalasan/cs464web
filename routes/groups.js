var express = require('express');
var NavbarHelper = require('./lib/navbarHelper');
var queries = require('./lib/queries');
var database = require('./lib/database');
var router = express.Router();

router.get('/', function(req, res, next)
{
  var navbar = new NavbarHelper();
  navbar.setOptions('default');
  var queryError = (req.query.qError === 'true');
  database.getGroups(function(err, query, rows)
  {
    res.render('groups', {title: 'Groups', optionLinks: navbar.getOptions(), query: query, groups: rows, queryError: queryError});
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

router.post('/create', function(req, res, next)
{
  var name = req.body.name;
  var desc = req.body.description;
  database.createGroup(name, desc, function(err, query, rows)
  {
    res.redirect('/groups');
  });
});

router.post('/delete/:name', function(req, res, next)
{
  var name = req.params.name;
  console.log(name);
  database.deleteGroup(name, function(err, query, rows)
  {
    console.log(query + " " + err);
    res.redirect('/groups?qError=' + err);
  });
});


module.exports = router;