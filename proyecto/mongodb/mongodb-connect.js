'use strict'
let mongoose = require("mongoose");
const dbConfig = require('../config/database.js');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//mongoose.set('useFindAndModify', false);

let db = mongoose.connection;

let desapSchema = new mongoose.Schema({
    prim_nombre: {
      type: String, 
      required: true
    },
    seg_nombre: {
      type: String, 
      required: false
    },
    apellido_pat: {
      type: String, 
      required: true
    },
    apellido_mat: {
      type: String, 
      required: false
    },
    fuerocomun_complexion: {
      type: String, 
      required: false
    },
    fuerocomun_dependencia: {
      type: String, 
      required: false
    },
    fuerocomun_desapentidad: {
      type: String, 
      required: false
    },
    fuerocomun_desapfecha: {
      type: String, 
      required: false
    },
    fuerocomun_desaphora: {
      type: String, 
      required: false
    },
    fuerocomun_desaplocalidad: {
      type: String, 
      required: false
    },
    fuerocomun_desapmunicipio: {
      type: String, 
      required: false
    },
    fuerocomun_desappais: {
      type: String, 
      required: false
    },
    fuerocomun_descripcion: {
      type: String, 
      required: false
    },
    fuerocomun_discapacidad: {
      type: String, 
      required: false
    },
    fuerocomun_edad: {
      type: String, 
      required: false
    },
    fuerocomun_estatura: {
      type: String, 
      required: false
    },
    fuerocomun_etnia: {
      type: String, 
      required: false
    },
    fuerocomun_nacionalidad: {
      type: String, 
      required: false
    },
    fuerocomun_sexo: {
      type: String, 
      enum: ['HOMBRE', 'MUJER'],
      required: false
    },
    status: {
      type: String, 
      enum: ['update', 'delete'],
      required: true
    }, //asumir que "update" es desaparecido y "delete" es encontrado
    duplicado: {
      type: Boolean, 
      required: true
    },// 0 es no duplicado
    lat: {
      type: Number, 
      required: false
    }, //Lat y long son solo para el mapa, no poner en detalle
    long: {
      type: Number, 
      required: false
    }, 
    img: {
      type: String,
      required: false
    }
  });
  let Desaparecidx = mongoose.model('desaparecidxs', desapSchema);
  //Prueba
  /*Desaparecidx.find({},(err, documentos)=>{
      if(err){
          console.log(err);
          return;
      }
      console.log(documentos);
  })*/
  module.exports = {Desaparecidx}