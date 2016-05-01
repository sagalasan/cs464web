var mysql = require('mysql');
var queries = require('./queries');

var pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'imuser',
  password: 'impass',
  database: 'sagalasan',
  connectionLimit: 100,
  supportBigNumbers: true
});

exports.getClients = function(callback)
{
  var query = queries.getClientsQuery();
  executeQuery(query, callback);
};

exports.getEmployees = function(callback)
{
  var query = queries.getEmployeesQuery();
  executeQuery(query, callback);
};

exports.getClient = function(client_id, callback)
{
  var query = queries.getSingleClient(client_id);
  executeQuery(query, callback);
};

exports.getEmployee = function(employee_id, callback)
{
  var query = queries.getSingleEmployee(employee_id);
  executeQuery(query, callback);
};

exports.getTransactions = function(callback)
{
  var query = queries.getTransactionsQuery();
  executeQuery(query, callback);
};

exports.getItems = function(callback)
{
  var query = queries.getItemsQuery();
  executeQuery(query, callback);
};

exports.getGroups = function(callback)
{
  var query = queries.getGroupsQuery();
  executeQuery(query, callback);
};

exports.getItem = function (id, callback)
{
  var query = queries.getItemQuery(id);
  executeQuery(query, callback);
};

exports.createItem = function(name, description, price, callback)
{
  var query = queries.getCreateItemQuery(name, description, price);
  executeQuery(query, callback);
};

exports.deleteItem = function(id, callback)
{
  var query = queries.getDeleteItemQuery(id);
  executeQuery(query, callback);
};

function executeQuery(query, callback)
{
  pool.getConnection(function (err, connection)
  {
    if(err) {
      console.log(err);
      callback(true, query);
      return;
    }

    connection.query(query, function(err, rows)
    {
      if(err)
      {
        console.log(err);
        callback(true, query);
        return;
      }
      callback(false, query, rows); // Successful callback
    });
  });
}