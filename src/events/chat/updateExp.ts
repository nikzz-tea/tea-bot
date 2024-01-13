import { ChatUserstate } from 'tmi.js';
import { Users } from '../../database/models';
import { prefix } from '../../config.json';
import parseMapId from '../../utils/parseMapId';
import client from '../../api/twitch';

export default async (
  channel: string,
  userstate: ChatUserstate,
  message: string,
  self: boolean,
) => {
  if (self) return;
  if (message.startsWith(prefix)) return;
  if (parseMapId(message)) return;
  const [user] = await Users.findOrCreate({ where: { id: userstate['user-id'] } });
  await user.increment('exp', { by: 10 });
  if (user.exp < 500 + 100 * user.lvl) return;
  await user.increment('lvl');
  await user.update({ exp: 0 });
  client.say(channel, `${userstate['display-name']} just reached level ${user.lvl + 1}! peepoClap`);
};
