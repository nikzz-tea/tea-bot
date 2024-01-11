import { ChatUserstate } from 'tmi.js';
import { prefix } from '../../config.json';
import { Commands } from '../../database/models';
import client from '../../api/twitch';

export default async (channel: string, user: ChatUserstate, message: string, self: boolean) => {
  if (self) return;
  if (!message.startsWith(prefix)) return;
  const commands = await Commands.findAll({
    attributes: ['name'],
  });
  const keys = commands.map((command) => command.get('name')) as string[];
  for (const key of keys) {
    if (message.toLowerCase() !== `${prefix}${key.toLowerCase()}`) return;
    const obj = await Commands.findOne({ where: { name: key } });
    if (!obj) return;
    const content = obj.get('content') as string;
    client.say(channel, content);
  }
};
