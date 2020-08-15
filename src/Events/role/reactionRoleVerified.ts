import {getModeWhitelist} from "../../services/guildSettingsService";

module.exports = async (client: any, event) => {

    const {d: data} = event;
    const user = client.users.cache.get(data.user_id);
    const channel = client.channels.cache.get(data.channel_id);

    const message = await channel.messages.fetch(data.message_id);
    const member = message.guild.members.cache.get(user.id);

    let embedFooterText;
    if (message.embeds[0]) embedFooterText = message.embeds[0].footer.text;
    if ((message.author.id === client.user.id) && embedFooterText === 'Règlement du discord') {
        if (message.embeds.length >= 1) {
            if (member.id !== client.user.id) {
                const modeWhitelist = await getModeWhitelist(client.sequelize, member.guild);
                let guildRole
                if (modeWhitelist === true) {
                    guildRole = message.guild.roles.cache.find(r => r.id === '716019522183757940');
                } else {
                    guildRole = message.guild.roles.cache.find(r => r.id === '716019522183757941');
                }
                if (event.t === "MESSAGE_REACTION_ADD") member.roles.add(guildRole.id);
                else if (event.t === "MESSAGE_REACTION_REMOVE") member.roles.remove(guildRole.id);
            }
        }
    }
}
