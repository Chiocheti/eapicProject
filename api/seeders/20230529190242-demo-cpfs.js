const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('cpfs', [
      {
        id: uuidv4(),
        cpf: '1111111111',
        name: 'Gabriel',
      },
      {
        id: uuidv4(),
        cpf: '2222222222',
        name: 'Samuel',
      },
      {
        id: uuidv4(),
        cpf: '3333333333',
        name: 'Caio',
      },
      {
        id: uuidv4(),
        cpf: '4444444444',
        name: 'Marcelo',
      },
      {
        id: uuidv4(),
        cpf: '5555555555',
        name: 'Zé',
      },
      {
        id: uuidv4(),
        cpf: '6666666666',
        name: 'Urubu',
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('shows', null, {});
  }
};
