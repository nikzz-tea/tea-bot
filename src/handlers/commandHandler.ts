import { Client } from 'tmi.js';
import getFiles from '../utils/getFiles';
import { prefix } from '../config.json';
import path from 'path';

export default (client: Client) => {
  const commands: { [key: string]: any } = {};
  const commandFiles = getFiles(path.join(__dirname, '..', 'commands'));

  for (const command of commandFiles) {
    let commandFile = require(command);
    if (commandFile.default) commandFile = commandFile.default;

    const split = command.replace(/\\/g, '/').split('/');
    const commandName = split[split.length - 1].replace('.ts', '').replace('.js', '');

    commands[commandName.toLowerCase()] = commandFile;

    if (commandFile.aliases && commandFile.aliases.length > 0) {
      for (const alias of commandFile.aliases) {
        commands[alias.toLowerCase()] = commandFile;
      }
    }
  }

  client.on('message', async (channel, userstate, message, self) => {
    if (self) return;
    if (!message.startsWith(prefix)) return;

    const args = message.slice(prefix.length).split(' ');
    const commandName = args.shift()!.toLowerCase();
    const command = commands[commandName];

    if (!command) return;
    if (command.modOnly && !(userstate.mod || userstate.badges?.broadcaster)) return;
    try {
      await command.callback({ channel, message, userstate, args });
    } catch (error) {
      console.error(error);
    }
  });
};
