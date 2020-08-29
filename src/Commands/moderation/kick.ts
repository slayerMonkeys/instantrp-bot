import {IHelp} from "../../typescript/interface";

module.exports.run = (client, message, args) => {
    const kickMember =  message.guild.member(message.mentions.users.first());
    const reason = args.join(" ").slice(22);
    if (!reason) return message.channel.send(`${message.author}, Vous devez mettre une raison !`);
    const staffRole = message.guild.roles.cache.find(r => r.id === '716019522183757944');
    if (!staffRole) return message.reply('Error !');
    if (kickMember.roles.cache.has(staffRole.id)) return message.reply('Vous ne pouvez pas kick un membre du staff')
    kickMember.kick(reason)
    client.emit('guildMemberKick', message, kickMember, reason);
};


const help: IHelp = {
    name: "kick",
    description: 'Kick la personne mentionné',
    category: "modération",
    permLevel: "Modo",
    usages: ['kick <Mention> <Raison>']
};
module.exports.help = help;
