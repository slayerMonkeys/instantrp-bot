import {Emoji, Message, MessageEmbed, Role} from "discord.js";
import {IHelp} from "../../typescript/interface";
import config from '../../config/main.config';

module.exports.run = async (client: any, message: Message, args: string[]) => {
    let msgs
    switch (args[0]) {
        case 'list':
            const nameReactionRole = ['reglement'];
            message.channel.send(`Voici la liste des messages avec réaction-role:\n${nameReactionRole.join('\n')}`);
            break
        case 'reglement':
            message.delete()
            const embed = new MessageEmbed()
                .setAuthor('Règlement du discord', message.guild.iconURL())
                .setColor("RED")
                .setFooter('Règlement du discord')
                .setDescription('** Merci de réagir après avoir pris connaissance des règles afin d\'accéder au Discord**')
                .addFields([
                    {
                        name: '1. Le respect et la courtoisie',
                        value: "Un comportement respectueux est demandé à chaque membre.\nIl n’est pas permis de manquer" +
                            "de respect, insulter ou dire n’importe quelle chose qui puisse porter à l’intégrité d’un" +
                            "autre membre. Les propos racistes, xénophobes, homophobes, ou tout autre propos à caractère" +
                            "haineux ou qui porte atteinte à quiconque est formellement interdit. Les trolls ne sont pas" +
                            "autorisés."
                    },
                    {
                        name: '2. Les images',
                        value: "Les images affichées ou envoyées, à caractère haineux, religieux, politiques, sexuels," +
                            "homophobes ou à n’importe quel caractère pouvant porter atteinte à quiconque ou être source" +
                            "de conflits, sont interdites."
                    },
                    {
                        name: '3. Le matériel audio',
                        value: "Veuillez disposer d’un matériel audio convenable. Les gènes envers les autres utilisateurs" +
                            "occasionnés par du matériel défectueux ou par une mauvaise configuration logicielle doivent être" +
                            "absolument évités.\n" +
                            "Les bruits incongrus, radios, ou autre non-souhaités ne sont pas acceptés."
                    },
                    {
                        name: '4. Le language',
                        value: "Ce serveur discord est francophone, veuillez écrire en français uniquement.\n" +
                            "Veillez à vous exprimer correctement en utilisant un langage et une écriture claire et compréhensible. Le langage SMS est prohibé."
                    },
                    {
                        name: '5. Les mentions',
                        value: "Les mentions (@pseudo) sont à utiliser avec modération. L’utilisation répétée et/ou inutile de cette commande est interdite."
                    },
                    {
                        name: '6. Les lien et les fichiers',
                        value: "Il est interdit de donner des liens emmenant vers des sites frauduleux ou de" +
                            "téléchargements illégaux. Il est aussi interdit de donner des liens donnant directement des" +
                            "applications illégales ou qui mènent vers des sites de torrents, cracks, virus.."
                    }
                ])
                .setTimestamp(new Date())
            message.channel.send(embed).then(async (msg: Message) => {
                await msg.react('✅');
            })
            break
        case 'jobs':
            message.channel.send(config.initialMessage);
            const jobsRoles: string[] = ['candid-cop', 'candid-ems', 'candid-meca'];
            const jobsReact: string[] = ['👮', '🚑', '🔧'];
            msgs = generateMessage(jobsRoles, jobsReact);
            for (const {role, message: msg, emoji} of msgs) {
                if (!message.guild.roles.cache.find((r: Role) => r.name === role)) return message.channel.send(`Le role \`${role}\` n'éxiste pas`);
                message.channel.send(msg).then(async (m: Message) => {
                    const customCheck: Emoji = message.guild.emojis.cache.find((e: Emoji) => e.name === emoji);
                    if (!customCheck) await m.react(emoji)
                    else await m.react(customCheck.id)
                })
            }
            message.delete();
            break
        case 'linkedin':
            message.channel.send(config.initialMessage);
            const linkedinRoles: string[] = ['linkedIn-cop', 'linkedIn-ems', 'linkedIn-meca'];
            const linkedinReact: string[] = ['👮', '🚑', '🔧'];
            msgs = generateMessage(linkedinRoles, linkedinReact);
            for (const {role, message: msg, emoji} of msgs) {
                if (!message.guild.roles.cache.find((r: Role) => r.name === role)) return message.channel.send(`Le role \`${role}\` n'éxiste pas`);
                message.channel.send(msg).then(async (m: Message) => {
                    const customCheck: Emoji = message.guild.emojis.cache.find((e: Emoji) => e.name === emoji);
                    if (!customCheck) await m.react(emoji);
                    else await m.react(customCheck.id);
                })
            }
            message.delete();
            break
    }

    function generateMessage(roles: string[], reactions: string[]) {
        return roles.map((r, e) => {
            return {
                role: r,
                message: `Réagissez ci-dessous pour obtenir le rôle **"${r}"**`,
                emoji: reactions[e]
            };
        });
    }
};

const help: IHelp = {
    name: "reactionrole",
    description: 'Envoie le message pour le systeme de réaction-role',
    category: "Système",
    permLevel: "Fonda",
    usages: ['reactiorole <name>', 'reactionrole list']
};
module.exports.help = help;
