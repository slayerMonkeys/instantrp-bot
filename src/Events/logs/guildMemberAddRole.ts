import { GuildChannel, MessageEmbed, TextChannel, GuildMember } from "discord.js";
import { getChannelLog } from "../../services/guildSettingsService";

module.exports = async (client: any, member: GuildMember) => {
    const channelLogId = await getChannelLog(client.sequelize, member.guild, 'misc')
    const channelLogs: TextChannel = client.channels.cache.find((c) => c.id === channelLogId)
    const fetchGuildAuditLogs = await member.guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_ROLE_UPDATE'
    });
    const latestguildMemberAddRole = fetchGuildAuditLogs.entries.first();
    const { executor, changes } = latestguildMemberAddRole
    const embed = new MessageEmbed()
        .setAuthor(executor.username, executor.displayAvatarURL())
        .setDescription(`${member} a reçu le rôle \`${changes[0].new[0].name}\``)
        .setFooter(`(ID: ${member.id})`)
        .setTimestamp(new Date())
        .setColor('RANDOM')
    channelLogs.send(embed)
}