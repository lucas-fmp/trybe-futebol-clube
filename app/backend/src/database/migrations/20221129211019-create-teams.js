'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      team_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        field: 'team_name'
      },
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('teams');
  }
};
