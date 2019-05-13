const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    create: function (req, res, next) {
        userExists=userModel.find({correo: req.body.correo});
        if(req.body.nombre && 
            req.body.correo && 
            req.body.contrasena && 
            req.body.tipo &&
            !userExists){
            
            userModel.create(req.body, function (err, result) {
                if (err)
                    next(err);
                else
                    res.json({ status: "success", message: "Usuario añadido exitosamente", data: null });
    
            });
        }    
    },
    authenticate: function (req, res, next) {
        userModel.findOne({ correo: req.body.correo }, function (err, userInfo) {
            if (err) {
                next(err);
            } else {
                if (bcrypt.compareSync(req.body.contrasena, userInfo.contrasena)) {
                    const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '1h' });
                    res.json({ status: "éxito", message: "usuario encontrado", data: { user: userInfo, token: token } });
                } else {
                    res.json({ status: "error", message: "Correo o contraseña no válidos", data: null });
                }
            }
        });
    },
}