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

exports.getGroupQuery = function(name)
{
  return "SELECT * FROM cs464_groups WHERE name = '" + name + "'";
};

exports.getItemsInGroupQuery = function(name)
{
  return "SELECT * FROM cs464_items " +
      "WHERE item_id IN (SELECT item_id FROM cs464_categories WHERE group_name = '" + name + "')";
};

exports.getCreateGroupQuery = function(name, desc)
{
  return "INSERT INTO cs464_groups (name, description) " +
          "VALUES ('" + name + "', '" + desc + "')";
};

exports.getDeleteGroupQuery = function(name)
{
  return "DELETE FROM cs464_groups WHERE name = '" + name + "'";
};

exports.getMoneyLostOnInventoryUpdatesQuery  = function()
{
  return "SELECT cs464_employees.employee_id as employee_id,\n" +
          "cs464_employees.first_name as first_name,\n" +
          "cs464_employees.last_name as last_name,\n" +
          "TRUNCATE(SUM(neg_updates.quantity_change * cs464_items.price), 2) as sum\n" +
          "FROM (SELECT * FROM cs464_updates WHERE quantity_change < 0) neg_updates\n" +
          "INNER JOIN cs464_employees ON cs464_employees.employee_id = neg_updates.employee_id\n" +
          "INNER JOIN cs464_items ON cs464_items.item_id = neg_updates.item_id\n" +
          "GROUP BY employee_id\n" +
          "ORDER BY sum;";
};

exports.getCreateTransactionQuery = function(employeeId, clientId, itemId, quantity, price, orderType)
{
  return "INSERT INTO cs464_transactions(employee_id, client_id, item_id, date, quantity, price, order_type) " +
          "VALUES ('" + employeeId + "', '" + clientId + "', '" + itemId + "', NOW(), '" + quantity + "', '" + price + "', '" + orderType + "')";
};