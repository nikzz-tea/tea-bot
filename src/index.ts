import { Client } from 'tmi.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connection: { reconnect: true },
  identity: {
    username: process.env.TWITCH_LOGIN,
    password: process.env.TWITCH_PASSWORD,
  },
  channels: [process.env.TWITCH_CHANNEL as string],
});

client.on('connected', () => {
  let handler = require('./handlers/commandHandler');
  if (handler.default) handler = handler.default;
  handler(client);
  console.log('connected');
});

client.connect();
