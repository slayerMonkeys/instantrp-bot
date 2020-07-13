import { IHelp } from "../../utils/interface";

module.exports.run = async (client, message) => {
    const msg = await message.channel.send("Ping!🏓");
    msg.edit(
        `Pong !🏓\n Latence bot: ${msg.createdTimestamp -
  message.createdTimestamp}ms.\n API: ${Math.round(
  client.ping
)}ms.`
    );
}

let help: IHelp = {
    name: 'ping',
    aliases: ['ping'],
    category: 'misc',
    permLevel: "Utilisateur",
    ownercommand: false
}
module.exports.help = help;