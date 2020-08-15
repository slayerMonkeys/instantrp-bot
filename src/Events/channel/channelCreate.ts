import {GuildChannel, MessageEmbed, TextChannel} from "discord.js";
import {getChannelLog} from "../../services/guildSettingsService";

module.exports = async (client: any, channel: GuildChannel) => {
    const channelLogId = await getChannelLog(client.sequelize, channel.guild, 'misc')
    const channelLogs: TextChannel = client.channels.cache.find((c) => c.id === channelLogId)
    const fetchGuildAuditLogs = await channel.guild.fetchAuditLogs({
        limit: 1,
        type: 'CHANNEL_CREATE'
    });
    const latestChannelCreate = fetchGuildAuditLogs.entries.first();
    const { executor } = latestChannelCreate
    if (executor.bot) return
    const embed = new MessageEmbed()
        .setAuthor(executor.username, executor.displayAvatarURL())
        .setDescription(`**Salon créé: ${channel.name}**`)
        .setFooter(`(ID: ${channel.id})`)
        .setTimestamp(new Date())
        .setColor(4437377)
    channelLogs.send(embed)
}
