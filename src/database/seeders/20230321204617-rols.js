'use strict';

/** @type {import('sequelize-cli').Migration} */



module.exports = {
  async up (queryInterface, Sequelize) {

   await queryInterface.bulkInsert('Rols', [
    {
    name: 'user',
    createdAt : new Date()
    },
    {
    name: 'admin',
    createdAt : new Date()
    }
  ], {});

  },

  async down (queryInterface, Sequelize) {

   await queryInterface.bulkDelete('Rols', null, {});

  }
};
