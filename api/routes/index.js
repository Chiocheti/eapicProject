const express = require('express');

const router = express.Router();

const showRoutes = require('./show.routes')

router.use('/show', showRoutes);

module.exports = router;
