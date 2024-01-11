import { ChatUserstate } from 'tmi.js';

export default interface CommandProps {
  channel: string;
  message: string;
  userstate: ChatUserstate;
  args: string[];
}
