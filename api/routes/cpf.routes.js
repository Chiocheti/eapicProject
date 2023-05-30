const { Router} = require('express');

const cpfController = require('../controllers/cpf.controller');

const cpfRoutes = Router();

cpfRoutes.get('/', cpfController.index);
cpfRoutes.post('/', cpfController.store);
cpfRoutes.post('/search', cpfController.search);

module.exports = cpfRoutes;