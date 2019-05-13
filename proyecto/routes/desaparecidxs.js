const express = require('express');
const router = express.Router();
const desapController = require('../app/api/controllers/desaparecidxs');

router.get('/api/desap', desapController.getAll);
router.post('/api/desap', desapController.create);
router.get('/api/desap/:id', desapController.getById);
router.put('/api/desap/:id', desapController.updateById);
router.delete('/api/desap/:id', desapController.deleteById);

module.exports = router;
