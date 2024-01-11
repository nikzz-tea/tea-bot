import client from '../api/twitch';
import { Commands } from '../database/models';
import CommandObject from '../models/commandObject';
import CommandProps from '../models/commandProps';

export default {
  modOnly: true,
  callback: async ({ channel, userstate, args }: CommandProps) => {
    if (!args.length) return;
    const name = args[0];
    await Commands.destroy({
      where: {
        name,
      },
    });
    await client.say(channel, `Command "${name}" has been deleted`);
  },
} as CommandObject;
