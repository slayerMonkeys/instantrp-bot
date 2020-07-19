import { Snowflake } from "discord.js";
import { Model, Optional } from 'sequelize';

export interface IHelp {
    name: string;
    aliases: string[];
    category: string;
    permLevel: string
    cooldown?: number;
    usage?: string;
    ownercommand: boolean;
}

interface IWarnAttributes {
    id: number;
    userId: Snowflake;
    reason: string;
    countWarn: number;
}

interface IWarnCreationAttributes extends Optional<IWarnAttributes, "id"> {}

export interface IWarnInstance extends Model<IWarnAttributes, IWarnCreationAttributes>, IWarnAttributes{
    id: number;
    userId: Snowflake;
    reason: string;
    countWarn: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
};

interface IGuildSettingsAttributes {
    id: number;
    guildId: Snowflake;
    owner: Snowflake;
    channelLogs_message: Snowflake;
    channelLogs_chan: Snowflake;
    channelLogs_misc: Snowflake;
}

interface IGuildSettingsCreationAttributes extends Optional<IGuildSettingsAttributes, "id"> {}

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