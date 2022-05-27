import 'dotenv/config'
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import logger from './utils/logger';
import commands from './shared/commands';

if (!process.env.TOKEN) {
  logger.error('[Discord API] No token found.');
  throw Error('No token found.');
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

const registerSlashCommands = async (client) => {
  try {
    logger.log('[Discord API] Started refreshing application (/) commands.');
    client.guilds.cache.forEach(async (guild) => {
      try {
        if (!process.env.BOT_ID) {
          logger.error('[Discord API] No bot ID found.');
          throw Error('No bot ID found.');
        }
        await rest.put(
          Routes.applicationGuildCommands(process.env.BOT_ID, guild.id),
          { body: [...commands.values()] },
        );
      } catch (e) {
        logger.error(`[Discord API] Unable to refresh application (/) commands for ${guild.name}: ${e}`);
      }
    });
    logger.log('[Discord API] Successfully reloaded application (/) commands.');
  } catch (e) {
    logger.error(`[Discord API] Failed to reload application (/) commands: ${e}`);
  }
};

export default registerSlashCommands;
