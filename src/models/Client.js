const { Model, DataTypes } = require('sequelize');

class Client extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      number: DataTypes.STRING,
      address: DataTypes.STRING,
      payment: DataTypes.FLOAT,
    }, {
      tableName: 'Client',
      sequelize
    })
  }
}

module.exports = Client;
