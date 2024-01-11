import client from '../api/twitch';
import CommandProps from '../models/commandProps';
import fetchGosuData from '../utils/fetchGosuData';

export default {
  callback: async ({ channel }: CommandProps) => {
    const data = await fetchGosuData();
    if (!data) return client.say(channel, 'no data');
    await client.say(channel, data.settings.folders.skin);
  },
};
