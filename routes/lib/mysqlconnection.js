function newMysqlConnection(mysql) {
  return mysql.createConnection({
    host: '127.0.0.1',
    user: 'imuser',
    password: 'impass',
    database: 'sagalasan'
  });
}

module.exports = newMysqlConnection;