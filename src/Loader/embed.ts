import { readdir } from 'fs';
import * as path from 'path';

const loadEmbeds = (client: any) => {
    readdir(path.resolve(__dirname, "../embeds"), (err, files) => {
        if (err) console.log(err);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            const props = require(path.resolve(__dirname, `../embeds/${file}`));
            const commandName = file.split(".")[0];
            client.logger.log(`Embeds chargés: ${props.name}`)
            client.embeds.set(commandName, props);
            
        });
    });
}

export default loadEmbeds;