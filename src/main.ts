import {Client, Collection} from 'discord.js';
import config from './config/main.config';
import loadEvents from './Loader/event';
import loadCommands from './Loader/command';
import * as YAML from 'yamljs';
import * as path from 'path';
import sequelize from './config/sequelize.config';
import loadEmbeds from './Loader/embed';
import {IClient} from './typescript/interface';


const client: IClient = new Client();
client.setting = YAML.load(path.resolve(__dirname, 'config/setting.yml'));
client.logger = require(path.resolve(__dirname, 'utils/logger'));
client.sequelize = sequelize;
client.levelCache = {};
for (let i = 0; i < config.permLevels.length; i++) {
    const thisLevel = config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
}
["commands", "embeds"].forEach((x) => client[x] = new Collection());

// Twitch Module
require('./modules/twitchModule')(client);

loadEvents(client);
loadCommands(client);
loadEmbeds(client);
client.login(client.setting.token)
