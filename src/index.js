/* eslint-disable global-require */
const { Client, Collection } = require('discord.js');
const { GatewayIntentBits } = require('discord-api-types/v10');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    'MESSAGE',
    'CHANNEL',
  ],
});

require('dotenv').config();
const { readdirSync } = require('graceful-fs');

client.commands = new Collection();
client.slash = new Collection();

client.on('ready', () => {
  // eslint-disable-next-line no-console
  console.log(`Logged in as ${client.user.tag}!`);
  require('./slash')(client);
  require('./events')(client);

  readdirSync(`${__dirname}/commands/`).map(async (cmd) => {
    // eslint-disable-next-line import/no-dynamic-require
    const pull = require(`./commands/${cmd}`);
    client.slash.set(pull.name, pull);
  });
});

client.login(process.env.TOKEN);
