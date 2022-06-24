import 'dotenv/config';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { Client, Collection, Guild } from 'discord.js';
import * as fs from 'graceful-fs';
import logger from './utils/logger';
import Command from './types/command';

if (!process.env.TOKEN) {
  logger.error('[Discord API] No token found.');
  throw Error('No token found.');
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

const commands = new Collection<string, Command>();

const scanCommands: Promise<Collection<string, Command>> = new Promise((resolve) => {
  logger.log('[Commands] Scanning commands folder');
  fs.readdirSync('./commands/').map(async (cmd: string) => {
    logger.log(`[Commands] Loading ${cmd}`);
    try {
      if (!cmd.endsWith('.js')) return;
      const pull = await import(`${__dirname}/commands/${cmd}`);
      commands.set(pull.default.name, pull.default);
    } catch (e: any) {
      logger.warn(`[Commands] Unable to load command ${cmd}: ${e.toString()}`);
    }
  });
  resolve(commands);
});

const registerSlashCommands = async (client: Client) => {
  const c = await scanCommands;
  logger.log('[Discord API] Registering slash commands.');
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
  logger.success(`[Discord API] Registered ${c.size} commands.`);
};

export {
  commands,
  registerSlashCommands,
};
