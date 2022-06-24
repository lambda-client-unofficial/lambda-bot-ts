import 'dotenv/config';
import { Client } from 'discord.js';
import { GatewayIntentBits } from 'discord-api-types/v10';
import logger from './utils/logger';
import { registerSlashCommands } from './slash';
import resgisterEvents from './events';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
  ],
});

client.on('ready', async () => {
  logger.success(`[Discord API] Logged in as ${client.user?.tag}!`);
  await registerSlashCommands(client);
  await resgisterEvents(client);
});

client.on('presenceUpdate', async (newPresence) => {
  if (!newPresence) return;
  newPresence.activities.forEach(activity => {
    if (activity.applicationId?.toString() === '638403216278683661') {
      logger.log(`[Kami Blue] <@${newPresence.userId}> is apparently using kami blue`);
    }
  });
});

client.login(process.env.TOKEN);
