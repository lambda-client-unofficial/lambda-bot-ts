import 'dotenv/config';
import { Client } from 'discord.js';
import { GatewayIntentBits } from 'discord-api-types/v10';
import { readdirSync } from 'graceful-fs';
import commands from './shared/commands';
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

  readdirSync(`${__dirname}/commands/`).map(async (cmd) => {
    try {
      const pull = await import(`./commands/${cmd}`);
      commands.set(pull.name, pull);
    } catch (e) {
      logger.warn(`Unable to load command ${cmd}: ${e}`);
    }
  });
});

client.login(process.env.TOKEN);
