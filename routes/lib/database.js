var mysql = require('mysql');
var queries = require('./queries');

var pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'imuser',
  password: 'impass',
  database: 'sagalasan',
  connectionLimit: 100,
  supportBigNumbers: true,
  multipleStatements: true
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

exports.getTransactionsItem = function(id, callback)
{
  var query = queries.getTransactionsItemQuery(id);
  executeQuery(query, callback);
};

exports.getAveragePrice = function(id, callback)
{
  var query = queries.getAveragePriceQuery(id);
  executeQuery(query, callback);
};

exports.getMinimumPrice = function(id, callback)
{
  var query = queries.getMinimumPriceQuery(id);
  executeQuery(query, callback);
};

exports.getMaximumPrice = function(id, callback)
{
  var query = queries.getMaximumPriceQuery(id);
  executeQuery(query, callback);
};

exports.getGroup = function(name, callback)
{
  var query = queries.getGroupQuery(name);
  executeQuery(query, callback);
};

exports.getItemsInGroup = function(name, callback)
{
  var query = queries.getItemsInGroupQuery(name);
  executeQuery(query, callback);
};

exports.createGroup = function(name, desc, callback)
{
  var query = queries.getCreateGroupQuery(name, desc);
  executeQuery(query, callback);
};

exports.deleteGroup = function(name, callback)
{
  var query = queries.getDeleteGroupQuery(name);
  executeQuery(query, callback);
};

exports.moneyLostOnInventory = function(callback)
{
  var query = queries.getMoneyLostOnInventoryUpdatesQuery();
  executeQuery(query, callback);
};

exports.createTransaction = function(employeeId, clientId, itemId, quantity, price, orderType, callback)
{
  var query = queries.getCreateTransactionQuery(employeeId, clientId, itemId, quantity, price, orderType);
  executeQuery(query, callback);
};

exports.createClient = function(name, address, callback)
{
  var query = queries.getCreateClientQuery(name, address);
  executeQuery(query, callback);
};

exports.deleteClient = function(id, callback)
{
  var query = queries.getDeleteClientQuery(id);
  executeQuery(query, callback);
};

exports.createEmployee = function(firstName, lastName, address, callback)
{
  var query = queries.getCreateEmployeeQuery(firstName, lastName, address);
  executeQuery(query, callback);
};

exports.deleteEmployee = function(id, callback)
{
  var query = queries.getDeleteEmployeeQuery(id);
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