
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const oracledb = require('oracledb')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const pool = require('../database')
const dbConfig = require('../keys')
const keys = require('../keys')
const defaultThreadPoolSize = 4;


process.env.UV_THREADPOOL_SIZE = dbConfig.hrPool.poolMax + defaultThreadPoolSize;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'diegorenemolina@gmail.com',
      pass: '22309403Gen'
    }
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


router.post('/login', async (req, res) => {
    
    
    var datos = {
        email: req.body.email
    }
    conectar()
    const resultado = await pool.simpleExecute('SELECT NOMBRE AS "Nombre", IDUSUARIO AS "Id",CONTRASENA AS "Pass" FROM "TEST"."USUARIO" WHERE CORREO=:usr_correo AND ESTADO=\'Y\'' + 
                                                ' FETCH FIRST 1 ROWS ONLY',
        {
            usr_correo: datos.email
        }
    );

    
    if (resultado.rows.length){
        const user = resultado.rows[0];

        bcrypt.compare(req.body.password, user.Pass, function(err, pwMatch) {
            var payload;
    
            if (err) {
                return next(err);
            }
    
            if (!pwMatch) {
                res.status(401).send({message: 'Correo o contraseña erronea.'});
                return;
            }

            payload = {
                check: true
            };
            const token = jwt.sign(payload, keys.jwtsecret.secret, {expiresIn: 1440})
            
            res.status(200).json({
                user: datos.email,
                id: user.Id,
                token: token,
                expires: 1440
            });
            console.log(token);
        });
    }



    
    //res.json(resultado);
});

router.get('/verifyToken', async (req, res) => {
    const token = req.query.token;
    if (token != null || token != undefined){
        jwt.verify(token, keys.jwtsecret.secret, (err, decoded) => {
            if (err) {
                console.log(err)
                return res.status(401).json({
                    status: 'falso'
                })
            } else {
                res.status(200).json({
                    status: 'correcto'
                })
                //console.log(decoded)
            }
        })
    } else{
        res.status(401).json({
            status: 'falso'
    })
}

})

router.post('/register', async (req, res) => {
    
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    
    var user = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.email,
        nacimiento: new Date(req.body.nacimiento)
    }
    const query = 'INSERT INTO "TEST"."USUARIO" (NOMBRE, APELLIDO, CORREO, NACIMIENTO, FOTO, CONTRASENA) ' +
                   "VALUES (:usr_nm,:usr_ap, :usr_mail, :usr_nac,'default',:usr_pass)"
    conectar()
    const resultado = await pool.simpleExecute(query,{
        usr_nm: user.nombre,
        usr_ap: user.apellido,
        usr_mail: user.correo,
        usr_nac: user.nacimiento,
        usr_pass: hashedPassword
    })
    const payload = {
        username: user.correo
    };
    const token = jwt.sign(payload, keys.jwtsecret.secret, {expiresIn: "1d"})
    const link = "http://localhost:4000/api/auth/confirmAccount?email=" +user.correo+"&token="+token
    const contenido = "Hola,<br> Por favor, haz click en el siguiente link para confirmar tu cuenta.<br><a href="+link+">Click aquí</a>"
    
    
    sendEmail("no-reply@gt-sales",user.correo, "Confirmación de cuenta", contenido)

    console.log(resultado);
    res.send(resultado);
});

router.get('/confirmAccount', async (req, res) => {
    
    const correo = req.query.email
    const token = req.query.token
    var estado
    const query = "UPDATE \"TEST\".\"USUARIO\" SET ESTADO = 'Y' WHERE CORREO = :usr_mail"
    jwt.verify(token, keys.jwtsecret.secret, (err, decoded) => {
        if (err) {
            estado = false
        } else{
            estado = true
        }
    })
    if(estado){
        conectar()
        const resultado = await pool.simpleExecute(query,{
            usr_mail: correo
        });
        console.log(resultado);
        res.send(resultado);
    }else{
        res.sendStatus(401);
    }   

});

router.get('/recover_password', async (req, res) => {
    
    const resultado = await pool.simpleExecute('SELECT * FROM "TEST"."USUARIO"');
    console.log(resultado);
    res.send(resultado);
});
module.exports = router