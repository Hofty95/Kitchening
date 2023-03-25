'use strict';

/** @type {import('sequelize-cli').Migration} */

const courseJson = require('../../data/courses.json')

let images_db = [];

courseJson.forEach(({id,images}) => {
  images_db = [...images_db,...images.map(image => {
    return {
      name : image,
      courseId: id,
      createdAt : new Date(),
    }
  })]
});

module.exports = {
  async up (queryInterface, Sequelize) {

   await queryInterface.bulkInsert('Images', images_db, {});

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Images', null, {});

  }
};
