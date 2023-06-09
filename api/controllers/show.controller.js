const { Op } = require('sequelize');

const { Show } = require('../models');

const showController = {

  async index(req, res) {
    try {
      const shows = await Show.findAll();

      return res.status(200).json(shows);
    }
    catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Server error:', error });
    }
  },

  async open(req, res) {
    try {
      const shows = await Show.findAll({ where: { tickets_left: { [Op.gt]: 0 } }, order: ['show_day'] });

      return res.status(200).json(shows);
    }
    catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Server error:', error });
    }
  },

  async getOne(req, res) {

    const { id } = req.body;

    try {
      const shows = await Show.findOne({ where: { id: id, } });

      return res.status(200).json(shows);
    }
    catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Server error:', error });
    }
  },
};

module.exports = showController;
