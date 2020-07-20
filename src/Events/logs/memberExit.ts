import { GuildMember, MessageEmbed, TextChannel } from "discord.js"
import { getChannelLog } from "../../services/guildSettingsService"

module.exports = async (client: any, member: GuildMember) => {
    const channelLogId = await getChannelLog(client.sequelize, member.guild, 'misc')
    const channel: TextChannel = client.channels.cache.find((c) => c.id === channelLogId)
    const embed = new MessageEmbed()
    .setAuthor('Un membre nous a quitté', member.user.displayAvatarURL())
    .setDescription(`${member}#${member.user.discriminator}`)
    .setFooter(`(ID: ${member.id})`)
    .setTimestamp(new Date())
    .setColor(53581)
    channel.send(embed)
}