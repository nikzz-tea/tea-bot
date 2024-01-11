import client from '../api/twitch';
import { Commands } from '../database/models';
import CommandProps from '../models/commandProps';

export default {
  callback: async ({ channel, userstate, args }: CommandProps) => {
    // if (!userstate.mod) return;
    if (args.length < 2) return;
    const name = args[0];
    const content = args.slice(1).join();
    await Commands.upsert({
      name,
      content,
    });
    await client.say(channel, `Command "${name}" has been added`);
  },
};
