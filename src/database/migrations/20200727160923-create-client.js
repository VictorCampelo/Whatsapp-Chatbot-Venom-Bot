'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Client', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      numero: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      endereco: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      preco: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      valor_troco: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Client');
  }
};