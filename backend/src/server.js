const express = require("express");
const morgan = require('morgan');
const expresshbs = require('express-handlebars');

//INICIALIZAR
const app = express();


//SETTINGS
app.set('port', process.env.PORT || 4000);
app.engine('.hbs',expresshbs({

}))

//MIDLEWARES
app.use(morgan('dev'))
app.use(express.json());

//VARIABLES

app.use((req, res, next) =>{
  next();
})

//RUTAS
app.use(require('./routes/index'));
app.use(require('./routes/consultas'));
app.use(require('./routes/adminbd'));
//Public

//Iniciar server
app.listen(app.get('port'), ()=>{
  console.log("Server on port: ", app.get('port'))
});

