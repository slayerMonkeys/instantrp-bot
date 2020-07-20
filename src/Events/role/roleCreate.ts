import { Role, TextChannel, MessageEmbed, GuildAuditLogs } from "discord.js";
import { getChannelLog } from "../../services/guildSettingsService";

module.exports = async (client: any, role: Role) => {
    const channelLogId = await getChannelLog(client.sequelize, role.guild, 'misc')
    const channel: TextChannel = client.channels.cache.find((c) => c.id === channelLogId)
    const fetchGuildAuditLogs: GuildAuditLogs = await role.guild.fetchAuditLogs({
        limit: 1,
        type: 'ROLE_CREATE'
    });
    const latestMessageDeleteBulk = fetchGuildAuditLogs.entries.first();
    const { executor } = latestMessageDeleteBulk
    const embed = new MessageEmbed()
        .setAuthor(executor.username, executor.displayAvatarURL())
        .setDescription(`**Nouveau role créé: ${role.name}**`)
        .setFooter(`(ID: ${role.id})`)
        .setTimestamp(new Date())
        .setColor('RANDOM')
    channel.send(embed)
}
