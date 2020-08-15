import { Client, Message } from "discord.js";
import { IHelp } from "../../typescript/interface";

module.exports.run = (client: any, message: Message, args: string[], embed) => {
    client.emit('messageDelete', message.guild, message.author);
};

const help: IHelp = {
    name: "eval",
    description: 'Emmet un evenement',
    category: "dev",
    permLevel: "OwnerBot",
    usages: ['eval']
  };
module.exports.help = help;
