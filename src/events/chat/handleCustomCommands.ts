import { ChatUserstate } from 'tmi.js';
import { prefix } from '../../config.json';
import { Commands } from '../../database/models';
import client from '../../api/twitch';

export default async (channel: string, user: ChatUserstate, message: string, self: boolean) => {
  if (self) return;
  if (!message.startsWith(prefix)) return;
  const name = message.slice(prefix.length).split(' ')[0];
  const command: any = await Commands.findOne({
    where: { name },
  });
  if (!command) return;
  client.say(channel, command.content);
};
