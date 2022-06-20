import { Client } from 'discord.js';
import * as fs from 'graceful-fs';
import * as path from 'path';

import logger from './utils/logger';

import('colors');

const events: any[] = [];

const scanEvents = (client: Client, dirs: String) => new Promise<void>((resolve) => {
  const scannedEvents = fs.readdirSync(path.join(`${__dirname}/events/${dirs}/`)).filter((d: string) => d.endsWith('js'));
  scannedEvents.forEach(async (file) => {
    const evt = await import(`${__dirname}/events/${dirs}/${file}`);
    const eName = file.split('.')[0];
    client.on(eName, evt.default);
    events.push(evt);
    logger.log(`[Events] Loaded event ${eName}.`.green);
  });
  resolve();
});

const resgisterEvents = async (client: Client) => {
  logger.log('[Events] Loading events');
  scanEvents(client, 'guild').then(() => logger.log('[Events] Successfully loaded all events.'.green));
};

export default resgisterEvents;
