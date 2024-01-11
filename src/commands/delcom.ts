import client from '../api/twitch';
import { Commands } from '../database/models';
import CommandProps from '../models/commandProps';

export default {
  callback: async ({ channel, userstate, args }: CommandProps) => {
    // if (!userstate.mod) return;
    if (!args.length) return;
    const name = args[0];
    await Commands.destroy({
      where: {
        name,
      },
    });
    await client.say(channel, `Command "${name}" has been deleted`);
  },
};
