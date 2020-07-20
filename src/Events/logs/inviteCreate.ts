import { Invite, TextChannel, MessageEmbed } from "discord.js";
import { getChannelLog } from "../../services/guildSettingsService";

module.exports = async (client: any, invite: Invite) => {
    const member = invite.guild.member(invite.inviter)
    const staffRole = invite.guild.roles.cache.find(r => r.id === '716019522183757944');
    if (!staffRole) return
    if (!member.roles.cache.has(staffRole.id)) return invite.delete('non autaurisé')
    const channelLogId = await getChannelLog(client.sequelize, invite.guild, 'misc')
    const channelLogs: TextChannel = client.channels.cache.find((c) => c.id === channelLogId)

    const embed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setDescription(`${member}** a créé un lien d'invitation: **${invite.url}`)
        .setFooter(`(ID: ${member.id})`)
        .setTimestamp(new Date())
        .setColor('RANDOM')
    channelLogs.send(embed)
}