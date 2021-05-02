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
      Invoice.belongsToMany(models.Course, {
        through: models.CourseSold
      })
    }
  };
  Invoice.init({
    date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          args: true,
          msg: 'instructor name can not be empty'
        }
      }
    },
    users_email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'email format is invalid'
        },
        notEmpty: {
          args: true,
          msg: 'email name can not be empty'
        },

      }
    },
    payment_method: {
      type: DataTypes.STRING,
      validate: {
        isValidPaymentMethod(value){
          if(value !== 'CREDIT CARD' && value !== 'TRANSFER'){
            throw new Error('valid payment method are Transfer and Credit Card only!');
          }
        },
        notEmpty: {
          args: true,
          msg: 'payment method name can not be empty'
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};