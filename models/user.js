'use strict';
const bcryptjs = require('bcryptjs');

const {
  Model, Transaction
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    get invoice() {
      return Transaction.findAll({
        where: {
          id: this.id
        }
      })
    }
    static associate(models) {
      User.hasOne(models.Wallet)
      User.belongsToMany(models.Product, {
        through: models.Transaction,
        foreignKey: "UserId"
      });
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `cant be empty`
        },
        notNull: {
          msg: `cant be empty`
        }
      }
    }, 
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `cant be empty`
        },
        notNull: {
          msg: `cant be empty`
        }
      }

    }, 
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `cant be empty`
        },
        notNull: {
          msg: `cant be empty`
        }
      }

    }, 
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: `cant be empty`
        },
        notNull: {
          msg: `cant be empty`
        }
      }

    }, 
  }, {
    hooks: {
      beforeCreate(instance, options){
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(instance.password, salt); 
        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};