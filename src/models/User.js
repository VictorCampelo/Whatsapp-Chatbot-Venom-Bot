const { Model, DataTypes } = require('sequelize');

const bcrypt = require('bcrypt')

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      is_superuser: DataTypes.TINYINT
    }, {
      tableName: 'User',
      sequelize
    })
  }

  static associate(models){
    this.hasMany(models.Product, {foreignKey: 'User_id', as: 'products'})

    this.hasOne(models.Stage_Response, {foreignKey: 'User_id', as: 'stages'})
  }

}

module.exports = User;