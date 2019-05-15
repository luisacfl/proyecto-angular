'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

let { Desaparecidx } = require('./mongodb/Desaparecidx');
let { User } = require('./mongodb/User');

const app = express();
const port = process.env.PORT || 3000;

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

//======DESAPARECIDOS==============

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
            (req.body.status == "update" || req.body.status == "delete")) {
            let newDesap = new Desaparecidx(req.body);
            newDesap.save((err, doc) => {
                if (err)
                    console.log(err);
                if (doc) {
                    res.status(201).send({ id: doc.id });
                } else {
                    res.status(400).send({ error: "no se guardó" });
                }
                return;
            });
        } else {
            res.status(400).send({
                error: "Faltan atributos"
            });
        }
    });

app.route('/api/desap/:id')
    .get((req, res) => {
        Desaparecidx.find({
            id: req.params.id
        }).then(des => {
            res.json(des)
        });
    })
    .put((req, res) => {
        Desaparecidx.findOneAndUpdate({
            _id: req.params.id
        }).then(des => {
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

//======FILTROS==============
app.route('/api/desap/search')
    .get((req, res) => {
        Desaparecidx.find(req.body)
            .then(des => {
                res.json(des);
            });
    });
//======LOGIN & LOGOUT==============

app.route('/api/user/login')
    .get((req, res) => {
        User.find({}).then(des => {
            res.json(des)
        });
    })
    .post((req, res) => {
        console.log("POST LOG");
        let usr = req.body.email;
        let pwd = req.body.contrasena;
        console.log("usr: " + usr + "    pwd:" + pwd);

        User.findOne({ email: usr }).then((user) => {
            console.log(user);
            if (pwd == user.contrasena) {
                let token = user.generateToken();
                user.token = token;
                User.updateOne({ email: usr }, user).then((usrUpdated) => {
                    console.log("actualizado");
                    console.log(usrUpdated);
                    res.set('x-auth', token);
                    res.send();
                    return;
                }).catch((er) => {
                    console.log(er);
                    res.status(400).send(er);
                })
            }
        }).catch((err) => {
            console.log(err);
            res.status(400).send({ err: "Usuario no existe" });
        })
    })

app.route('/api/user/logout')
    .get((req, res) => {
        let token = req.get('x-auth');
        if (!token) {
            console.log("no existe token");
            res.status(400).send({ error: "falta header con token" })
            return;
        }

        // * SE ASUME QUE SI HAY TOKEN
        let datosUsuario = User.verDatosToken(token);
        console.log(datosUsuario);
        if (datosUsuario && datosUsuario._id) {

            User.updateOne({ _id: datosUsuario._id }, { token: "123" }).then((doc) => {
                res.send(doc);
            }).catch((err) => {
                console.log(err);
                res.status(404).send();
            })
        }
    })

app.route('/api/user/login/:id')
    .get((req, res) => {
        User.find({
            id: req.params.id
        }).then(des => {
            res.json(des)
        });
    })

//======REGISTRO==============
app.route('/api/user/reg')
    .get((req, res) => {
        console.log("USER get ENTER");
        User.find({}).then(des => {
            res.json(des)
        });
    })
    .post((req, res) => {
        console.log("USER POST ENTER");
        if (req.body.nombre && req.body.email &&
            req.body.contrasena) {
            let newUser = new User(req.body);
            newUser.save((err, doc) => {
                if (err)
                    console.log(err);
                if (doc) {
                    res.status(201).send();
                } else {
                    res.status(400).send({ error: "no se guardó" });
                }
                return;
            });
        } else {
            res.status(400).send({
                error: "Faltan atributos"
            });
        }
    });


app.route('/api/user/reg:id')
    .put((req, res) => {
        Desaparecidx.findOneAndUpdate({
            _id: req.params.id
        }).then(des => {
            res.json(des)
        });
    });

// listen (start app with node server.js) ======================================
app.listen(port, () => console.log(`Example app listening on port ${port}! `));

function auth(req, res, next) {

    next();
}

function autenticar(req, res, next) {
    let token = req.get('x-auth');
    if (!token) {
        res.status(401).send({ error: "no hay token" });
        return;
    }

    User.verificarToken(token).then((user) => {
        console.log("Token verificado ...");
        req.userid = user._id;
        next();
    }).catch((err) => {
        res.status(401).send(err);
    });
}
