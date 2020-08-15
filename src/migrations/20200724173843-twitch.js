'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Twitches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
        discordID: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        twitchUserID: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        announced: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        started_at: {
            type: Sequelize.DATE,
            allowNull: true
        },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Twitches');
  }
};
