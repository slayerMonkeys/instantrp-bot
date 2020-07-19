import { Client, Message, GuildChannel } from "discord.js";
import { IHelp } from "../../utils/interface";
import { setLogsChannel } from "../../services/guildSettingsService";

module.exports.run = async (client: any, message: Message, args: string[]) => {
    const channel: GuildChannel = message.mentions.channels.first() || message.guild.channels.cache.find((c: GuildChannel) => c.id === args[1]);
    if(!channel) return message.reply('channel invalid !');
    const types: string[] = ['']
    const cb = await setLogsChannel(client.sequelize, message.guild, args[0], channel.id)
};

const help: IHelp = {
    name: "setchannellogs",
    aliases: ["setchannellogs"],
    category: "dev",
    permLevel: "owner",
    ownercommand: true
  };
module.exports.help = help;