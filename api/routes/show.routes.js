const { Router} = require('express');

const showController = require('../controllers/show.controller');

const showRoutes = Router();

showRoutes.get('/', showController.index);

module.exports = showRoutes;