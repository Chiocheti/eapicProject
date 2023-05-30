const { Op } = require('sequelize');

const { Cpf } = require('../models');

const cpfController = {

    async index(req, res) {
        try {
            const cpf = await Cpf.findAll();

            return res.status(200).json(cpf);
        }
        catch (error) {
            return res.status(500).json({ message: 'Server error:', error });
        }
    },
};

module.exports = cpfController;