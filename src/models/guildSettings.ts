import { DataTypes, Sequelize } from 'sequelize';
import { IGuildSettingsInstance } from '../utils/interface';
module.exports = (sequelize: Sequelize) => {
  const guildSettingsShema = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    guildId: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    owner: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    channelLogs_message: {
      type: new DataTypes.STRING(255),
      allowNull: true,
    },
    channelLogs_chan: {
      type: new DataTypes.STRING(255),
      allowNull: true,
    },
    channelLogs_misc: {
      type: new DataTypes.STRING(255),
      allowNull: true,
    }
  };

  const guildSettingsModel = sequelize.define<IGuildSettingsInstance>('guildSettings', guildSettingsShema);
  return guildSettingsModel;
}