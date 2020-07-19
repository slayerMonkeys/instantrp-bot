import { Client, Message } from "discord.js";
import { IHelp } from "../../utils/interface";

module.exports.run = (client: any, message: Message, args: string[], embed) => {
    client.emit('warnLogs', message, message.member, 'test');
};

const help: IHelp = {
    name: "eval",
    aliases: ["eval"],
    category: "dev",
    permLevel: "owner",
    ownercommand: true
  };
module.exports.help = help;