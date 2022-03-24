'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Product, { 
        foreignKey: "ProductId",
        targetKey: "id"
      });
      Transaction.belongsTo(models.User, { 
        foreignKey: "UserId",
        targetKey: "id"
      });
    }
  }
  Transaction.init({
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    Price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};