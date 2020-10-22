const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '22309403a',
  database: 'Practica_MIA'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

connection.query('SELECT proveedor.nombre, proveedor.telefono,orden.id_orden, SUM(precio) AS precio FROM detalle_orden '+
          'INNER JOIN orden ON orden.id_orden = detalle_orden.orden INNER JOIN proveedor '+
          'ON proveedor.id_proveedor = orden.proveedor GROUP BY proveedor.nombre ORDER BY ' +
          'precio DESC LIMIT 1;', (err,rows) => {
  if(err) throw err;
  rows.forEach( (row) => {
    console.log(`${row.nombre} lives in ${row.telefono}`);
  });
});
