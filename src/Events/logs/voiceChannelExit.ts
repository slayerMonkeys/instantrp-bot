import {GuildMember, MessageEmbed, TextChannel, VoiceChannel} from "discord.js";
import {getChannelLog} from "../../services/guildSettingsService";

module.exports = async (client: any, member: GuildMember, channel: VoiceChannel) => {
    const channelLogId = await getChannelLog(client.sequelize, member.guild, 'misc')
    const channelLogs: TextChannel = client.channels.cache.find((c) => c.id === channelLogId)
    const embed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setDescription(`${member}** a quitté le salon vocal: **${channel.name}`)
        .setFooter(`(ID: ${member.id})`)
        .setTimestamp(new Date())
        .setColor(4437377)
    channelLogs.send(embed)
}
