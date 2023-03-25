'use strict';

/** @type {import('sequelize-cli').Migration} */

const chefsJson = require('../../data/chefs.json')
const courseJson = require('../../data/courses.json')


const courses = courseJson.map(({title,price,description,chef}) => {
  return {
    name : title,
    price,
    description,
    discount: 0,
    chefId:chefsJson.find(itemChef => itemChef.name === chef).id,
    createdAt: new Date()
  }
})


module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Courses', courses, {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Courses', null, {});

  }
};
