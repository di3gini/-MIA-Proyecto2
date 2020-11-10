const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const oracledb = require('oracledb')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const pool = require('../database')
const dbConfig = require('../keys')
const keys = require('../keys')

const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir: __dirname + '/uploads' });
const defaultThreadPoolSize = 4;


process.env.UV_THREADPOOL_SIZE = dbConfig.hrPool.poolMax + defaultThreadPoolSize;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'diegorenemolina@gmail.com',
      pass: '22309403Gen'
    }
  });
  
  router.post('/upload', multipartMiddleware, async (req, res) => {
    console.log(req.files.uploads[0].path.split('/')[10]);

    res.json({
        'msg': req.files.uploads[0].path.split('/')[10]
    });
});

async function sendEmail(from, to, subject, content){
    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: content
      };

      transporter.sendMail(mailOptions, function (error, info) {
        //console.log(msg_str_altervpn_ini);
        if (error) {
          //  console.log(msg_str_mail_error + msg_str_mail_respu + error);
          console.log("Error en el envio: " + error)  
          //callback(true);
            
        } else {
           // console.log(msg_str_mail_envia + msg_str_mail_respu + info.response);
           console.log("Envio exitoso: " + info) 
            //callback(false);
        }
        //console.log(msg_str_altervpn_fin);
    });
}


async function conectar() {

    try{
        console.log("Inicializando modulo de BD para autenticación")
        
        await pool.initialize()
        

    } catch(err){
        console.log(err)
        process.exit(1)
    }
}

router.get('/getCategoria', async (rez, res) => {
    const sql = "SELECT * FROM CATEGORIA";
    conectar()
    const resultado = await pool.simpleExecute(sql)
    const categoria = resultado.rows;
    
    
    res.status(200).json(categoria);
});
async function insertarLog(descripcion){
    const query = 'INSERT INTO "TEST"."LOG" (DESCRIPCION, FECHA) ' +
    "VALUES (:log_desc, :log_fecha)"


    conectar()
    const resultado = await pool.simpleExecute(query,{
        log_desc: descripcion,
        log_fecha: new Date(Date.now())
    })
    

}

router.post('/crearCategoria', async (req, res) => {
    
      
    var categoria = {
        nombre: req.body.nombreCat
    }
    const query = 'INSERT INTO "TEST"."CATEGORIA" (NOMBRE) ' +
                   "VALUES (:cat_nm)"
    conectar()
    const resultado = await pool.simpleExecute(query,{
        cat_nm: categoria.nombre
    })

    const desc = "Administrador inserto la categoria: \""+ categoria.nombre +"\""
    await insertarLog(desc);
    console.log(resultado);
    res.send(resultado);
});

router.post('/crearProducto', async (req, res) => {
    
    var categoria = {
        pro_nombre: req.body.nombre, 
        pro_desc: req.body.descripcion, 
        pro_precio: req.body.precio,
        pro_claves: req.body.claves,
        pro_usuario: req.body.usuario, 
        pro_cat: req.body.categoria,
        pro_imagen: req.body.imagen
    }
    const query = 'INSERT INTO "TEST"."PRODUCTO" (NOMBRE, DESCRIPCION, PRECIO, PALABRAS_CLAVES, USUARIO, CATEGORIA, IMAGEN)' +
                  'VALUES (:pro_nombre, :pro_desc, :pro_precio, :pro_claves, :pro_usuario, :pro_cat, :pro_imagen)'
    conectar()
    const resultado = await pool.simpleExecute(query,{
        pro_nombre: req.body.nombre, 
        pro_desc: req.body.descripcion, 
        pro_precio: req.body.precio,
        pro_claves: req.body.claves,
        pro_usuario: req.body.usuario, 
        pro_cat: req.body.categoria,
        pro_imagen: req.body.imagen
    })
    console.log(categoria)
    const desc = req.body.correo + "creó un nuevo producto de nombre \""+ req.body.nombre +"\""
    await insertarLog(desc);
    console.log(resultado);
    res.status(200).json({msg:true})
});

module.exports = router