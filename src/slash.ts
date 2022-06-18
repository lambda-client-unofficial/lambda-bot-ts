import 'dotenv/config';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { Client, Guild } from 'discord.js';
import * as fs from 'graceful-fs';
import logger from './utils/logger';
import Command from './types/command';

import('colors');

if (!process.env.TOKEN) {
  logger.error('[Discord API] No token found.');
  throw Error('No token found.');
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

const commands = new Map<string, Command>();

const scanCommands = () => {
  fs.readdirSync('./commands/').map(async (cmd: string) => {
    try {
      if (!cmd.endsWith('.js')) return;
      const pull = await import(`${__dirname}/commands/${cmd}`);
      commands.set(pull.default.name, pull.default);
      logger.log(`[Commands] Scanned ${pull.default.name}`.green);
    } catch (e: any) {
      logger.warn(`[Commands] Unable to load command ${cmd}: ${e.toString()}`.yellow);
    }
  });
};

const registerSlashCommands = async (client: Client) => {
  scanCommands();
  logger.log('[Discord API] Registering application commands.');
  client.guilds.cache.forEach(async (guild: Guild) => {
    if (!process.env.BOT_ID) {
      logger.error('[Discord API] No bot ID found.'.red);
      throw Error('No bot ID found.');
    }
    await rest.put(
      Routes.applicationGuildCommands(process.env.BOT_ID, guild.id),
      { body: commands },
    );
  });
  logger.log('[Discord API] Successfully registered all commands.'.green);
};

export {
  commands,
  registerSlashCommands,
};
