'use strict';

/** @type {import('sequelize-cli').Migration} */

const chefsJson = require('../../data/chefs.json')

const chefs = chefsJson.map(({name}) => {
  return {
    name,
    photo : null,
    description : null,
    createdAt: new Date()
  }
})


module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Chefs', chefs, {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Chefs', null, {});

  }
};
