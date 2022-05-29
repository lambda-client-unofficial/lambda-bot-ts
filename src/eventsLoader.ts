import { Client } from 'discord.js';
import fs from 'graceful-fs';
import logger from './utils/logger';
const events: any[] = [];

const scanEvents = async (client: Client, dirs: String) => {
  const scannedEvents = await fs.readdirSync(__dirname+"/events/"+dirs+"/").filter((d: string) => d.endsWith('js'));
  scannedEvents.forEach(async (file) => {
    const evt = await import(__dirname+"/events/"+dirs+"/"+file+"/");
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
