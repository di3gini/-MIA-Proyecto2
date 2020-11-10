const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors')
//initialization

const app = express();
var corsOptions = {
    origin: "http://localhost:4001"
  };

//settings


app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(express.urlencoded(({extended: false})));
//app.use(express.json());

//Global Variables
app.use((req,res,next) => {
    next();
});

//Routes

app.use('/api',require('./routes'))
app.use('/api/auth',require('./routes/authentication'))
app.use('/links',require('./routes/links'))
app.use('/api', require('./routes/profile'))
app.use('/api/admin', require('./routes/admin'))
app.use('/api/products', require('./routes/products'))


//Public
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'uploads/productos')));
app.use(express.static('uploads'));
app.use(express.static(__dirname));

app.get('/:img', function(req, res){
    res.sendFile( __dirname + `/routes/uploads/${req.params.img}` );
}); 

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});