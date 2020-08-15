import { IHelp, IClient } from "../../typescript/interface";
import { Message, MessageEmbed, Collection } from "discord.js";

module.exports.run = async (client: IClient, message: Message, args: string[], embed, level: number) => {
    const myCommands: Collection<string, any> = client.commands.filter(cmd => client.levelCache[cmd.help.permLevel] <= level);
    let x = "";
    const categoryList = []
    myCommands.array().sort((a, b) => a.help.category - b.help.category).forEach(cmd => {
        const cat = cmd.help.category;
        if(x !== cat) {
            categoryList.push(cat)
            x = cat
        }
    });

    if(!args.length) {
        const embedIntro = new MessageEmbed()
        .setAuthor('Liste des categories', message.guild.iconURL())
        .setColor('RANDOM')
        .setDescription('Une liste des catégories.\nPour plus d\'information, \`!help <Commande>\` ou \`!help <Catégorie>\`')
        .setTimestamp(new Date())
        message.channel.send(embedIntro)

        const embedCat = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor('Help', client.user.displayAvatarURL())
            .setFooter('Help', client.user.displayAvatarURL())
            .setTimestamp(new Date())
            .addField('Voici les différentes catégories du bot', `**${categoryList.join('\n')}**`)
        message.channel.send(embedCat);
    } else if(categoryList.includes(args[0])) {
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription('Voici la liste des commande de cette catégories.\nPour plus d\'information, \`!help <Commande>\`')
            .setAuthor(args[0], client.user.displayAvatarURL())
            .setFooter(args[0], client.user.displayAvatarURL())
            .setTimestamp(new Date())
            const cmds = myCommands.filter(cmd => cmd.help.category === args[0]).array();
            cmds.forEach(cmd => {
                const aliases = (!cmd.help.aliases)? 'aucun':cmd.help.aliases.join(', ');
                embed.addField(`!${cmd.help.name}`, `Description: ${cmd.help.description}\nAliase(s): ${aliases}\nUtilisation(s): !${cmd.help.usages.join('\n')}`);
            })
            message.channel.send(embed);
    } else {
        const command = myCommands.find(cmd => cmd.help.name === args[0]);
        if(!command) return message.channel.send('Commande ou catégorie invalide !')
        const aliases = (!command.help.aliases)? 'aucun':command.help.aliases.join(', ');
        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(args[0], client.user.displayAvatarURL())
        .setFooter(args[0], client.user.displayAvatarURL())
        .setTimestamp(new Date())
        .addField(`!${command.help.name}`, `Description: ${command.help.description}\nAliase(s): ${aliases}\nUtilisation(s): !${command.help.usages.join('\n')}`);
        message.channel.send(embed);
    }

}

let help: IHelp = {
    name: 'help',
    description: 'Donne la liste des commandes du bot',
    aliases: ['h'],
    category: 'misc',
    permLevel: "Utilisateur",
    usages: ['help', 'help <Commande>', 'help <Catégorie>']
}
module.exports.help = help;