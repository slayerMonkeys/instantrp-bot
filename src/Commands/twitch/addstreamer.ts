import {Message} from "discord.js";
import {IClient, IHelp} from "../../typescript/interface";
import {getUser} from "../../utils/TwitchAuth";
import {addStreamer} from "../../services/twitchService";

module.exports.run = async (client: IClient, message: Message, args: string[]) => {
    const streamer = message.guild.member(message.mentions.users.first())
    if (!streamer) return message.channel.send('Vous devez mentionner le streamer a qui appartient la chaine !');
    if (!args[0]) return message.channel.send('Vous devez mettre le pseudos twitch de l\'utilisateur');
    const twitchUser: { id: string; login: string; type: string; broadcaster_type: string; description: string } = await getUser(client, args[0]);
    if (twitchUser === undefined) return message.channel.send('Utilisateur twitch invalid !');
    const check = await addStreamer(client.sequelize, streamer, twitchUser.login);
    (check) ?
        message.channel.send('Malheureusement le streameur n\'à pas été ajouter a la liste') : message.channel.send('Streameur ajouter à la liste')
};

const help: IHelp = {
    name: "addstreamer",
    description: 'Ajoute le streamer en argument pour les notifs',
    category: "Twitch",
    permLevel: "Fonda",
    usages: ['addstreamer <usernameTwitch> <MentionStreamer>']
};
module.exports.help = help;
