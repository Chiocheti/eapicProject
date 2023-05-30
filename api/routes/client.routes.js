const { Router } = require('express');

const clientController = require('../controllers/client.controller');

const clientRoutes = Router();

clientRoutes.get('/', clientController.index);

module.exports = clientRoutes;