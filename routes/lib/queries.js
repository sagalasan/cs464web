exports.getClientsQuery = function()
{
  return "SELECT * FROM cs464_clients;";
};

exports.getEmployeesQuery = function()
{
  return "SELECT * FROM cs464_employees;";
};

exports.getSingleClient = function(client_id)
{
  return "SELECT * FROM cs464_clients WHERE client_id = " + client_id;
};

exports.getSingleEmployee = function(employee_id)
{
  return "SELECT * FROM cs464_employees WHERE employee_id = " + employee_id;
};

exports.getTransactionsQuery = function()
{
  return "SELECT * FROM cs464_transactions ORDER BY date DESC LIMIT 100";
};

exports.getTransactionsItemQuery = function(item_id)
{
  return "SELECT client_id, employee_id, date, quantity, price, order_type FROM cs464_transactions " +
      "WHERE item_id = " + item_id + " " +
          "ORDER BY date DESC LIMIT 20";
};

exports.getItemsQuery = function()
{
  return "SELECT * FROM cs464_items";
};

exports.getGroupsQuery = function()
{
  return "SELECT * FROM cs464_groups";
};

exports.getItemQuery = function (id)
{
  return "SELECT * FROM cs464_items WHERE item_id = " + id;
};

exports.getCreateItemQuery = function(name, description, price)
{
  return "INSERT INTO cs464_items (name, description, price) " +
      "VALUES ('" + name + "', '" + description + "', '" + price + "')";
};

exports.getDeleteItemQuery = function(id)
{
  return "DELETE FROM cs464_items WHERE item_id = " + id;
};

exports.getAveragePriceQuery = function(id)
{
  return "SELECT AVG(price) as average FROM cs464_transactions WHERE item_id = " + id;
};

exports.getMinimumPriceQuery = function(id)
{
  return "SELECT MIN(price) as min FROM cs464_transactions WHERE item_id = " + id;
};

exports.getMaximumPriceQuery = function(id)
{
  return "SELECT MAX(price) as max FROM cs464_transactions WHERE item_id = " + id;
};