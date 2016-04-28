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