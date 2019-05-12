'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

let {Desaparecidx} = require('./mongodb/mongodb-connect');

const app = express();
const port = 3000;


// parse requests of content-type - application/json
let jsonParser = bodyParser.json();
let corsOptions = {
    origin: 'http://127.0.0.1:5500',
    optionsSuccessStatus: 200
}

app.use(jsonParser);
app.use(cors(corsOptions));

app.use(express.static(__dirname + '/public'));

// routes ======================================================================
app.route('/api/desap')
    .get((req, res) => {
        Desaparecidx.find({},{_id:0,prim_nombre:1},(err,docs)=>{
            if(err){
                res.status(404).send();
                return;
            }
            res.json(docs);
        })
    });


// listen (start app with node server.js) ======================================
app.listen(port, ()=>console.log(`Example app listening on port ${port}! `));