const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: true,
    },
    apellido: {
        type: String,
        trim: true,
        required: false,
    },
    correo: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    contrasena: {
        type: String,
        trim: true,
        required: true
    },
    tipo: {
        type: Number,
        trim: true,
        required: true
    }
});
// hash user password before saving into database
UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.contrasena, saltRounds);
    next();
});
module.exports = mongoose.model('User', UserSchema);