import 'dotenv/config';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { Client, Guild } from 'discord.js';
import logger from './utils/logger';
import { scanCommands } from './commandsLoader';

if (!process.env.TOKEN) {
  logger.error('[Discord API] No token found.');
  throw Error('No token found.');
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

const registerSlashCommands = async (client: Client) => {
  const commands = await scanCommands()
  logger.log('[Discord API] Refreshing application commands.');
  client.guilds.cache.forEach(async (guild: Guild) => {
    if (!process.env.BOT_ID) {
      logger.error('[Discord API] No bot ID found.');
      throw Error('No bot ID found.');
    }
    await rest.put(
      Routes.applicationGuildCommands(process.env.BOT_ID, guild.id),
      { body: commands },
    );
  })
  logger.log('[Discord API] Successfully registered all commands.');
}

export default registerSlashCommands;
