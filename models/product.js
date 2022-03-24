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
    static associate(models) {
      Product.belongsTo(models.Category)
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