import { getChannelLog } from "../../services/guildSettingsService"
import { TextChannel, MessageEmbed, Message } from "discord.js"

module.exports = async (client: any, oldMessage: Message, newMessage: Message) => {
    if(!newMessage) return
    const channelLogId = await getChannelLog(client.sequelize, oldMessage.guild, 'message')
    const channel: TextChannel = client.channels.cache.find((c) => c.id === channelLogId)
    const embed = await new MessageEmbed()
    .setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL())
    .setDescription(`**Message modifié dans le channel:**${newMessage.channel} [lien du message](${oldMessage.url})`)
    .addField('Avant', oldMessage.content)
    .addField('Après', newMessage.content)
    .setColor(2059775)
    .setFooter(`(ID: ${oldMessage.author.id})`)
    .setTimestamp(new Date())
    await channel.send(embed)
}