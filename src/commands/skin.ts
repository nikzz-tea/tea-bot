import client from '..';
import fetchGosuData from '../utils/fetchGosuData';
import { channel } from '../config.json';

export default {
  callback: async () => {
    const data = await fetchGosuData();
    if (!data) return client.say(channel, 'no data');
    client.say(channel, data.settings.folders.skin);
  },
};
