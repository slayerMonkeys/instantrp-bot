import { Client, Message, GuildChannel } from "discord.js";
import { IHelp } from "../../typescript/interface";
import { setLogsChannel } from "../../services/guildSettingsService";

module.exports.run = async (client: any, message: Message, args: string[]) => {
    const channel: GuildChannel = message.mentions.channels.first() || message.guild.channels.cache.find((c: GuildChannel) => c.id === args[1]);
    if(!channel) return message.reply('channel invalid !');
    const cb = await setLogsChannel(client.sequelize, message.guild, args[0], channel.id)
};

const help: IHelp = {
    name: "setchannellogs",
    description: 'Permet de définire les channels de logs',
    category: "Système",
    permLevel: "Fonda",
    usages: ['setchannellogs <typeofLog> <ChannelID>']
  };
module.exports.help = help;