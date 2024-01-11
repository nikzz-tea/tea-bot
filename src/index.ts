import { auth } from 'osu-api-extended';
import bancho from './api/bancho';
import client from './api/twitch';
import { readdirSync } from 'fs';
import path from 'path';
import sequelize from './database';

client.on('connected', async () => {
  for (const handlerFile of readdirSync(path.join(__dirname, 'handlers'))) {
    let handler = require(`./handlers/${handlerFile}`);
    if (handler.default) handler = handler.default;
    handler(client);
  }
  await sequelize.sync();
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
