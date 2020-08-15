import {Client, Message} from "discord.js";
import {IHelp} from "../../typescript/interface";

module.exports.run = (client: Client, message: Message, args: string[]) => {
    message.delete();
    const bannedMember = message.guild.member(message.mentions.users.first());

    if (!bannedMember) return message.channel.send("L'utilisateur n'existe pas !");
    const staffRole = message.guild.roles.cache.find(r => r.id === '716019522183757944');
    if (!staffRole) return message.reply('Error !');
    if (bannedMember.roles.cache.has(staffRole.id)) return message.reply('Vous ne pouvez pas bannir un membre du staff');
    const banReason = args.join(" ").slice(22);
    if (!banReason) return message.channel.send(`${message.author}, Vous devez mettre une raison !`);
    bannedMember.ban({reason: `${banReason}`});
};

const help: IHelp = {
    name: "ban",
    description: 'Permet de ban un utilisateur',
    category: "modération",
    permLevel: "Modo",
    usages: ['ban <Mention> <Raison>']
};
module.exports.help = help;
