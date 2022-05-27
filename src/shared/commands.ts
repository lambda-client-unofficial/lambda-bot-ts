import fs from 'graceful-fs';
import logger from '../utils/logger';

const commands = new Map<string, any>();

const scanCommands = () => {
  fs.readdirSync(`${__dirname}/commands/`).map(async (cmd: any) => {
    try {
      const pull = await import(`./commands/${cmd}`);
      commands.set(pull.name, pull);
      logger.log(`[COMMANDS] Scanned ${pull.name.green}`);
    } catch (e) {
      logger.warn(`Unable to load command ${cmd}: ${e}`);
    }
  });
};

export {
  commands,
  scanCommands,
};
