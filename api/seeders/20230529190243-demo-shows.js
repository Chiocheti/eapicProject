const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('shows', [
      {
        id: uuidv4(),
        show_name: 'Edson e Hudson + MC Don Juan',
        tickets_left: 1400,
        show_day: '2023-06-30'
      },
      {
        id: uuidv4(),
        show_name: 'Gusttavo Lima',
        tickets_left: 800,
        show_day: '2023-07-01'
      },
      {
        id: uuidv4(),
        show_name: 'Guilherme e Bennuto',
        tickets_left: 1400,
        show_day: '2023-07-02'
      },
      {
        id: uuidv4(),
        show_name: 'Thiaguinho + Hugo e Guilherme',
        tickets_left: 1400,
        show_day: '2023-07-07'
      },
      {
        id: uuidv4(),
        show_name: 'Luan Santana + Dennis DJ',
        tickets_left: 800,
        show_day: '2023-07-08'
      },
      {
        id: uuidv4(),
        show_name: 'Trio Parada Dura + Bruna Viola',
        tickets_left: 800,
        show_day: '2023-07-09'
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('shows', null, {});
  }
};
