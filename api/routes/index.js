const express = require('express');

const router = express.Router();

const showRoutes = require('./show.routes')
const cpfRoutes = require('./cpf.routes')
const clientRoutes = require('./client.routes')

router.use('/show', showRoutes);
router.use('/cpf', cpfRoutes);
router.use('/client', clientRoutes);

module.exports = router;
