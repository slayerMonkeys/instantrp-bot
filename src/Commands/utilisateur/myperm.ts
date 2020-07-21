import { IHelp } from "../../utils/interface";
import { Message } from "discord.js";
import config from '../../config/main.config';

module.exports.run = async (client: any, message: Message, args: string[], embed, level: number) => {
    const perm = config.permLevels.find((l) => l.level === level);
    message.reply(`Niveau de permission: ${level} - ${perm.name}.`);
}

let help: IHelp = {
    name: 'myperm',
    aliases: ['myperm'],
    category: 'misc',
    permLevel: "Utilisateur",
    ownercommand: false
}
module.exports.help = help;