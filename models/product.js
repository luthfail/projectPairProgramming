'use strict';
const {
  Model
} = require('sequelize');
const { Op } =require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    currency() {
      return new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD' }).format(this.price)
    }
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: 'CategoryId' })
      Product.belongsToMany(models.User, {
        through: models.Transaction,
        foreignKey: "ProductId"
      });
    }
    static productOutOfStock(){
      return Product.findAll({
        where: {
          stock: {
            [Op.gt]: 0
          }
        },
        order: [['name', 'ASC']],
        include: [sequelize.models.Category]
      })
    }

  }
  Product.init({
    name: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    CategoryId: DataTypes.INTEGER,
    Image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};