import { Client } from 'tmi.js';
import dotenv from 'dotenv';
import { channel } from './config.json';
import { BanchoClient } from 'bancho.js';
import { auth } from 'osu-api-extended';

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
  let commandHandler = require('./handlers/commandHandler');
  let eventHandler = require('./handlers/eventHandler');
  if (commandHandler.default) commandHandler = commandHandler.default;
  if (eventHandler.default) eventHandler = eventHandler.default;
  commandHandler(client);
  eventHandler(client);
  console.log('TMI: connected');
  try {
    await bancho.connect();
    console.log('Bancho: connected');
  } catch (error) {
    console.log(`Bancho: connection error\n${error}`);
  }
  try {
    await auth.login(Number(process.env.OSU_APP_ID), process.env.OSU_SECRET as string, ['public']);
    console.log('osu! api: connected');
  } catch (error) {
    console.log(`osu! api: connection error\n${error}`);
  }
});

client.connect();

export default client;
