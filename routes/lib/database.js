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
  getRows(query, callback);
};

exports.getEmployees = function(callback)
{
  var query = queries.getEmployeesQuery();
  getRows(query, callback);
};

function getRows(query, callback)
{
  pool.getConnection(function (err, connection)
  {
    if(err) {
      console.log(err);
      callback(true);
      return;
    }

    connection.query(query, function(err, rows)
    {
      if(err)
      {
        console.log(err);
        callback(true);
        return;
      }
      callback(false, query, rows); // Successful callback
    });
  });
}