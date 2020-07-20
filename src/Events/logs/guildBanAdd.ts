import { MessageEmbed, TextChannel, Guild, User } from "discord.js"
import { getChannelLog } from "../../services/guildSettingsService"

module.exports = async (client: any, guild: Guild, user: User) => {
    const channelLogId = await getChannelLog(client.sequelize, guild, 'misc')
    const channel: TextChannel = client.channels.cache.find((c) => c.id === channelLogId)
    const fetchGuildAuditLogs = await guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_BAN_ADD'
    });
    const latestBanAdd = fetchGuildAuditLogs.entries.first();
    const { executor, reason } = latestBanAdd
    const embed = new MessageEmbed()
    .setAuthor('Ban LOG', guild.iconURL())
    .setFooter(`Ban LOG`)
    .setTimestamp(new Date())
    .setColor(53581)
    .setThumbnail(user.displayAvatarURL())
    .addFields([{
        name: "Modérateur",
        value: `${executor}`,
    },
    {
        name: "Personne ban",
        value: `${user}`,
    },{
        name: "Raison",
        value: reason
    }])
    channel.send(embed)
}