'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsToMany(models.Invoice, {
        through: models.CourseSold
      })
    }
  };
  Course.init({
    course_name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6],
          msg: 'course name should be at least six characters'
        }
      }
    },
    instructor: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [2],
          msg: 'instructor name should be at least two characters'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 0,
          msg: 'minimum price is 0'
        }
      }
    },
    income_sharing: {
      type: DataTypes.DECIMAL,
      validate: {
        min: {
          args: 0.2,
          msg: 'minimum income_sharing is 0.2' 
        }
      }

    },
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};