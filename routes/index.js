var express = require('express');
var NavbarHelper = require('./lib/navbarHelper');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var navbar = new NavbarHelper();
  navbar.addOption("Home", "/", true);
  navbar.addOption("SomeLink", "#", false);
  
  res.render('index', { title: 'Express', optionLinks: navbar.options });
});

module.exports = router;
