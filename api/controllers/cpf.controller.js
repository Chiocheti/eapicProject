const { Op } = require('sequelize');

const { Cpf } = require('../models');

const cpfController = {

    async index(req, res) {
        try {
            const cpfs = await Cpf.findAll();

            return res.status(200).json(cpfs);
        }
        catch (error) {
            console.log(error);

            return res.status(500).json({ message: 'Server error:', error });
        }
    },

    async search(req, res) {
        const {cpf} = req.body;

        try {
            const findCpf = await Cpf.findOne({ where: { cpf: cpf } });

            return res.status(200).json(findCpf);
        } catch (error) {
            console.log(error);

            return res.status(500).json({ message: 'Server error:', error });
        }
    },

    async store(req, res) {
        const cpf = req.body;

        try {
            const data = await Cpf.create(cpf);

            return res.status(200).json({ 'data': data });
        } catch (error) {
            console.log(error);

            return res.status(500).json({ message: 'Server error', error });
        }
    }
};

module.exports = cpfController;
