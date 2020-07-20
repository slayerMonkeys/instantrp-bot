import { GuildMember } from "discord.js"

module.exports = (client: any, member: GuildMember) => {
    client.emit('memberExit', member)
}