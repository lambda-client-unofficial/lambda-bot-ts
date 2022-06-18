import { Client } from 'discord.js';
import * as fs from 'graceful-fs';
import * as path from 'path';
import logger from './utils/logger';

const events: any[] = [];

const scanEvents = async (client: Client, dirs: String) => {
  const scannedEvents = fs.readdirSync(path.join(`${__dirname}/events/${dirs}/`)).filter((d: string) => d.endsWith('js'));
  scannedEvents.forEach(async (file) => {
    const evt = await import(`${__dirname}/events/${dirs}/${file}`);
    const eName = file.split('.')[0];
    client.on(eName, evt.default.bind(null, client));
    events.push(evt);
    logger.log(`[EVENTS] Loaded event ${eName}.`.green);
  });
};

export {
  scanEvents,
  events,
};
