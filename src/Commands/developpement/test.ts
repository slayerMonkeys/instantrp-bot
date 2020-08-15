import {Message} from "discord.js";
import {IHelp} from "../../typescript/interface";

module.exports.run = async (client: any, message: Message, args: string[], embed) => {
};

const help: IHelp = {
    name: "test",
    description: 'Commansde pour faire des test',
    category: "dev",
    permLevel: "OwnerBot",
    usages: ['test']
};
module.exports.help = help;
