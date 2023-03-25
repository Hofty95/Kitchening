'use strict';

/** @type {import('sequelize-cli').Migration} */

const usersJson = require('../../data/users.json')

const user = usersJson.map(({name,surname,email,password}) => {
return{
  name,
  surname,
  email,
  password,
  avatar : null,
  rolID : 2,
  courseId : null,
  createdAt : new Date()
}
})



module.exports = {
  async up (queryInterface, Sequelize) {

   await queryInterface.bulkInsert('Users', user, {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users', null, {});
  }
};
