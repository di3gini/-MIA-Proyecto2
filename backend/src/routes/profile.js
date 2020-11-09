const express = require('express')
const router = express.Router()
var jwt = require('jsonwebtoken');
const pool = require('../database')
const dbConfig = require('../keys')
const defaultThreadPoolSize = 4;

process.env.UV_THREADPOOL_SIZE = dbConfig.hrPool.poolMax + defaultThreadPoolSize;

async function conectar() {

    try{
        console.log("Inicializando modulo de BD para autenticación")
        
        await pool.initialize()
        

    } catch(err){
        console.log(err)
        process.exit(1)
    }
}

conectar()
router.get('/profile', async (req, res) => {
    
    var token;
    var payload;
 
    if (!req.headers.authorization) {
        return res.status(401).send({message: 'You are not authorized'});
    }
 
    token = req.headers.authorization.split(' ')[1];
 
    try {
        payload = jwt.verify(token, config.jwtSecretKey);
    } catch (e) {
        if (e.name === 'TokenExpiredError') {
            res.status(401).send({message: 'Token Expired'});
        } else {
            res.status(401).send({message: 'Authentication failed'});
        }
 
        return;
    }
 
    const resultado = await pool.simpleExecute('SELECT * FROM "TEST"."USUARIO"');
    
    console.log(resultado);
    res.json(resultado);
});


module.exports = router