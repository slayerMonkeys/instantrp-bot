import {Invite, MessageEmbed, TextChannel} from "discord.js";
import {getChannelLog} from "../../services/guildSettingsService";

module.exports = async (client: any, invite: Invite) => {
    if(invite.inviter === client.user) return
    const fetchGuildAuditLogs = await invite.guild.fetchAuditLogs({
        limit: 1,
        type: 'INVITE_DELETE'
    });
    const latestguildInviteDelete = fetchGuildAuditLogs.entries.first();
    const { executor } = latestguildInviteDelete
    const member = invite.guild.member(executor)
    const channelLogId = await getChannelLog(client.sequelize, invite.guild, 'misc')
    const channelLogs: TextChannel = client.channels.cache.find((c) => c.id === channelLogId)

    const embed = new MessageEmbed()
        .setAuthor(executor.tag, executor.displayAvatarURL())
        .setDescription(`${member}** a supprimé le lien d'invitation: **${invite.url}`)
        .setFooter(`(ID: ${member.id})`)
        .setTimestamp(new Date())
        .setColor(16729871)
    channelLogs.send(embed)
}
