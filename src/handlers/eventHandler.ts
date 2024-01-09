import { Client, Events } from 'tmi.js';
import getFiles from './getFiles';
import path from 'path';

export default (client: Client) => {
  const ext = '.ts';
  const events: { [key: string]: any } = {};
  const eventFiles = getFiles(path.join(__dirname, '..', 'events'), ext);

  for (const event of eventFiles) {
    let eventFile = require(event);
    if (eventFile.default) eventFile = eventFile.default;

    const split = event.replace(/\\/g, '/').split('/');
    const eventName = split[split.length - 2];

    if (!events[eventName]) events[eventName] = [];
    events[eventName] = [...events[eventName], eventFile];
  }

  console.log(events);

  for (const eventName of Object.keys(events)) {
    client.on(eventName as keyof Events, async () => {
      for (const func of events[eventName]) {
        try {
          await func();
        } catch (error) {
          console.error(error);
        }
      }
    });
  }
};
