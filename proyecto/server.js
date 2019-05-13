'use strict'
const express = require('express');
const logger = require ('morgan');
const users = require ('./routes/users');
const desaparecidxs = require ('./routes/desaparecidxs');
const bodyParser = require('body-parser');
const mongoose = require('./config/database');
var jwt = require('jsonwebtoken');

const cors = require('cors');

const app = express();
const port = 3000;

//CORS Middleware
app.use( (req, res, next) => {
    //Enabling CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization');
    next();
   });

// parse requests of content-type - application/json
let jsonParser = bodyParser.json();
let corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

app.use(jsonParser);
app.use(cors(corsOptions));

app.use(express.static(__dirname + '/public'));

app.set('secretKey', 'nodeRestApi'); // jwt secret token

//connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

// routes ======================================================================
app.route('/api/user/login')
    .post((req,res)=>{
        let usr = req.body.correo;
        let pwd = req.body.contrasena;

        console.log("usr:"+usr+" pwd"+pwd);
        
    })

// public route
app.use('/users', users);

// private route
app.use('', validateUser, desaparecidxs);

function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
      if (err) {
        res.json({status:"error", message: err.message, data:null});
      }else{
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
    });
}
// listen (start app with node server.js) ======================================
app.listen(port, () => console.log(`Example app listening on port ${port}! `));
