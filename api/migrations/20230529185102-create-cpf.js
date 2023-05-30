/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.createTable('cpfs', {
        id: {
          allowNull: false,
          primaryKey: true,
          unique: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          validate: {
            isUUID: 4,
          },
        },
        cpf: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        }
      });
    },
    async down(queryInterface, Sequelize) {
      await queryInterface.dropTable('cpfs');
    }
  };