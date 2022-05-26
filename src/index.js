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
const fs = require('fs');

client.commands = new Collection();
client.slash = new Collection();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  require('./slash')(client); // TODO: Fix this later
  require('./events')(client);

  fs.readdirSync(`${__dirname}/commands/`).map(async (cmd) => {
    const pull = require(`./commands/${cmd}`);
    client.slash.set(pull.name, pull);
    console.log(client.slash);
  });
});

client.login(process.env.TOKEN);
