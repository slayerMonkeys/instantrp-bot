import { Sequelize, Model } from "sequelize/types";
import { Snowflake, Guild } from "discord.js";

export async function createGuildSetting(sequelize: Sequelize, guild: Guild) {
    const guildSettingModel = require('../models/guildSettings')(sequelize);
    const guildSetting = await guildSettingModel.build({
        guildId: guild.id,
        owner: guild.ownerID
    })
    await guildSetting.save()
    return guildSetting;
}

export async function setLogsChannel(sequelize: Sequelize, guild: Guild, type: string, channelID: Snowflake) {
    const guildSettingModel: Model = require('../models/guildSettings')(sequelize);
    let cb;
    if(type === 'message') {
        cb = await guildSettingModel.update({
            channelLogs_message: channelID
        }, {
            where: {
                guildId: guild.id
            }
        });
    } else if(type === 'channel') {
        cb = await guildSettingModel.update({
            channelLogs_chan: channelID
        }, {
            where: {
                guildId: guild.id
            }
        })
    } else if(type === 'misc') {
        cb = await guildSettingModel.update({
            channelLogs_misc: channelID
        }, {
            where: {
                guildId: guild.id
            }
        })
    } else {
        return new Error('Logs type is invalid');
    }
    return cb;
}

export async function getChannelLog(sequelize, guild, type) {
    const guildSettingModel = require('../models/guildSettings')(sequelize);
    const guildSetting = await guildSettingModel.findOne({
        where: { 
            guildId: guild.id
        },
        attributes: ['channelLogs_message', 'channelLogs_chan', 'channelLogs_misc']
    });
    if(!guildSetting) return new Error('Guild setting not found !');
    let cb;
    if(type === 'message') {
        cb = guildSetting.channelLogs_message
    } else if(type === 'channel') {
        cb = guildSetting.channelLogs_chan
    } else if(type === 'misc') {
        cb = guildSetting.channelLogs_misc
    } else {
        return new Error('Logs type is invalid');
    }
    return cb;

}