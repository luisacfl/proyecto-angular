let { mongoose } = require('./mongodb-connect')
const jwt = require('jsonWebtoken');
let userSchema = mongoose.Schema({
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
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    token: {
        type: String,
        required: true
    },
    acceso: {
        type: String,
        enum: ["admin", "organizacion", "afiliado", "usuario"],
        required: true,
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
        acceso: user.acceso
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

let User = mongoose.model('user', userSchema);

module.exports = { User }
