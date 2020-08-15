import {GuildChannel, Message, VoiceChannel, TextChannel} from "discord.js";
import { IHelp } from "../../typescript/interface";
import {getModeWhitelist, updateModeWhitelist} from "../../services/guildSettingsService";

module.exports.run = async (client: any, message: Message, args: string[]) => {
    const currentMode = await getModeWhitelist(client.sequelize, message.guild);
    if(currentMode === undefined || null) return message.reply('Error !');
    if(currentMode === true && currentMode == args[0]) return message.reply('Le serveur est déjà en whitelist !');
    if(currentMode === false && currentMode == args[0]) return message.reply('Le serveur est déjà en FreeAcess !');
    if(args[0] === 'true') {
        const verifChannel = message.guild.channels.cache.find(c => c.name === 'générale-sans-papier');
        if(verifChannel) return message.channel.send('Error !');
        const airportCat: GuildChannel = message.guild.channels.cache.find(cat => cat.id === '716019522896658531' && cat.type === 'category');
        const everyoneRole = message.guild.roles.cache.find(role => role.id === '716019522183757936');
        const verifiedRole = message.guild.roles.cache.find(role => role.id === '716019522183757940');
        const staffRole = message.guild.roles.cache.find(role => role.id === '716019522183757944');
        if(!verifiedRole) return message.channel.send('Error !');
        message.guild.channels.create('générale-sans-papier', { type: 'text', parent: airportCat }).then((chan: TextChannel) => {
            chan.overwritePermissions([
                {
                    id: everyoneRole,
                    deny: ['CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS', 'SEND_TTS_MESSAGES', "ATTACH_FILES", "MANAGE_MESSAGES", "MENTION_EVERYONE", 'SEND_TTS_MESSAGES', "EMBED_LINKS", 'ADD_REACTIONS', "ADD_REACTIONS", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "VIEW_CHANNEL", "MANAGE_WEBHOOKS"]
                },
                {
                    id: verifiedRole,
                    allow: ['ADD_REACTIONS', "ADD_REACTIONS", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "VIEW_CHANNEL"],
                    deny: ['CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS', 'SEND_TTS_MESSAGES', "ATTACH_FILES", "MANAGE_MESSAGES", "MENTION_EVERYONE", 'SEND_TTS_MESSAGES', "EMBED_LINKS", "MANAGE_WEBHOOKS"]
                },
                {
                    id: staffRole,
                    allow: ['ADD_REACTIONS', "ADD_REACTIONS", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "MANAGE_MESSAGES"],
                    deny: ['CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS', 'SEND_TTS_MESSAGES', "ATTACH_FILES",  "MENTION_EVERYONE", 'SEND_TTS_MESSAGES', "MANAGE_WEBHOOKS"]
                }
            ]);
        });
        message.guild.channels.create('Salle d\'attente', { type: 'voice', parent: airportCat }).then((chan: VoiceChannel) => {
            chan.overwritePermissions([
                {
                    id: everyoneRole,
                    deny: ['CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS', "VIEW_CHANNEL", "CONNECT", "DEAFEN_MEMBERS", "PRIORITY_SPEAKER", "SPEAK", "STREAM", "USE_VAD", "MOVE_MEMBERS", "MUTE_MEMBERS"]
                },
                {
                    id: verifiedRole,
                    allow: ["VIEW_CHANNEL", "CONNECT", "SPEAK", "USE_VAD"],
                    deny: ['CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS', "DEAFEN_MEMBERS", "PRIORITY_SPEAKER", "MOVE_MEMBERS", "MUTE_MEMBERS", "STREAM"]
                },
                {
                    id: staffRole,
                    allow: ["VIEW_CHANNEL", "CONNECT", "SPEAK", "USE_VAD", "DEAFEN_MEMBERS", "PRIORITY_SPEAKER", "MOVE_MEMBERS", "MUTE_MEMBERS"],
                    deny: ['CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS']
                }
            ]);
        });
        message.guild.channels.create('Créateur de douanes', { type: 'voice', parent: airportCat }).then((chan: VoiceChannel) => {
            chan.overwritePermissions([
                {
                    id: everyoneRole,
                    deny: ['CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS', "VIEW_CHANNEL", "CONNECT", "DEAFEN_MEMBERS", "PRIORITY_SPEAKER", "SPEAK", "STREAM", "USE_VAD", "MOVE_MEMBERS", "MUTE_MEMBERS"]
                },
                {
                    id: verifiedRole,
                    allow: ["CONNECT", "SPEAK", "USE_VAD"],
                    deny: ['CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS', "DEAFEN_MEMBERS", "PRIORITY_SPEAKER", "MOVE_MEMBERS", "MUTE_MEMBERS", "STREAM", "VIEW_CHANNEL"]
                },
                {
                    id: staffRole,
                    allow: ["VIEW_CHANNEL", "CONNECT", "SPEAK", "USE_VAD", "DEAFEN_MEMBERS", "PRIORITY_SPEAKER", "MOVE_MEMBERS", "MUTE_MEMBERS"],
                    deny: ['CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS']
                }
            ]);
        });
        updateModeWhitelist(client.sequelize, message.guild, true);
        const isWhitelistChannel: GuildChannel = message.guild.channels.cache.find(c => c.id === '732190719267176479');
        isWhitelistChannel.setName('whitelist-true');
        client.emit('switchModeWhitelist', message, true);
    } else if(args[0] === 'false') {
        const generalSPChannel = message.guild.channels.cache.find(c => c.name === 'générale-sans-papier');
        const waitingRoomChannel = message.guild.channels.cache.find(c => c.name === 'Salle d\'attente');
        const customsCreatorChannel = message.guild.channels.cache.find(c => c.name === 'Créateur de douanes');
        if(!generalSPChannel || !waitingRoomChannel || !customsCreatorChannel) return message.reply('Error !');
        generalSPChannel.delete();
        waitingRoomChannel.delete();
        customsCreatorChannel.delete();
        updateModeWhitelist(client.sequelize, message.guild, false);
        const isWhitelistChannel: GuildChannel = message.guild.channels.cache.find(c => c.id === '732190719267176479');
        isWhitelistChannel.setName('whitelist-false');
        client.emit('switchModeWhitelist', message, false);
    } else {
        return message.reply('Votre argument est invalide');
    }
};

const help: IHelp = {
    name: "whitelist",
    description: 'Permet de mettre le serveur discord en freeAcess ou en Whitelist',
    category: "Système",
    permLevel: "Fonda",
    usages: ['whitelist <Boolean>']
  };
module.exports.help = help;