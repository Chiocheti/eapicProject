const { Router} = require('express');

const cpfController = require('../controllers/cpf.controller');

const cpfRoutes = Router();

cpfRoutes.get('/', cpfController.index);

module.exports = cpfRoutes;