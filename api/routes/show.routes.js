const { Router} = require('express');

const showController = require('../controllers/show.controller');

const showRoutes = Router();

showRoutes.get('/', showController.index);
showRoutes.get('/open', showController.open);
showRoutes.get('/one', showController.getOne);

module.exports = showRoutes;
