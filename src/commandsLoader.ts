import { Collection } from 'discord.js';
import * as fs from 'graceful-fs';
import Command from './types/command';
import logger from './utils/logger';

import('colors');
const commands = new Collection<string, Command>();

const scanCommands = () => {
  fs.readdirSync('./commands/').map(async (cmd: string) => {
    try {
      if (fs.lstatSync(`${__dirname}/commands/${cmd}`).isDirectory()) return;
      const pull = await import(`${__dirname}/commands/${cmd}`);
      commands.set(pull.default.name, pull.default);
      logger.log(`[Commands] Scanned ${pull.default.name}`.green);
    } catch (e: any) {
      logger.warn(`[Commands] Unable to load command ${cmd}: ${e.toString()}`);
    }
  });
  return commands;
};

export {
  commands,
  scanCommands,
};
