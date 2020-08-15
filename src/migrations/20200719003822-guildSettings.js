'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('guildSettings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      guildId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      owner: {
        allowNull: false,
        type: Sequelize.STRING
      },
      channelLogs_message: {
        allowNull: true,
          type: Sequelize.STRING
      },
        channelLogs_chan: {
            allowNull: true,
            type: Sequelize.STRING
        },
        channelLogs_misc: {
            allowNull: true,
            type: Sequelize.STRING
        },
        whitelist: {
            allowNull: false,
            type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('guildSettings');
  }
};
