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