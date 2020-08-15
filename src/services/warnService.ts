import {Sequelize} from "sequelize/types"
import {GuildMember} from "discord.js";

export async function getWarnsByUser(sequelize: Sequelize, member: GuildMember) {
    const warnModel = require('../models/warn')(sequelize);

    const cb = await warnModel.findAll({
        where: {
            userId: member.id
        }
    })
    return cb;
}

export async function createWarn(sequelize: Sequelize, member: GuildMember, reason: string) {
    const warnModel = require('../models/warn')(sequelize);
    const countWarn = await warnModel.count({where: {userId: member.id}});
    const warn = await warnModel.build({userId: member.id, reason: reason, countWarn: countWarn + 1})
    await warn.save()
    return {
        valid: true,
        row: warn
    };
}

export async function removeWarn(sequelize: Sequelize, member: GuildMember, countWarn: number) {
    const warnModel = require('../models/warn')(sequelize);
    const warn = await warnModel.destroy({
        where: {
            userId: member.id,
            countWarn: countWarn
        }
    })
    return warn
}

export async function countWarn(sequelize: Sequelize, member: GuildMember) {
    const warnModel = require('../models/warn')(sequelize);
    const countWarn = await warnModel.count({ where: { userId: member.id }});
    return countWarn;
}


