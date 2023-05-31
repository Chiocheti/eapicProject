const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('cpfs', [
      {
        id: uuidv4(),
        cpf: '111.111.111-11',
        used: 2
      },
      {
        id: uuidv4(),
        cpf: '222.222.222-22',
        used: 2
      },
      {
        id: uuidv4(),
        cpf: '333.333.333-33',
        used: 2
      },
      {
        id: uuidv4(),
        cpf: '444.444.444-44',
        used: 2
      },
      {
        id: uuidv4(),
        cpf: '555.555.555-55',
        used: 2
      },
      {
        id: uuidv4(),
        cpf: '666.666.666-66',
        used: 2
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('shows', null, {});
  }
};
