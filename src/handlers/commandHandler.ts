import { Client } from 'tmi.js';
import getFiles from './getFiles';
import { prefix } from '../config.json';
import path from 'path';

export default (client: Client) => {
  const ext = '.ts';
  const commands: { [key: string]: any } = {};
  const commandFiles = getFiles(path.join(__dirname, '..', 'commands'), ext);

  for (const command of commandFiles) {
    let commandFile = require(command);
    if (commandFile.default) commandFile = commandFile.default;

    const split = command.replace(/\\/g, '/').split('/');
    const commandName = split[split.length - 1].replace(ext, '');

    commands[commandName.toLowerCase()] = commandFile;
  }

  client.on('message', (channel, userstate, message, self) => {
    if (self) return;
    if (!message.startsWith(prefix)) return;

    const args = message.slice(prefix.length).split(' ');
    const commandName = args.shift()!.toLowerCase();

    if (!commands[commandName]) return;
    try {
      commands[commandName].callback(message, ...args, userstate);
    } catch (error) {
      console.error(error);
    }
  });
};
