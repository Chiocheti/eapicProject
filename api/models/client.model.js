const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate(models) {
      this.belongsTo(models.Show, {as: 'clients', foreignKey: 'showId'})
     }
  }
  Client.init({
    name: DataTypes.STRING,
    rg: DataTypes.DATE,
  },
    {
      sequelize,
      modelName: 'Client',
      tableName: 'clients',
      underscored: true,
      timestamps: false,
      hooks: {
        beforeCreate: (client) => {
            client.id = uuidv4();
        },
      },
    });

  return Client;
};