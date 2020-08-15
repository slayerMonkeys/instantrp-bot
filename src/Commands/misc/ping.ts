import { IHelp } from "../../typescript/interface";

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
    description: 'Donne le ping du bot et de l\'api',
    aliases: ['pong'],
    category: 'misc',
    permLevel: "Utilisateur",
    usages: ['ping']
}
module.exports.help = help;