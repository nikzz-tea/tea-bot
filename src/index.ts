import { Client } from 'tmi.js';
import dotenv from 'dotenv';
import { channel } from './config.json';
import { BanchoClient } from 'bancho.js';

dotenv.config();

const client = new Client({
  connection: { reconnect: true },
  identity: {
    username: process.env.TWITCH_LOGIN,
    password: process.env.TWITCH_PASSWORD,
  },
  channels: [channel],
});

export const bancho = new BanchoClient({
  username: process.env.OSU_USERNAME as string,
  password: process.env.OSU_SERVER_PASSWORD as string,
});

client.on('connected', async () => {
  let handler = require('./handlers/commandHandler');
  if (handler.default) handler = handler.default;
  handler(client);
  console.log('TMI: connected');
  try {
    await bancho.connect();
    console.log('Bancho: connected');
  } catch (error) {
    console.log(`Bancho: connection error\n${error}`);
  }
});

client.connect();

export default client;
