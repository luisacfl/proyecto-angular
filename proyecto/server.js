'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

let {Desaparecidx} = require('./mongodb/Desaparecidx');
let {User} = require('./mongodb/User');


const app = express();
const port = 3000;

// parse requests of content-type - application/json
let jsonParser = bodyParser.json();
let corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

//CORS Middleware

/*app.use( (req, res, next) => {
    //Enabling CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization');
    next();
   });*/

app.use(jsonParser);
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public'));

// routes ======================================================================
function autenticar(req,res, next){
    let token = req.get('x-auth');
    if(!token){
        res.status(401).send({error: "no hay token"});
        return;
    }

    User.verificarToken(token).then((user)=>{
        console.log("Token verificado ...");
        req.userid = user._id;
        next();
    }).catch((err)=>{
        res.status(401).send(err);
    });

}


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
//======LOGIN & LOGOUT==============

app.route('/api/user/login')
    .post((req, res)=>{
         

         let usr = req.body.email;
         let pwd = req.body.password;
         console.log("usr:"+usr+ " pwd:"+pwd);
        
         User.findOne({email:usr}).then((user)=>{
             console.log(user);
            if(pwd == user.password){
               let token =  user.generateToken();
               user.token = token;
               User.updateOne({email:usr}, user).then((usrUpdated)=>{
                    console.log("actualizado");
                    console.log(usrUpdated);
                    res.set('x-auth',token);
                    res.send();
                    return;
               }).catch((er)=>{
                   console.log(er);
                   res.status(400).send(er);
               })
            }
         }).catch((err)=> {
             console.log(err);
             res.status(400).send(err);
         })
         
    })

app.route('/api/user/logout')    
    .get((req, res)=>{
       let token = req.get('x-auth');
       if(!token){
           console.log("no existe token");
           res.status(400).send({error: "falta header con token"})
           return;
       }    

       // * SE ASUME QUE SI HAY TOKEN
       let datosUsuario = User.verDatosToken(token);
       console.log(datosUsuario);
       if(datosUsuario && datosUsuario._id){
           
           User.updateOne({_id:datosUsuario._id},{token: "123"}).then((doc)=>{
              res.send(doc);
           }).catch((err)=>{
               console.log(err);
               res.status(404).send();
           })
       }
    })



// listen (start app with node server.js) ======================================
app.listen(port, () => console.log(`Example app listening on port ${port}! `));

function auth(req, res, next) {

    next();
}
