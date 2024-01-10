import client from '..';
import fetchGosuData from '../utils/fetchGosuData';

export default {
  callback: async (channel: string) => {
    const data = await fetchGosuData();
    if (!data) return client.say(channel, 'no data');
    await client.say(channel, data.settings.folders.skin);
  },
};
