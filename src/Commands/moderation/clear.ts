import { Message } from "discord.js";
import { IHelp } from "../../utils/interface";

module.exports.run = (client, message: Message, args) => {
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel
            .send(`J'ai suppprimé ***${args[0]} messages*** pour vous !`)
            .then(message => message.delete({ timeout: 5000 }));
    });
    client.emit('clearLogs', message, args[0])
  /*
            const embed = {
                "color": 16750848,
                "timestamp": Date(),
                "footer": {
                    "icon_url": `${this.client.user.avatarURL()}`,
                    "text": "Clear LOG"
                },
                "thumbnail": {
                    "url": `${message.guild.iconURL()}`
                },
                "author": {
                    "name": "Clear LOG",
                    "icon_url": `${this.client.user.avatarURL()}`
                },
                "fields": [{
                        "name": "Personne qui a éxecuté la commande",
                        "value": `${message.author}`
                    },
                    {
                        "name": "Nombre de message suprimé",
                        "value": `${args[0]}`
                    },
                    {
                        "name": "Channel où les messages ont été supprimés",
                        "value": `${message.channel.name}`
                    }
                ]
            };
  */
};

const help: IHelp = {
    name: "clear",
    aliases: ["clear"],
    category: "modération",
    permLevel: "Admin",
    ownercommand: false
  };
module.exports.help = help;