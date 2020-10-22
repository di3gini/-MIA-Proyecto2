const mysql = require('mysql')
const config = {
    host: "localhost",
    user: "root",
    password: "22309403a",
    db: "Practica_MIA"
  };
  
  const pool = mysql.createPool(config);
  module.exports = pool;