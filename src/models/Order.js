const { Model, DataTypes } = require('sequelize');

const bcrypt = require('bcrypt')

class Order extends Model {
  static init(sequelize) {
    super.init({
    }, {
      tableName: 'Product_has_Client',
      sequelize
    })
  }

  static associate(models){
    this.belongsTo(models.Product, {foreignKey: 'Product_id', as: 'products'})
    this.belongsTo(models.Client, {foreignKey: 'Client_id', as: 'clients'})
  }

}

module.exports = Order;