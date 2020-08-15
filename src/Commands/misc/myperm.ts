import { IHelp } from "../../typescript/interface";
import { Message } from "discord.js";
import config from '../../config/main.config';

module.exports.run = async (client: any, message: Message, args: string[], embed, level: number) => {
    const perm = config.permLevels.find((l) => l.level === level);
    message.reply(`Niveau de permission: ${level} - ${perm.name}.`);
}

let help: IHelp = {
    name: 'myperm',
    description: 'Donne le niveau de permission de l\'utilisateur',
    category: 'misc',
    permLevel: "Utilisateur",
    usages: ['myperm']
}
module.exports.help = help;