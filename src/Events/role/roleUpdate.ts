import { Role, TextChannel, MessageEmbed, GuildAuditLogs } from "discord.js";
import { getChannelLog } from "../../services/guildSettingsService";

module.exports = async (client: any, oldRole: Role, newRole: Role) => {
    if(oldRole.position !== newRole.position) return
    const channelLogId = await getChannelLog(client.sequelize, oldRole.guild, 'misc')
    const channel: TextChannel = client.channels.cache.find((c) => c.id === channelLogId)
    const fetchGuildAuditLogs: GuildAuditLogs = await oldRole.guild.fetchAuditLogs({
        limit: 1,
        type: 'ROLE_DELETE'
    });
    const latestMessageDeleteBulk = fetchGuildAuditLogs.entries.first();
    const { executor } = latestMessageDeleteBulk
    const embed = new MessageEmbed()
        .setAuthor(executor.username, executor.displayAvatarURL())
        .setFooter(`(ID: ${oldRole.id})`)
        .setTimestamp(new Date())
        .setColor('RANDOM')
        .addFields([
            {
                name:'Nom',
                value: (oldRole.name !== newRole.name)? `\`${oldRole.name}\`-->\`${newRole.name}\``: newRole.name
            },
            {
                name:'Couleur',
                value: (oldRole.hexColor !== newRole.hexColor)? `\`${oldRole.hexColor}\`-->\`${newRole.hexColor}\``: newRole.hexColor
            },
            {
                name:'Visible',
                value: (oldRole.hoist !== newRole.hoist)? `\`${oldRole.hoist}\`-->\`${newRole.hoist}\``: newRole.hoist
            },
            {
                name:'Mentionable',
                value: (oldRole.mentionable !== newRole.mentionable)? `\`${oldRole.mentionable}\`-->\`${newRole.mentionable}\``: newRole.mentionable
            }
        ])
    channel.send(embed)
}