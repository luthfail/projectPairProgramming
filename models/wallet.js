'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    currency() {
      return new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD' }).format(this.accountBalance)
    }
    static associate(models) {
      Wallet.belongsTo(models.User)
    }
  }
  Wallet.init({
    accountBalance: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Wallet',
  });
  return Wallet;
};