let { mongoose } = require('./mongodb-connect');
const jwt = require ('jsonwebtoken');

let userSchema = mongoose.Schema({
    id: {
        type: Number, 
        required:true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        unique: true
    },
    contrasena: {
        type: String,
        required: true,
        minlength: 6
    },
    token: {
        type: String,
        required: false
    },
    tipo: {
        type: Number,//0: Administrador 1:Organizacion 2:Afiliado 3:Normal
        required: true
    },
    org:{
        type: String,
        required: false
    },
    seguidos:{
        type: Array,
        required:false,
        contains:{
            type:String
        }
    }
});

let secret = "claveSecreta" //Variable de entorno

userSchema.methods.generateToken = function () {
    let user = this;
    let token = jwt.sign({
        _id: user._id.toHexString(),
        tipo: user.tipo
    },
        'claveSecreta', //variable de entorno
        { expiresIn: 60 * 60 }).toString();
    return token;
}

userSchema.statics.verificarToken = function (token) {

    let usr = jwt.decode(token);
    console.log(usr);

    return new Promise((resolve, reject) => {
        User.findById(usr._id).then((user) => {
            if (token == user.token) {
                jwt.verify(token, 'claveSecreta', (err, decoded) => {
                    if (err) {
                        if (err.name == "TokenExpiredError") {
                            console.log("token expirado");
                        } else {
                            console.log("error al verificar token");
                        }
                        return reject(err);
                    } else {
                        return resolve(decoded);
                    }
                })
            } else {
                return reject({ error: "token no es igual al de la base de datos" });
            }
        })
    })
}

userSchema.statics.verDatosToken = function(token){
    return jwt.decode(token);
}

userSchema.methods.comparePassword = function(passw) {
    var hash;
    let user = this;
    console.log("compare pass "+user.contrasena);
    console.log(passw);

    return user.contrasena==passw;
    /*return new Promise ((resolve, reject)=>{
        bcrypt.compare(passw, user.contrasena, (err, res) => {
            console.log("inside user"+res);
            if(res){
                resolve(res);
            }
            else {
                console.log(err);
                reject(res);
            }
            // res == true
        }); 
    });*/
    
        
        /*function(err, isMatch) {
        console.log(isMatch);
        if (err) {
        return cb(err, false);
      }
      return cb(null, isMatch);
    });*/
  };

let User = mongoose.model('user', userSchema);

module.exports = { User }
