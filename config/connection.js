// get the client
const mysql = require('mysql2/promise');

// create the connection to database
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '0987654321',
  database: 'employee_db'
});

connection.connect(function (err) {
    if (err) throw err;
});
  
module.exports = connection;