const express = require('express')
const router = express.Router()

const pool = require('../database')
const dbConfig = require('../keys')
const defaultThreadPoolSize = 4;


process.env.UV_THREADPOOL_SIZE = dbConfig.hrPool.poolMax + defaultThreadPoolSize;

async function conectar() {

    try{
        console.log("Inicializando modulo de BD")
        
        await pool.initialize()

    } catch(err){
        console.log(err)
        process.exit(1)
    }
}

conectar()


module.exports = router