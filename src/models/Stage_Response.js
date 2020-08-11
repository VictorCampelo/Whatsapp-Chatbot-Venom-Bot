const { Model, DataTypes } = require('sequelize');

class Stage_Response extends Model {
  static init(sequelize) {
    super.init({
        stage1: DataTypes.STRING,
        stage2: DataTypes.STRING,
        stage3: DataTypes.STRING,
        stage4: DataTypes.STRING,
        stage5: DataTypes.STRING,
        stage6: DataTypes.STRING,
    }, {
        tableName: 'Stage_Response',
      sequelize
    })
  }

  static associate(models){
    this.belongsTo(models.User, {foreignKey: 'User_id', as: 'user'})
  }
}

module.exports = Stage_Response;
