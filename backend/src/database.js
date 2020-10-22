const mysql = require('mysql');
const { database } = require('./keys');

const { promisify } = require('util');
const pool = mysql.createPool(database);
pool.getConnection((err, connection) =>{
    if(err){    
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('No se puede conectar a la base de datos');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Demasiadas conexiones a la base de datos');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('CONNEXION DENEGADA');
        }
    }

    if(connection) connection.release();
    console.log('CONECTADO A LA BD');
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;