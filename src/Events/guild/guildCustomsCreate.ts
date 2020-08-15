import {VoiceState} from "discord.js";

module.exports = async (client: any, oldState: VoiceState, newState: VoiceState) => {
    if (newState.channel && newState.channel.name === "Créateur de douanes") { // id du salon qui va crée des salons
        let role = newState.guild.roles.cache.find((r) => r.name === '@everyone')
        newState.guild.channels.create(`Douane┆${newState.member.displayName}`, {
            type: 'voice',
            permissionOverwrites: [
                {
                    id: role.id,
                    deny: ['VIEW_CHANNEL'],
                },
            ],
        }).then(c => {
            let category = newState.guild.channels.cache.find(c => c.name == "Aéroport" && c.type == "category"); //id de la category
            c.setParent(category.id);
            newState.setChannel(c);
        });
    }
    if (oldState.channel !== null) {
        if (oldState.channel.name == `Douane┆${newState.member.displayName}`) {
            if (newState.channelID == undefined || newState.channel.name !== `Douane┆${newState.member.displayName}`) {
                let deleteVoiceChannel = newState.guild.channels.cache.find(c => c.name == `Douane┆${newState.member.displayName}`)
                deleteVoiceChannel.delete()
            }
        }
    }

}
