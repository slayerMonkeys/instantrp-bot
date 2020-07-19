import { MessageEmbed, Client, Message, GuildMember } from "discord.js";

module.exports = {
    name: "warn",
    run: (client: Client, message: Message, member: GuildMember, reason: string) => {

      const embed = new MessageEmbed()
      .setColor(2240347)
      .setTimestamp(new Date())
      .setFooter(client.user.displayAvatarURL(), 'Warn LOG')
      .setThumbnail(member.user.displayAvatarURL())
      .setAuthor('Warn LOG', message.guild.iconURL())
      .addFields([
        {
          name: "Personne qui a éxecuté la commande",
          value: `${message.author}`,
        },
        {
          name: "Utilisateur Warn",
          value: `${member}`,
        },
        {
          name: "Raison",
          value: `${reason}`,
        },
      ])
      
      return { embed };
    }
}