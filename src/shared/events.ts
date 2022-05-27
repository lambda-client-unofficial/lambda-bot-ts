import { Client } from 'discord.js';
import fs from 'graceful-fs';
import logger from '../utils/logger';

const events: any[] = [];

const scanEvents = (client: Client, dirs: string) => {
  const scannedEvents = fs.readdirSync(`./events/${dirs}/`).filter((d: any) => d.endsWith('js'));
  scannedEvents.forEach(async (file) => {
    const evt = await import(`./events/${dirs}/${file}`);
    const eName = file.split('.')[0];
    client.on(eName, evt.bind(null, client));
    events.push(evt);
    logger.log(`[EVENTS] Loaded event ${eName.green}.`);
  });
};

export {
  scanEvents,
  events,
};
