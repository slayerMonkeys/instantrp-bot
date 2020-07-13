import { IHelp } from "../../utils/interface";

module.exports.run = (client, message, args) => {
    const kickMember =  message.guild.member(message.mentions.users.first());
    const reason = args.join(" ").slice(22);
    if (!reason) return message.channel.send(`${message.author}, Vous devez mettre une raison !`);
    const staffRole = message.guild.roles.cache.find(r => r.id === '716019522183757944');
    if (!staffRole) return message.reply('Error !')
    if (kickMember.roles.cache.has(staffRole.id)) return message.reply('Vous ne pouvez pas kick un membre du staff')

    /*const embed = {
      color: 2240347,
      timestamp: `${Date.now()}`,
      footer: {
        icon_url: `${message.guild.iconURL()}`,
        text: "kick LOG",
      },
      thumbnail: {
        url: `${message.author.avatarURL()}`,
      },
      author: {
        name: "kick LOG",
        icon_url: `${message.guild.iconURL()}`,
      },
      fields: [
        {
          name: "Personne qui a éxecuté la commande",
          value: `${message.author}`,
        },
        {
          name: "Personne kick",
          value: `${user}`,
        },
        {
          name: "Raisons",
          value: `${reason}`,
        },
      ],
    };*/
};


const help: IHelp = {
    name: "kick",
    aliases: ["kick"],
    category: "modération",
    permLevel: "Modo",
    ownercommand: false
};
module.exports.help = help;