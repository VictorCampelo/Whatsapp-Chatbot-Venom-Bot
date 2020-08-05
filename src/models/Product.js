const { Model, DataTypes } = require('sequelize');

class Product extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      describe: DataTypes.STRING,
      image_url: DataTypes.STRING
    }, {
      tableName: 'Product',
      sequelize
    })
  }

  static associate(models){
    this.belongsTo(models.User, {foreignKey: 'User_id', as: 'user'})
  }
}

module.exports = Product;
