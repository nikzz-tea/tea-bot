import client from '../api/twitch';
import { Commands } from '../database/models';
import CommandObject from '../models/commandObject';
import CommandProps from '../models/commandProps';

export default {
  modOnly: true,
  callback: async ({ channel, userstate, args }: CommandProps) => {
    if (args.length < 2) return;
    const name = args[0];
    const content = args.slice(1).join(' ');
    await Commands.upsert({
      name,
      content,
    });
    await client.say(channel, `Command "${name}" has been added`);
  },
} as CommandObject;
