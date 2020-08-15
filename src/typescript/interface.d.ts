import {
    Client,
    Collection,
    Guild,
    MessageEmbed,
    PermissionResolvable,
    Role,
    Snowflake,
    TextChannel,
    User
} from 'discord.js';
import {Model, Optional, Sequelize} from 'sequelize';

export interface IClient extends Client {
    setting?: ISetting;
    logger?: ILogs;
    sequelize?: Sequelize;
    levelCache?: object;
    commands?: Collection<string, any>;
    embeds?: Collection<string, any>;
}

interface ISetting {
    token: string;
    twitch_clientID: string;
    twitch_clientSecret: string;
}

export interface ILogs {
    (content: string, type?: string): void;
}

export interface IHelp {
    name: string;
    description: string;
    aliases?: string[];
    category: string;
    permLevel: string
    cooldown?: number;
    usages: string[];
}

interface IWarnAttributes {
    id: number;
    userId: Snowflake;
    reason: string;
    countWarn: number;
}

interface IWarnCreationAttributes extends Optional<IWarnAttributes, "id"> {
}

export interface IWarnInstance extends Model<IWarnAttributes, IWarnCreationAttributes>, IWarnAttributes {
    id: number;
    userId: Snowflake;
    reason: string;
    countWarn: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

interface IGuildSettingsAttributes {
    id: number;
    guildId: Snowflake;
    owner: Snowflake;
    channelLogs_message: Snowflake;
    channelLogs_chan: Snowflake;
    channelLogs_misc: Snowflake;
}

interface IGuildSettingsCreationAttributes extends Optional<IGuildSettingsAttributes, "id"> {
}

export interface IGuildSettingsInstance extends Model<IGuildSettingsAttributes, IGuildSettingsCreationAttributes>, IGuildSettingsAttributes {
    id: number;
    guildId: Snowflake;
    owner: Snowflake;
    channelLogs_message: Snowflake;
    channelLogs_chan: Snowflake;
    channelLogs_misc: Snowflake;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

interface ITwitchAttributes {
    id: number;
    discordID: Snowflake;
    twitchUserID: string;
    announced: boolean;
    started_at: Date;
}

interface ITwitchCreationAttributes extends Optional<ITwitchAttributes, "id"> {
}

export interface ITwitchInstance extends Model<ITwitchCreationAttributes, ITwitchCreationAttributes> {
    id: number;
    discordID: Snowflake;
    twitchUserID: string;
    announced: boolean;
    started_at: Date;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

export interface IConfigAntiSpam {
    warnThreshold?: number;
    banThreshold?: number;
    maxInterval?: number;
    warnMessage?: string | MessageEmbed;
    banMessage?: string | MessageEmbed;
    maxDuplicatesWarning?: number;
    maxDuplicatesBan?: number;
    deleteMessagesAfterBanForPastDays?: number;
    exemptPermissions?: PermissionResolvable[];
    ignoreBots?: boolean;
    verbose?: boolean;
    debug?: boolean;
    ignoredUsers?: Snowflake[] | ((user: User) => boolean);
    ignoredRoles?: (Snowflake | string)[] | ((role: Role) => boolean);
    ignoredGuilds?: Snowflake[] | ((guild: Guild) => boolean);
    ignoredChannels?: Snowflake[] | ((channel: TextChannel) => boolean);
    warnEnabled?: boolean;
    banEnabled?: boolean;
}

/*export interface IcurrentMessage {
    messageID: string,
    guildID: string,
    authorID: string,
    channelID: string,
    content: string,
    sentTimestamp: number
}*/
