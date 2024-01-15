import { Client, Events } from 'tmi.js';
import getFiles from '../utils/getFiles';
import path from 'path';

export default (client: Client) => {
  const events: { [key: string]: any } = {};
  const eventFiles = getFiles(path.join(__dirname, '..', 'events'));

  for (const event of eventFiles) {
    let eventFile = require(event);
    if (eventFile.default) eventFile = eventFile.default;

    const split = event.replace(/\\/g, '/').split('/');
    const eventName = split[split.length - 2];

    if (!events[eventName]) events[eventName] = [];
    events[eventName] = [...events[eventName], eventFile];
  }

  for (const eventName of Object.keys(events)) {
    client.on(eventName as keyof Events, async (...args) => {
      for (const func of events[eventName]) {
        try {
          await func(...(args as any[]));
        } catch (error) {
          console.error(error);
        }
      }
    });
  }
};
