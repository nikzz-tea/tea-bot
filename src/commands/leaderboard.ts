import { OrderItem } from 'sequelize';
import { Users } from '../database/models';
import CommandObject from '../models/commandObject';
import client from '../api/twitch';
import getTwitchUser from '../utils/getTwitchUser';

export default {
  aliases: ['top', 'lb'],
  callback: async ({ channel }) => {
    const order = [
      ['lvl', 'DESC'],
      ['exp', 'DESC'],
    ] as OrderItem[];
    const sortedUsers = await Users.findAll({ order, limit: 5 });
    const formattedStrings = await Promise.all(
      sortedUsers.map(async (user, i) => {
        const username = (await getTwitchUser(undefined, user.id))?.display_name;
        return `${i + 1}. ${username} (${user.lvl} lvl)`;
      }),
    );
    const message = `Top 5 users: ${formattedStrings.join(' ')}`;
    client.say(channel, message);
  },
} as CommandObject;
