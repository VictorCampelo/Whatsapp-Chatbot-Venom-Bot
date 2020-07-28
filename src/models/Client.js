const { Model, DataTypes } = require('sequelize');

class Client extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      numero: DataTypes.STRING,
      endereco: DataTypes.STRING,
      preco: DataTypes.FLOAT,
      valor_troco: DataTypes.FLOAT
    }, {
      tableName: 'Client',
      sequelize
    })
  }
}

module.exports = Client;
