import {Message} from "discord.js";
import {IHelp} from "../../typescript/interface";

module.exports.run = (client, message: Message, args) => {
    message.delete()
    message.channel.bulkDelete(args[0]).then((messages) => {
        message.channel
            .send(`J'ai suppprimé ***${messages.size} messages*** pour vous !`)
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
    description: 'Supprime le nombre de message mis en argument',
    aliases: ["clr"],
    category: "modération",
    permLevel: "Modo",
    usages: ['clear <Nombre de message>']
};
module.exports.help = help;
