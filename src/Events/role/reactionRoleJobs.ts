import config from '../../config/main.config';

module.exports = async (client: any, event) => {
    console.log(true)
    const {d: data} = event;
    const user = client.users.cache.get(data.user_id);
    const channel = client.channels.cache.get(data.channel_id);

    const message = await channel.messages.fetch(data.message_id);
    const member = message.guild.members.cache.get(user.id);

    if ((message.author.id === client.user.id) && (message.content !== config.initialMessage)) {

        const re = `\\*\\*"(.+)?(?="\\*\\*)`;
        if (message.content.match(re) === null) return;
        const role = message.content.match(re)[1];

        if (!role) return
        if (member.id !== client.user.id) {
            const guildRole = message.guild.roles.cache.find(r => r.name === role);
            if (!guildRole) return client.logger.error("Role introuvable ou inexistant");
            if (event.t === "MESSAGE_REACTION_ADD") {
                member.roles.add(guildRole);
                message.channel.send('Bavo ! Vous pouvez maintenant poster votre candidature dans le bon salon').then(m => m.delete({timeout: 3000}));
            } else if (event.t === "MESSAGE_REACTION_REMOVE") {
                member.roles.remove(guildRole);
            }
        }
    }
}
