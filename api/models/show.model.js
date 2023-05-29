const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Show extends Model {
    static associate(models) {
      this.hasMany(models.Client, {as: 'clients', foreignKey: 'showId'})
     }
  }
  Show.init({
    showName: DataTypes.STRING,
    showDay: DataTypes.DATE,
    ticketsLeft: DataTypes.INTEGER
  },
    {
      sequelize,
      modelName: 'Show',
      tableName: 'shows',
      underscored: true,
      timestamps: false,
      hooks: {
        beforeCreate: (show) => {
          show.id = uuidv4();
        },
      },
    });

  return Show;
};