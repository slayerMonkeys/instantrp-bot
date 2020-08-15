import {GuildMember, MessageEmbed, TextChannel} from "discord.js";
import {getChannelLog} from "../../services/guildSettingsService";

module.exports = async (client: any, member: GuildMember, reason: string) => {
    const channelLogId = await getChannelLog(client.sequelize, member.guild, 'misc')
    const channelLogs: TextChannel = client.channels.cache.find((c) => c.id === channelLogId)
    const fetchGuildAuditLogs = await member.guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_KICK'
    });
    const latestguildMemberKick = fetchGuildAuditLogs.entries.first();
    const { executor } = latestguildMemberKick
    const embed = new MessageEmbed()
        .setAuthor(executor.username, executor.displayAvatarURL())
        .setDescription(`${member} a été kick par ${executor.tag}`)
        .setFooter(`(ID: ${member.id})`)
        .setTimestamp(new Date())
        .setColor(4437377)
    channelLogs.send(embed)
}
