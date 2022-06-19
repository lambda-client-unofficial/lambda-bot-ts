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
  ],
});

client.on('ready', async () => {
  logger.log(`[Discord API] Logged in as ${client.user?.tag}!`.green);
  await registerSlashCommands(client);
  await resgisterEvents(client);
});

client.login(process.env.TOKEN);
