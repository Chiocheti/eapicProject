const { Op } = require('sequelize');

const { Client, Cpf, Show } = require('../models');

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

  async byShow(req, res) {

    const { show } = req.body;

    try {
      const clients = await Client.findAll({where: {show_id: show}, order: ['name'] });

      return res.status(200).json(clients);
    } catch (error) {

      console.log(error);
      return res.status(500).json({ message: 'Server error:', error });
    }
  },

  async post(req, res) {

    const { cpf, ...client } = req.body;
    const { show_id } = client;

    try {

      const findCpf = await Cpf.findOne({ where: { cpf: cpf } });

      if (findCpf !== null) {
        const { dataValues } = findCpf;

        if (dataValues.used > 0) {
          const findShow = await Show.findOne({ where: { id: show_id, } });

          const { ticketsLeft } = findShow;

          const newShow = findShow.dataValues;

          if (ticketsLeft > 0) {
            newShow.ticketsLeft = ticketsLeft - 1;
            await Show.update(newShow, { where: { id: show_id } });

            dataValues.used -= 1;
            await Cpf.update(dataValues, { where: { cpf: cpf } });

            await Client.create(client);

            return res.status(200).json({ message: 'Entrada Registrada', status: 'success' });
          }

          return res.status(200).json({ message: 'Não tem mais bilhetes para o show escolhido', status: 'blocked' });
        }

        return res.status(200).json({ message: 'O Sindicalista não pode cadastrar mais bilhetes', status: 'expired' });
      }

      return res.status(200).json({ message: 'CPF não encontrado', status: 'not_found' });
    } catch (error) {

      console.log(error);
      return res.status(500).json({ message: 'Server error:', error });
    }

  }
}

module.exports = clientController;
