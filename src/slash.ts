import 'dotenv/config';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { Client, Collection, Guild } from 'discord.js';
import * as fs from 'graceful-fs';
import logger from './utils/logger';
import Command from './types/command';

import('colors');

if (!process.env.TOKEN) {
  logger.error('[Discord API] No token found.');
  throw Error('No token found.');
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

const commands = new Collection<string, Command>();

const scanCommands = async () => {
  await fs.readdirSync('./commands/').map(async (cmd: string) => {
    try {
      if (fs.lstatSync(`${__dirname}/commands/${cmd}`).isDirectory()) return;
      const pull = await import(`${__dirname}/commands/${cmd}`);
      commands.set(pull.default.name, pull.default);
      logger.log(`[COMMANDS] Scanned ${pull.default.name}`.green);
    } catch (e) {
      logger.warn(`Unable to load command ${cmd}: ${e}`);
    }
  });
  return commands;
};

const registerSlashCommands = async (client: Client) => {
  const c = await scanCommands();
  logger.log('[Discord API] Refreshing application commands.');
  client.guilds.cache.forEach(async (guild: Guild) => {
    if (!process.env.BOT_ID) {
      logger.error('[Discord API] No bot ID found.');
      throw Error('No bot ID found.');
    }
    await rest.put(
      Routes.applicationGuildCommands(process.env.BOT_ID, guild.id),
      { body: c },
    );
  });
  logger.log('[Discord API] Successfully registered all commands.');
};

export {
  commands,
  registerSlashCommands,
};
