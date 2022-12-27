const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "gaurav",
  password: "gaurav",
  database : "togglebytes"
});

module.exports = connection;