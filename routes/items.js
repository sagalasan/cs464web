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

function renderItemPage(req, res)
{

};

router.get('/item/', function(req, res, next)
{
  var navbar = new NavbarHelper();
  navbar.setOptions('default');
  var id = req.query.id;

  database.getItem(id, function(err, query, rows)
  {
    var item = rows[0];
    database.getTransactionsItem(id, function(tErr, tQuery, transactions)
    {
      database.getAveragePrice(id, function(aErr, avgQuery, avg)
      {
        database.getMinimumPrice(id, function(minErr, minQuery, min)
        {
          database.getMaximumPrice(id, function(maxErr, maxQuery, max)
          {
            var avgPrice = parseFloat(Math.round(avg[0].average * 100) / 100).toFixed(2);
            var minPrice = parseFloat(Math.round(min[0].min * 100) / 100).toFixed(2);
            var maxPrice = parseFloat(Math.round(max[0].max * 100) / 100).toFixed(2);
            res.render('item', {title: 'Item', optionLinks: navbar.getOptions(), tQuery: tQuery, item: item,
              transactions: transactions, avgPrice: avgPrice, minPrice: minPrice,
              maxPrice: maxPrice, avgPriceQuery: avgQuery, minPriceQuery: minQuery, maxPriceQuery: maxQuery});
          });
        });
      });
    });
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