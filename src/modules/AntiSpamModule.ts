import {Channel, Guild, Message, MessageEmbed, TextChannel} from 'discord.js';
import {getChannelLog} from "../services/guildSettingsService";

class AntiSpam {
    public options: any;
    private cache: any;

    constructor(options) {

        this.options = {

            warnThreshold: options.warnThreshold || 3,
            banThreshold: options.banThreshold || 7,

            maxInterval: options.maxInterval || 2000,
            maxDuplicatesInterval: options.maxDuplicatesInterval || 2000,

            maxDuplicatesWarn: options.maxDuplicatesWarn || 7,
            maxDuplicatesBan: options.maxDuplicatesBan || 10,


            modLogsChannelName: options.modLogsChannelName || 'mod-logs',
            modLogsEnabled: options.modLogsEnabled || false,

            warnMessage: options.warnMessage || '{@user}, Please stop spamming.',
            banMessage: options.banMessage || '**{user_tag}** has been banned for spamming.',

            errorMessages: options.errorMessages || true,
            banErrorMessage: options.banErrorMessage || 'Could not ban **{user_tag}** because of improper permissions.',

            ignoredMembers: options.ignoredMembers || [],
            ignoredRoles: options.ignoredRoles || [],
            ignoredGuilds: options.ignoredGuilds || [],
            ignoredChannels: options.ignoredChannels || [],
            ignoredPermissions: options.ignoredPermissions || [],
            ignoreBots: options.ignoreBots || true,

            warnEnabled: options.warnEnabled || true,
            banEnabled: options.banEnabled || true,

            deleteMessagesAfterBanForPastDays: options.deleteMessagesAfterBanForPastDays || 1,
            verbose: options.verbose || false,
            debug: options.debug || false,
            removeMessages: options.removeMessages || true
        }

        this.cache = {
            messages: [],
            warnedUsers: [],
            bannedUsers: []
        }
    }

    format(string: string, message: Message): MessageEmbed | string {
        if (typeof string === 'string') {
            return string
                .replace(/{@user}/g, message.author.toString())
                .replace(/{user_tag}/g, message.author.tag)
                .replace(/{server_name}/g, message.guild.name)
        } else {
            const embed: any = new MessageEmbed(string)
            if (embed.description) embed.setDescription(this.format(embed.description, message))
            if (embed.title) embed.setTitle(this.format(embed.title, message))
            if (embed.footer && embed.footer.text) embed.footer.text = this.format(embed.footer.text, message)
            if (embed.author && embed.author.name) embed.author.name = this.format(embed.author.name, message)
            return embed
        }
    }

    async log(message: string, client): Promise<void> {
        const logChannel = await getChannelLog(client.sequelize, client.guilds.cache.find((guild: Guild) => guild.id === '716019522183757936'), 'misc');
        const modLogChannel = client.channels.cache.filter((channel: Channel) => channel.type === 'text').find((channel: TextChannel) => channel.id === logChannel)
        if (modLogChannel) {
            modLogChannel.send(message)
        }
    }

    clearSpamMessages(messages, client): void {
        messages.forEach((message) => {
            const channel = client.channels.cache.get(message.channelID)
            if (channel) {
                const msg = channel.messages.cache.get(message.messageID)
                if (msg && msg.deletable) msg.delete()
            }
        })
    }

    async banUser(message, member, spamMessages): Promise<boolean> {
        if (this.options.removeMessages && spamMessages) {
            this.clearSpamMessages(spamMessages, message.client)
        }
        this.cache.messages = this.cache.messages.filter((u) => u.authorID !== message.author.id)
        this.cache.bannedUsers.push(message.author.id)
        if (!member.bannable) {
            if (this.options.verbose) {
                console.log(`DAntiSpam (banUser#userNotBannable): ${message.author.tag} (ID: ${message.author.id}) could not be banned, insufficient permissions`)
            }
            if (this.options.errorMessages) {
                message.channel.send(this.format(this.options.banErrorMessage, message)).catch((e) => {
                    if (this.options.verbose) {
                        console.error(`DAntiSpam (banUser#sendMissingPermMessage): ${e.message}`)
                    }
                })
            }
            return false
        } else {
            await message.member.ban({
                reason: 'Spamming!',
                days: this.options.deleteMessagesAfterBanForPastDays
            })
            if (this.options.errorMessages) {
                message.channel.send(this.format(this.options.banErrorMessage, message)).catch((e) => {
                    if (this.options.verbose) {
                        console.error(`DAntiSpam (banUser#sendSuccessMessage): ${e.message}`)
                    }
                })
            }
            if (this.options.modLogsEnabled) {
                this.log(`Spam detected: ${message.author} got **banned**`, message.client)
            }
            return true
        }
    }

    warnUser(message, member, spamMessages) {
        if (this.options.removeMessages && spamMessages) {
            this.clearSpamMessages(spamMessages, message.client)
        }
        this.cache.warnedUsers.push(message.author.id)
        this.log(`Spam detected: ${message.author.tag} got **warned**`, message.client)
        if (this.options.warnMessage) {
            message.channel.send(this.format(this.options.warnMessage, message)).catch((e) => {
                if (this.options.verbose) {
                    console.error(`DAntiSpam (warnUser#sendSuccessMessage): ${e.message}`)
                }
            })
        }
        return true
    }

    async message(message) {
        const {options} = this

        if (
            !message.guild ||
            message.author.id === message.client.user.id ||
            (message.guild.ownerID === message.author.id && !options.debug) ||
            (options.ignoreBots && message.author.bot)
        ) {
            return false
        }

        const isMemberIgnored = typeof options.ignoredMembers === 'function' ? options.ignoredMembers(message.member) : options.ignoredMembers.includes(message.author.id)
        if (isMemberIgnored) return false

        const isChannelIgnored = typeof options.ignoredChannels === 'function' ? options.ignoredChannels(message.channel) : options.ignoredChannels.includes(message.channel.id)
        if (isChannelIgnored) return false

        const member = message.member || await message.guild.members.fetch(message.author)

        const memberHasIgnoredRoles = typeof options.ignoredRoles === 'function'
            ? options.ignoredRoles(member.roles.cache)
            : options.ignoredRoles.some((r) => member.roles.cache.has(r))
        if (memberHasIgnoredRoles) return false

        if (options.ignoredPermissions.some((permission) => member.hasPermission(permission))) return false

        const currentMessage = {
            messageID: message.id,
            guildID: message.guild.id,
            authorID: message.author.id,
            channelID: message.channel.id,
            content: message.content,
            sentTimestamp: message.createdTimestamp
        }
        this.cache.messages.push(currentMessage)

        const cachedMessages = this.cache.messages.filter((m) => m.authorID === message.author.id && m.guildID === message.guild.id)

        const duplicateMatches = cachedMessages.filter((m) => m.content === message.content && (m.sentTimestamp > (currentMessage.sentTimestamp - options.maxDuplicatesInterval)))

        const spamOtherDuplicates = []
        if (duplicateMatches.length > 0) {
            let rowBroken = false
            cachedMessages.sort((a, b) => b.sentTimestamp - a.sentTimestamp).forEach(element => {
                if (rowBroken) return
                if (element.content !== duplicateMatches[0].content) rowBroken = true
                else spamOtherDuplicates.push(element)
            })
        }

        const spamMatches = cachedMessages.filter((m) => m.sentTimestamp > (Date.now() - options.maxInterval))

        let sanctioned = false

        const userCanBeBanned = options.banEnabled && !this.cache.bannedUsers.includes(message.author.id) && !sanctioned
        if (userCanBeBanned && (spamMatches.length >= options.banThreshold)) {
            this.banUser(message, member, spamMatches)
            sanctioned = true
        } else if (userCanBeBanned && (duplicateMatches.length >= options.maxDuplicatesBan)) {
            this.banUser(message, member, [...duplicateMatches, ...spamOtherDuplicates])
            sanctioned = true
        }

        const userCanBeWarned = options.warnEnabled && !this.cache.warnedUsers.includes(message.author.id) && !sanctioned
        if (userCanBeWarned && (spamMatches.length >= options.warnThreshold)) {
            this.warnUser(message, member, spamMatches)
            sanctioned = true
        } else if (userCanBeWarned && (duplicateMatches.length >= options.maxDuplicatesWarn)) {
            this.warnUser(message, member, [...duplicateMatches, ...spamOtherDuplicates])
            sanctioned = true
        }

        return sanctioned
    }

    reset() {
        this.cache = {
            messages: [],
            warnedUsers: [],
            kickedUsers: [],
            mutedUsers: [],
            bannedUsers: []
        }
    }
}

export default AntiSpam;
