'use strict';

/** @type {import('sequelize-cli').Migration} */

const categoriesJson = require('../../data/categories.json')

const category = categoriesJson.map(({category}) => {
  return {
    name : category,
    createdAt: new Date()
  }
})


module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Categories', category, {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Categories', category, {});

  }
};
