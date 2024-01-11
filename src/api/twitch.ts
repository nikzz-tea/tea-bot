import { Client } from 'tmi.js';
import dotenv from 'dotenv';
import { channel } from '../config.json';

dotenv.config();

const client = new Client({
  connection: { reconnect: true },
  identity: {
    username: process.env.TWITCH_LOGIN,
    password: process.env.TWITCH_PASSWORD,
  },
  channels: [channel],
});

export default client;
