import {Role, VoiceState} from "discord.js";

module.exports = async (client: any, oldState: VoiceState, newState: VoiceState) => {
    if (newState.channel && newState.channel.name === "besoin d'aide") {
        let role = newState.guild.roles.cache.find((r) => r.name === '@everyone');
        let membersRole = newState.guild.roles.cache.find((r: Role) => r.id === '716019522183757941')
        newState.guild.channels.create(`HELP┆${newState.member.displayName}`, {
            type: 'voice',
            permissionOverwrites: [
                {
                    id: role.id,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: membersRole.id,
                    allow: ["VIEW_CHANNEL", "CONNECT", "SPEAK", "STREAM", "USE_VAD"],
                    deny: ["DEAFEN_MEMBERS", "CREATE_INSTANT_INVITE", "MOVE_MEMBERS", "MUTE_MEMBERS", "PRIORITY_SPEAKER"]
                }
            ],
        }).then(c => {
            let category = newState.guild.channels.cache.find(c => c.id === "716019523169550364" && c.type == "category");
            c.setParent(category.id);
            newState.setChannel(c);
        });
    }
    if (oldState.channel !== null) {
        if (oldState.channel.name == `HELP┆${newState.member.displayName}`) {
            if (newState.channelID == undefined || newState.channel.name !== `HELP┆${newState.member.displayName}`) {
                let deleteVoiceChannel = newState.guild.channels.cache.find(c => c.name == `HELP┆${newState.member.displayName}`)
                deleteVoiceChannel.delete()
            }
        }
    }

}
