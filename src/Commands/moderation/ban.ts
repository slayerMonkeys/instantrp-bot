import { Client, Message } from "discord.js";
import { IHelp } from "../../utils/interface";

module.exports.run = (client: Client, message: Message, args: string[]) => {
  message.delete();
  const bannedMember = message.guild.member(message.mentions.users.first());

  if (!bannedMember) return message.channel.send("L'utilisateur n'existe pas !");
  const staffRole = message.guild.roles.cache.find(r => r.id === '716019522183757944');
  if (!staffRole) return message.reply('Error !')
  if (bannedMember.roles.cache.has(staffRole.id)) return message.reply('Vous ne pouvez pas bannir un membre du staff')



  const banReason = args.join(" ").slice(22);
  if (!banReason) return message.channel.send(`${message.author}, Vous devez mettre une raison !`);

  /*
  const embed = {
    color: 2240347,
    timestamp: `${Date.now()}`,
    footer: {
      icon_url: `${message.guild.iconURL()}`,
      text: "Ban LOG",
    },
    thumbnail: {
      url: `${message.author.avatarURL()}`,
    },
    author: {
      name: "Ban LOG",
      icon_url: `${message.guild.iconURL()}`,
    },
    fields: [
      {
        name: "Personne qui a éxecuté la commande",
        value: `${message.author}`,
      },
      {
        name: "Personne Bannie",
        value: `${bannedMember}`,
      },
      {
        name: "Raisons",
        value: `${banReason}`,
      },
    ],
  };
  */
  bannedMember.ban({ reason: `${banReason}` });
};

const help: IHelp = {
    name: "ban",
    aliases: ["ban"],
    category: "modération",
    permLevel: "Admin",
    ownercommand: false
  };
module.exports.help = help;