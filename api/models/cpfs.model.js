const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Cpf extends Model {
    static associate(models) {

     }
  }
  Cpf.init({
    cpf: DataTypes.STRING,
    used: DataTypes.INTEGER,
  },
    {
      sequelize,
      modelName: 'Cpf',
      tableName: 'cpfs',
      underscored: true,
      timestamps: false,
      hooks: {
        beforeCreate: (cpf) => {
          cpf.id = uuidv4();
          cpf.used = 2;
        },
      },
    });

  return Cpf;
};
