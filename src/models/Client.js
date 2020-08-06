const { Model, DataTypes } = require('sequelize');

class Client extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      number: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: false
      },
      address: DataTypes.STRING,
      payment: DataTypes.FLOAT,
    }, {
      tableName: 'Client',
      sequelize
    })
  }

  static associate(models){
    this.belongsToMany(models.Product, {
      foreignKey: {name: 'Client_id', unique: false},  
      through: {model: 'Product_has_Client', unique: false },
      as: 'products'
    })
    this.hasMany(models.Order, {foreignKey: 'Client_id', as: 'orders'})
  }
}

module.exports = Client;
