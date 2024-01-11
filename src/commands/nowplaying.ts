import client from '../api/twitch';
import CommandObject from '../models/commandObject';
import CommandProps from '../models/commandProps';
import fetchGosuData from '../utils/fetchGosuData';

export default {
  aliases: ['np', 'song', 'нп'],
  callback: async ({ channel }: CommandProps) => {
    const data = await fetchGosuData();
    if (!data) return client.say(channel, 'no data');
    await client.say(
      channel,
      `${data.menu.bm.metadata.artist} - ${data.menu.bm.metadata.title} 
    [${data.menu.bm.metadata.difficulty}] | Link: http://osu.ppy.sh/b/${data.menu.bm.id}`,
    );
  },
} as CommandObject;
