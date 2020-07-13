import { readdirSync } from 'fs';
import * as path from 'path';

const loadCommands = (client: any, dir: string = "../Commands") => {
    readdirSync(path.resolve(__dirname, dir)).forEach((dirs) => {
        const commands = readdirSync(path.resolve(__dirname, `../Commands/${dirs}/`)).filter((files) => files.endsWith(".js"));
        for (const file of commands) {
            const getFileName: any = require(`../Commands/${dirs}/${file}`);
            client.commands.set(getFileName.help.name, getFileName);
            client.logger.log(`Commande chargée: ${getFileName.help.name}`)
        }
    })
}

export default loadCommands;