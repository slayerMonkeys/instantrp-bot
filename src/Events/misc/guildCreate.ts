import { Client, Guild } from "discord.js";
import { createGuildSetting } from "../../services/guildSettingsService";

module.exports = async (client: any, guild: Guild) => {
    const cb = await createGuildSetting(client.sequelize, guild);
    console.log(cb)
}