import {IClient} from "../typescript/interface";
import {getAllStreamer, updateStreamer} from "../services/twitchService";
import {getGame, getStream, getUser} from "../utils/TwitchAuth";
import {MessageEmbed, TextChannel} from "discord.js";
import * as moment from 'moment';

module.exports = async (client: IClient) => {
    const clientId = client.setting.twitch_clientID;
    if (!clientId)
        throw new TypeError("One of the required enviroment variables weren't set");
    setInterval(await check, 30000); // 5 min
    await check();

    async function check() {
        const streamers = await getAllStreamer(client.sequelize);
        if (streamers.length < 1) return console.log('aucun streamer')
        streamers.forEach(async (streamer) => {
            const stream = await getStream(client, streamer.twitchUserID);
            const twitchUser = await getUser(client, streamer.twitchUserID);
            if (!stream) return await updateStreamer(client.sequelize, streamer, false);
            const twitchGame = await getGame(client, stream.game_id);
            const now = new Date();
            const started = new Date(streamer.started_at)
            if (streamer.announced === false || moment.duration(7200000) > moment.duration(now.getTime() - started.getTime())) {
                //@ts-ignore
                const chan: TextChannel = client.channels.cache.find(ch => ch.id === '716019523874193520' && ch.type === 'text')
                const embed = new MessageEmbed()
                    .setAuthor(twitchUser.display_name, twitchUser.profile_image_url)
                    .setThumbnail(twitchUser.profile_image_url)
                    .setTitle(stream.title)
                    .setURL(`https://www.twitch.tv/${twitchUser.login}`)
                    .addField('Game', twitchGame.name, true)
                    .addField('Viewers', `${stream.viewer_count}`, true)
                    .setColor(9521151)
                    .setImage(stream.thumbnail_url.replace('{width}', '1920').replace('{height}', '1080'))
                chan.send(embed)
                await updateStreamer(client.sequelize, streamer, true, started)
            }
        })
    }
}

