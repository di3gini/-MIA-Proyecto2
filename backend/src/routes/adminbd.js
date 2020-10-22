const express = require('express');
const router = express.Router();
const pool = require('../dba');

router.get('/eliminarModelo', async (req,res) => {
    var resultado = await pool.query('DROP DATABASE Practica_MIA;')
    resultado = await pool.query('CREATE DATABASE Practica_MIA;')
    console.log(resultado);
    res.send("Se ha eliminado el modelo");
});

router.get('/cargarModelo', async (req,res) => {
    const resultado = await pool.query('source /home/diego/Proyectos/Archivos/-MIA-Practica/[MIA]InstruccionesDDL.sql;')
    console.log(resultado);
    res.send("Se ha creado el modelo de la base de datos");
});

module.exports = router;