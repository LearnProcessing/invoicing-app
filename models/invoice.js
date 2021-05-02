'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Invoice.init({
    date: DataTypes.DATE,
    users_email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'email format is invalid'
        }

      }
    },
    payment_method: {
      type: DataTypes.STRING,
      validate: {
        equals: {
          args: 'CREDIT CARD' || 'TRANSFER',
          msg: 'valid payment method are credit card and transfer only'
        },
        notNull: {
          args: true,
          msg: 'payment method is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};