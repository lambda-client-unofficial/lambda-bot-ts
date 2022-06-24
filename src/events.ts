import { Client } from 'discord.js';
import * as fs from 'graceful-fs';
import * as path from 'path';

import logger from './utils/logger';

const events: any[] = [];

const scanEvents = (client: Client, dirs: String) => new Promise<void>((resolve) => {
  const scannedEvents = fs.readdirSync(path.join(`${__dirname}/events/${dirs}/`)).filter((d: string) => d.endsWith('js'));
  scannedEvents.forEach(async (file) => {
    const evt = await import(`${__dirname}/events/${dirs}/${file}`);
    const eName = file.split('.')[0];
    try {
      client.on(eName, (...args) => evt.default(client, ...args));
    } catch (e: any) {
      logger.warn(`[Events] Failed to load event ${eName}: ${e.toString()}`);
      return;
    }
    events.push(evt);
    logger.success(`[Events] Loaded event ${eName}.`);
  });
  resolve();
});

const resgisterEvents = async (client: Client) => {
  logger.log('[Events] Loading events.');
  scanEvents(client, 'guild');
};

export default resgisterEvents;
