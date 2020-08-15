import {GuildMember, Message, MessageEmbed, TextChannel} from "discord.js"
import {getChannelLog} from "../../services/guildSettingsService"

module.exports = async (client: any, message: Message, member: GuildMember, warn: any, numero: number) => {
    const channelLogId = await getChannelLog(client.sequelize, message.guild, 'misc')
    const channel: TextChannel = client.channels.cache.find((c) => c.id === channelLogId)
    const embed = new MessageEmbed()
        .setColor(16729871)
    .setTimestamp(new Date())
    .setFooter('Warn LOG', client.user.displayAvatarURL())
    .setThumbnail(member.user.displayAvatarURL())
    .setAuthor('Warn LOG', message.guild.iconURL())
    .addFields([
      {
        name: "Modérateur",
        value: `${message.author}`,
      },
      {
        name: "Utilisateur qui avait le warn",
        value: `${member}`,
      },
      {
        name: "info du warn",
        value: `Raison: ${warn.rows.reason}\n Numéro: ${numero}`,
      },
    ])
    channel.send(embed)
}
