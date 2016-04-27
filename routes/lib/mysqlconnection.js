var mysql = require('mysql');

function newMysqlConnection() {
  return mysql.createConnection({
    host: '127.0.0.1',
    user: 'imuser',
    password: 'impass',
    database: 'sagalasan'
  });
}


function MysqlConnection()
{
  this.printRows = function ()
  {
    var connection = newMysqlConnection();

    connection.connect();

    connection.query('select * from cs464_items', function(err, rows)
    {
      if(err) throw err;

      console.log(rows);
    });

    connection.end();
  }

}

module.exports = MysqlConnection;