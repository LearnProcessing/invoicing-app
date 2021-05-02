'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Courses', [
    {
      course_name: 'Microservices with Node JS and React',
      instructor: 'Stephen Grider',
      price: 300000,
      income_sharing: 0.2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      course_name: 'Node.js Unit Testing In-Depth',
      instructor: 'Murtez Alrohani',
      price: 250000,
      income_sharing: 0.25,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      course_name: 'Complete Guide to Elasticsearch',
      instructor: 'Bo Andersen',
      price: 150000,
      income_sharing: 0.3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      course_name: 'The Complete Junior to Senior Web Developer Roadmap (2021)',
      instructor: 'Andrei Neagoie',
      price: 250000,
      income_sharing: 0.3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      course_name: 'Node JS Cluster with PM2, RabbitMQ, Redis and Nginx',
      instructor: 'Pravinkumar Dabade',
      price: 150000,
      income_sharing: 0.2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    
  ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Courses', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
