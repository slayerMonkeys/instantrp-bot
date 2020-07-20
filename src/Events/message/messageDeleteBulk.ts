import { getChannelLog } from "../../services/guildSettingsService"
import { TextChannel, MessageEmbed, Message, Collection, Snowflake, GuildAuditLogs } from "discord.js"

module.exports = async (client: any, messages: Collection<Snowflake, Message>) => {
    const message: Message = messages.first()
    const fetchGuildAuditLogs: GuildAuditLogs = await message.guild.fetchAuditLogs({
        limit: 1,
        type: 'MESSAGE_BULK_DELETE'
    });
    const latestMessageDeleteBulk = fetchGuildAuditLogs.entries.first();
    const { executor } = latestMessageDeleteBulk
    const channelLogId = await getChannelLog(client.sequelize, message.guild, 'message')
    const channel: TextChannel = client.channels.cache.find((c) => c.id === channelLogId)


    const embed = await new MessageEmbed()
        .setAuthor(executor.tag, executor.displayAvatarURL())
        .addField(`Plusieurs messages supprimés dans ${message.channel}`, message.content)
        .setColor(2059775)
        .setTimestamp(new Date())
    channel.send(embed)

}