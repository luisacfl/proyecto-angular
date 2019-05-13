const Desaparecidx = require('../models/desaparecidxs');

module.exports = {
    getAll: function (req, res, next) {
        let desapList = [];
        Desaparecidx.find({}, (err, docs) => {
            if (err) {
                next(err);
            } else {
                for (let desapItem of docs) {
                    desapList.push(desapItem);
                }
                res.json(docs);
            }
        })
    },
    getById: function (req, res, next) {
        Desaparecidx.findById(req.params.id, function (err, desapInfo) {
            if (err) {
                next(err);
            } else {
                res.json(desapInfo);
            }
        });
    },
    updateById: function (req, res, next) {
        Desaparecidx.findByIdAndUpdate(req.params.id, function (err, des) {
            if (err)
                next(err);
            else {
                res.json(des);
            }
        });
    },

    deleteById: function (req, res, next) {
        Desaparecidx.findByIdAndRemove(req.params.id, function (err, des) {
            if (err)
                next(err);
            else {
                res.json(des);
            }
        });
    },
    create: function (req, res, next) {
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
        } else {
            res.status(400).send({
                error: "Faltan atributos"
            });
        }
    },
}