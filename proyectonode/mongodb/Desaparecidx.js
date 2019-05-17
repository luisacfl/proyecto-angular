let {mongoose} = require('./mongodb-connect');

let desapSchema = new mongoose.Schema({
    id: {
        type: Number, 
        required:true,
        unique: true
    },
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
      enum: ['M', 'F'],
      required: false
    },
    status: {
      type: String,
      enum: ['update', 'delete'],
      required: true
    }, //asumir que "update" es desaparecido y "delete" es encontrado
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
    },
    creadoOrg: {
        type: String,
        required: false
    },
    creadoUsuario:{
        type: String, 
        required: true
    }
  });

let Desaparecidx = mongoose.model('desaparecidxs', desapSchema);
module.exports = { Desaparecidx }