const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  database: 'saboroso',
  password: '@Clear1841'
});

module.exports = connection;