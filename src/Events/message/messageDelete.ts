import { getChannelLog } from "../../services/guildSettingsService"
import { TextChannel, MessageEmbed, Message } from "discord.js"

module.exports = async (client: any, message: Message) => {
    const channelLogId = await getChannelLog(client.sequelize, message.guild, 'message')
    const channel: TextChannel = client.channels.cache.find((c) => c.id === channelLogId)
    const fetchGuildAuditLogs = await message.guild.fetchAuditLogs({
        limit: 1,
        type: 'MESSAGE_DELETE'
    });
    const latestMessageDelete = fetchGuildAuditLogs.entries.first();
    let embed;
    if(latestMessageDelete) {
        const { executor } = latestMessageDelete
        if(executor.id === client.user.id) return
        embed = await new MessageEmbed()
        .setAuthor(executor.tag, executor.displayAvatarURL())
        .addField(`Message envoyé par ${message.author}, supprimé dans ${message.channel}`, message.content)
        .setColor(2059775)
        .setFooter(`(Autheur: ${message.author.id} | Message ID: ${message.id})`)
        .setTimestamp(new Date())
        channel.send(embed)
    } else {
        if(message.author.id === client.user.id) return
        embed = await new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setDescription(`Message envoyé par ${message.author}, supprimé dans ${message.channel}\n${message.content}`)
        .setColor(2059775)
        .setFooter(`(Autheur: ${message.author.id} | Message ID: ${message.id})`)
        .setTimestamp(new Date())
        channel.send(embed)
    }
    

}