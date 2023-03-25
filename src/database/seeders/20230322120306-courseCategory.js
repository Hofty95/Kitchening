'use strict';

/** @type {import('sequelize-cli').Migration} */

const CourseCategory = [{
  courseId:1,
  categoryId:1,
  createdAt: new Date()
},
{
  courseId:2,
  categoryId:2,
  createdAt: new Date()
},
{
  courseId:3,
  categoryId:3,
  createdAt: new Date()
},
{
  courseId:4,
  categoryId:4,
  createdAt: new Date()
}
]



module.exports = {
  async up (queryInterface, Sequelize) {

   await queryInterface.bulkInsert('CourseCategories', CourseCategory, {});

  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('CourseCategories', null, {});
  }
};
