import { GuildMember } from "discord.js";

module.exports = async (client: any, oldMember: GuildMember, newMember: GuildMember) => {
    if(oldMember.roles.cache.size < newMember.roles.cache.size) return client.emit('guildMemberAddRole', newMember);
    if(oldMember.roles.cache.size > newMember.roles.cache.size) return client.emit('guildMemberRemoveRole', newMember);
    if(oldMember.nickname !== newMember.nickname) return client.emit('nicknameUpdate', newMember, oldMember.nickname, newMember.nickname)
}