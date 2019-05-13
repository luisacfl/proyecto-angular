'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

let {
    Desaparecidx
} = require('./mongodb/mongodb-connect');

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

// routes ======================================================================
app.route('/api/desap')
    .get((req, res) => {
        Desaparecidx.find({}, {
            
        }, (err, docs) => {
            if (err) {
                res.status(404).send();
                return;
            }
            res.json(docs);
        })
    })
    .post((req, res) => {
        if (req.body.prim_nombre &&
            req.body.apellido_pat &&
            (req.body.status == "update" || req.body.status == "delete") &&
            (req.body.duplicado == 0 || req.body.duplicado == 1)) {
            let newDesap = new Desaparecidx(req.body);
            newDesap.save((err, doc) => {
                if (err)
                    console.log(err);
                if (doc) {
                    res.status(201).send();
                } else {
                    res.status(400).send({ error: "no se guardó" });
                }
                return;
            });

            /*Desaparecidx.create(req.body, function (err, docs) {
                x = ObjectID();

                console.log(req.body);
                if(err) {
                    console.log(err);
                    res.status(400).send({
                        error: "No se pudo crear desaparecidx."
                    }); 
                    return; 
                }
                res.json(docs);
            });*/
        } else {
            res.status(400).send({
                error: "Faltan atributos"
            });
        }
    });

app.route('/api/desap/:id')
    .get((req, res) => {
        Desaparecidx.find({
            _id: req.params.id
        }).then(des => {
            res.json(des)
        });
    })
    .put((req, res) => {
        Desaparecidx.findOneAndUpdate(req.body).then(des => {
            res.json(des)
        });
    })
    .delete((req, res) => {
        Desaparecidx.findOneAndRemove({
            _id: req.params.id
        }).then(des => {
            res.json(des);
        });
    });


// listen (start app with node server.js) ======================================
app.listen(port, () => console.log(`Example app listening on port ${port}! `));

function auth(req, res, next) {

    next();
}
