const oracledb = require('oracledb')
const { promisify } = require('util')

const database  = require('./keys')

async function initialize(){
    const pool = await oracledb.createPool(database.hrPool)
    //await pool.getConnection()
    /*await pool.getConnection((err, connection) => {
        if(err) {
               if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                   console.error(('CONEXION A BASE DE DATOS PERDIDA'))
               }
               if (err.code === 'ER_CON_COUNT_ERROR') {
                   console.error(('DEMASIADAS CONEXIONES A LA BASE DE DATOS'))
               }
               if (err.code === 'ECONNREFUSED') {
                   console.error(('CONEXION A BASE DE DATOS DENEGADA'))
               }
               
           }
       
           if (connection) connection.release()
           console.log('CONEXION A LA BD')
           return
       })*/
}

async function close() {
    await oracledb.getPool().close();
  }

  function simpleExecute(statement, binds = [], opts = {}) {
    return new Promise(async (resolve, reject) => {
      let conn;
   
      opts.outFormat = oracledb.OBJECT;
      opts.autoCommit = true;
   
      try {
        conn = await oracledb.getConnection();
   
        const result = await conn.execute(statement, binds, opts);
   
        resolve(result);
      } catch (err) {
        reject(err);
      } finally {
        if (conn) { // conn assignment worked, need to close
          try {
            await conn.close();
          } catch (err) {
            console.log(err);
          }
        }
      }
    });
  }

module.exports.initialize = initialize
module.exports.close = close
module.exports.simpleExecute = simpleExecute