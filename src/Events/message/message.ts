import  config  from '../../config/main.config';

module.exports = (client: any, message: any) => {


  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  const args = message.content.slice(config.prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();


  const command = client.commands.get(commandName) || client.commands.find((cmd: any) => cmd.help.aliases && cmd.help.aliases.includes(commandName));
  const embed = client.embeds.get(commandName)
  if (!command) return message.reply('Commande invalide !!!');

  function permlevel(message) {
    let permlvl = 0;

    const permOrder = config.permLevels
        .slice(0)
        .sort((p, c) => (p.level < c.level ? 1 : -1));

    while (permOrder.length) {
        const currentLevel = permOrder.shift();
        if (currentLevel.check(message)) {
            permlvl = currentLevel.level;
            break;
        }
    }
    return permlvl;
  }
  const level = permlevel(message);
  if(level < client.levelCache[command.help.permLevel]) {
    return message.channel.send(`Vous n'avez pas la permission pour utiliser cette commande.Votre niveau de permission est ${level}
    (${config.permLevels.find(l => l.level === level).name})
    Cette commande requirt le niveau de permission: ${
      client.levelCache[command.help.permLevel]
  } (${command.help.permLevel})`);
  }
  message.author.permLevel = level;
  client.logger.log(`${message.author.username} (${message.author.id} - ${config.permLevels.find(l => l.level === level).name}) lance la commande ${command.help.name}`);
  command.run(client, message, args, embed, level);
}