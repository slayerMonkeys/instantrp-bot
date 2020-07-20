import { GuildChannel, MessageEmbed, TextChannel } from "discord.js";
import { getChannelLog } from "../../services/guildSettingsService";

module.exports = async (client: any, channel: GuildChannel) => {
    const channelLogId = await getChannelLog(client.sequelize, channel.guild, 'misc')
    const channelLogs: TextChannel = client.channels.cache.find((c) => c.id === channelLogId)
    const fetchGuildAuditLogs = await channel.guild.fetchAuditLogs({
        limit: 1,
        type: 'CHANNEL_DELETE'
    });
    const latestChannelDelete = fetchGuildAuditLogs.entries.first();
    const { executor } = latestChannelDelete
    const embed = new MessageEmbed()
        .setAuthor(executor.username, executor.displayAvatarURL())
        .setDescription(`**Salon suprimmé: ${channel.name}**`)
        .setFooter(`(ID: ${channel.id})`)
        .setTimestamp(new Date())
        .setColor('RANDOM')
    channelLogs.send(embed)
}