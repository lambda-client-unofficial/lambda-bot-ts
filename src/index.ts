import 'dotenv/config';
import { Client } from 'discord.js';
import { GatewayIntentBits } from 'discord-api-types/v10';
import logger from './utils/logger';
import registerSlashCommands from './slash';
import resgisterEvents from './events';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on('ready', () => {
  logger.log(`Logged in as ${client.user?.tag}!`);
  registerSlashCommands(client);
  resgisterEvents(client);
});

client.login(process.env.TOKEN);
