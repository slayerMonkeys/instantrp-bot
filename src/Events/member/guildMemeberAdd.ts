import { GuildMember } from "discord.js"

module.exports = (client: any, member: GuildMember) => {
    client.emit('memberJoin', member)
}