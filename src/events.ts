import { Client } from 'discord.js';
import { scanEvents } from './eventsLoader';
import logger from './utils/logger';

import('colors');

const resgisterEvents = (client: Client) => {
  [/* 'client', */'guild'].forEach((x) => {
    scanEvents(client, x);
    logger.log(`[Events] Loaded ${x} events.`.green);
  });
  logger.log('[Events] Successfully loaded all events.'.green);
};

export default resgisterEvents;
