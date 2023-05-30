const { Op } = require('sequelize');

const { Client, Cpf } = require('../models');

const clientController = {

    async index(req, res) {
        try {
            const clients = await Client.findAll({ order: ['name'] });

            return res.status(200).json(clients);
        } catch (error) {
            console.log(error);

            return res.status(500).json({ message: 'Server error:', error });
        }
    },
}

module.exports = clientController;