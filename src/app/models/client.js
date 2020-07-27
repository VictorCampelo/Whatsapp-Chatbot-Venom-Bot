module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define('User', {
      numero: DataTypes.INTEGER,
      nome: DataTypes.STRING,
      endereco: DataTypes.STRING,
      preco: DataTypes.FLOAT,
      valor_troco: DataTypes.FLOAT,
    });
  
    return User;
  }