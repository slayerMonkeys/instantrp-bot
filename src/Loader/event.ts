import { readdirSync } from 'fs';
import * as path from 'path';

const loadEvents = (client: any, dir: string = "../Events") => {
    readdirSync(path.resolve(__dirname, dir)).forEach((dirs) => {
        const events = readdirSync(path.resolve(__dirname, `../Events/${dirs}/`)).filter((files) => files.endsWith(".js"));
        for (const event of events) {
            const evt = require(`../Events/${dirs}/${event}`);
            const evtName = event.split('.')[0];
            client.on(evtName, evt.bind(null, client));
            client.logger.log(`Evenement chargé: ${evtName}`);
        }
    })
}

export default loadEvents;