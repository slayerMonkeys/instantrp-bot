import {VoiceState} from "discord.js";

module.exports = async (client: any, oldState: VoiceState, newState: VoiceState) => {
    client.emit('guildCustomsCreate', oldState, newState);
    client.emit('guildHrpCreate', oldState, newState);
    client.emit('guildHelpCreate', oldState, newState);
    if(oldState.channel === null && newState.channel !== null) return client.emit('voiceChannelJoin', oldState.member, newState.channel)
    if(oldState.channel !== null && newState.channel === null) return client.emit('voiceChannelExit', oldState.member, oldState.channel)
    if(oldState.channel !== newState.channel) return client.emit('voiceChannelSwitch', oldState.member, newState.channel, oldState.channel)

}
