import { MessageEmbed, TextChannel, Guild, User } from "discord.js"
import { getChannelLog } from "../../services/guildSettingsService"

module.exports = async (client: any, guild: Guild, user: User) => {
    const channelLogId = await getChannelLog(client.sequelize, guild, 'misc')
    const channel: TextChannel = client.channels.cache.find((c) => c.id === channelLogId)
    const fetchGuildAuditLogs = await guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_BAN_REMOVE'
    });
    const latestBanRemove = fetchGuildAuditLogs.entries.first();
    const { executor } = latestBanRemove
    const embed = new MessageEmbed()
    .setAuthor('Unban LOG', guild.iconURL())
    .setFooter(`Unban LOG`)
    .setTimestamp(new Date())
    .setColor(53581)
    .setThumbnail(user.displayAvatarURL())
    .addFields([{
        name: "Modérateur",
        value: `${executor}`,
    },
    {
        name: "Personne unban",
        value: `${user}`,
    }])
    channel.send(embed)
}