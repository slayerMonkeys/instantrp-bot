import { getChannelLog } from "../../services/guildSettingsService"
import { TextChannel, MessageEmbed, Message, GuildMember } from "discord.js"

module.exports = async (client: any, member: GuildMember, oldNickname: string, newNickname: string) => {
    const channelLogId = await getChannelLog(client.sequelize, member.guild, 'misc')
    const channel: TextChannel = client.channels.cache.find((c) => c.id === channelLogId)
    const embed = await new MessageEmbed()
    .setAuthor(member.user.tag, member.user.displayAvatarURL())
    .setDescription(`${member}** a changé son surnom**`)
    .addField('Avant', (oldNickname === null)? member.user.username:oldNickname)
    .addField('Après', (newNickname === null)? member.user.username:newNickname)
    .setColor(2059775)
    .setFooter(`(ID: ${member.id})`)
    .setTimestamp(new Date())
    channel.send(embed)
}