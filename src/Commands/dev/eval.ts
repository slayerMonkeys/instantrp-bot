import { Client, Message } from "discord.js";
import { IHelp } from "../../utils/interface";

module.exports.run = (client: any, message: Message, args: string[], embed) => {
    client.emit('guildBanAdd', message.guild, message.author);
};

const help: IHelp = {
    name: "eval",
    aliases: ["eval"],
    category: "dev",
    permLevel: "owner",
    ownercommand: true
  };
module.exports.help = help;