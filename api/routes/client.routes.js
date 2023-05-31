const { Router } = require('express');

const clientController = require('../controllers/client.controller');

const clientRoutes = Router();

clientRoutes.get('/', clientController.index);
clientRoutes.post('/', clientController.post);

module.exports = clientRoutes;
