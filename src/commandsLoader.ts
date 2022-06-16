import { Collection } from 'discord.js';
import * as fs from 'graceful-fs';
import { resolve } from 'path';
import Command from './types/command';
import logger from './utils/logger';
import("colors")
const commands = new Collection<string, Command>()

const scanCommands = async() => {
    await fs.readdirSync('./\/commands/').map(async (cmd: string) => {
      try {
        if(fs.lstatSync(`${__dirname}/\/commands/${cmd}`).isDirectory()) return
        const pull = await import(`${__dirname}/\/commands/${cmd}`);
        commands.set(pull.default.name, pull.default);
        logger.log(`[COMMANDS] Scanned ${pull.default.name}`.green);
      } catch (e) {
        logger.warn(`Unable to load command ${cmd}: ${e}`);
      }
    })
    return commands
};

export {
  commands,
  scanCommands,
};
