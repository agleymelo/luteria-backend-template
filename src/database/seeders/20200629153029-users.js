'use strict'

const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Luteria Scrits',
          email: 'luteria@scripts.com',
          password_hash: bcrypt.hashSync('luteria', 8),
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
  }
}
