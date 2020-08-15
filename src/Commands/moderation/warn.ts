import {IHelp} from "../../typescript/interface";
import {countWarn, createWarn, getWarnsByUser, removeWarn} from "../../services/warnService";
import {GuildMember, Message, MessageEmbed} from "discord.js";
import * as moment from 'moment'

module.exports.run = async (client, message: Message, args: string[], embed) => {
  const warnMember: GuildMember = message.guild.member(message.mentions.users.first());
  if (args[0] === 'list') {
    const warns = await getWarnsByUser(client.sequelize, warnMember);
    if (warns.length < 1) return message.reply('Vous n\'avez aucun warn')
    const embed = new MessageEmbed()
      .setAuthor('Liste warn', warnMember.user.displayAvatarURL())
      .setThumbnail(warnMember.user.displayAvatarURL())
      .setColor('RANDOM')
      .setFooter(`Liste warn (user:${warnMember.id})`, warnMember.user.displayAvatarURL())
      .setTimestamp(new Date())
    for (let i = 0; i < warns.length; i++) {
      const warn = warns[i];
      embed.addField(`Warn: ${i+1}`, `Raison: ${warn.reason}\nDate du warn: ${moment(warn.createdAt).format('DD/MM/YYYY')}`)
    }
    message.channel.send(embed)
  } else if (args[0] === 'remove') {
    const warns: any[] = await getWarnsByUser(client.sequelize, warnMember);
    if (!warns) return message.reply('Cet utilisateur n\'a pas de warn à supprimer');
    const warnsize = await countWarn(client.sequelize, warnMember);
    if(warnsize < 0 || warnsize < args[2]) return message.reply('Warn invalid !');
    const cb = await removeWarn(client.sequelize, warnMember, Number(args[2]));
      if (cb) {
          client.emit('warnRemove', message, warnMember, cb, args[2])
          return message.reply(`Vous avez supprimé le warn ${args[2]} de ${warnMember}`);
      } else return message.reply('Error !');
  } else {
    const reason = args.slice(1).join(' ');
    if (!reason) return message.reply('Vous devez mettre une raison !');
    const staffRole = message.guild.roles.cache.find(r => r.id === '716019522183757944');
      if (!staffRole) return message.reply('Error !')
      if (warnMember.roles.cache.has(staffRole.id)) return message.reply('Vous ne pouvez pas warn un membre du staff')
    const cb = await createWarn(client.sequelize, warnMember, reason);
    cb.valid ? message.channel.send(`Vous avez mis un warn à ${warnMember.user.username}`) : message.channel.send('Error !');
    client.emit("warnAdd", message, warnMember, reason);
    const warnsize = await countWarn(client.sequelize, warnMember);
    if (cb.valid === true && warnsize >= 4) return warnMember.ban({
      days: 7,
      reason: reason
    })
  }
};


const help: IHelp = {
    name: "warn",
    description: 'Ajoute/Supprime un warn a un utilisateur ou donne la liste des warn de l\'utilisateur',
    aliases: ["warn"],
    category: "modération",
    permLevel: "Modo",
    usages: ['warn <Mention> <Raison>', 'warn <Mention> <IDwarn>', 'warn list <Mention>']
};
module.exports.help = help;
