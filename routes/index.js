var express = require('express');
var NavbarHelper = require('./lib/navbarHelper');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var navbar = new NavbarHelper();
  navbar.setOptions("default");
  navbar.setActive("Home");
  res.render('index', { title: 'Express', optionLinks: navbar.getOptions() });
});

module.exports = router;
