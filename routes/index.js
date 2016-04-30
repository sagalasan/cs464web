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

router.get('/about', function (req, res, next) {
  var navbar = new NavbarHelper();
  navbar.setOptions("default");
  navbar.setActive("About");
  res.render('about', {title: 'About', optionLinks: navbar.getOptions()});
});

module.exports = router;
