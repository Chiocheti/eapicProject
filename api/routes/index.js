const express = require('express');

const router = express.Router();

const showRoutes = require('./show.routes')
const cpfRoutes = require('./cpf.routes')

router.use('/show', showRoutes);
router.use('/cpf', cpfRoutes);

module.exports = router;
