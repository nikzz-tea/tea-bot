import client from '../api/twitch';
import { Users } from '../database/models';
import CommandObject from '../models/commandObject';
import getIdByUsername from '../utils/getIdByUsername';

export default {
  aliases: ['lvl'],
  callback: async ({ channel, userstate, args }) => {
    let { id, name } = { id: userstate['user-id'], name: userstate['display-name'] };
    if (args.length) {
      const mentionedId = await getIdByUsername(args[0]);
      if (mentionedId) {
        id = mentionedId;
        name = args[0];
      }
    }
    const user = await Users.findOne({ where: { id } });
    if (!user) return client.say(channel, 'no data');
    const expToLvlUp = 500 + 100 * user.lvl;
    const lvlPercent = ((user.exp / expToLvlUp) * 100).toFixed();
    client.say(
      channel,
      `${name} is currently level ${user.lvl} and on ${lvlPercent}% to the next level!`,
    );
  },
} as CommandObject;
