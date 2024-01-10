import client from '..';
import fetchGosuData from '../utils/fetchGosuData';

export default {
  aliases: ['np', 'song', 'нп'],
  callback: async (channel: string) => {
    const data = await fetchGosuData();
    if (!data) return client.say(channel, 'no data');
    await client.say(
      channel,
      `${data.menu.bm.metadata.artist} - ${data.menu.bm.metadata.title} 
    [${data.menu.bm.metadata.difficulty}] | Link: http://osu.ppy.sh/b/${data.menu.bm.id}`,
    );
  },
};
