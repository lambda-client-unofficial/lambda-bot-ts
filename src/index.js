const { Client, Collection, Permissions } = require('discord.js');
const { GatewayIntentBits } = require('discord-api-types/v10')
const client = new Client({ intents: [
	GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.MessageContent
], partials: [
	"MESSAGE",
	"CHANNEL",
	"GUILD_MEMBER"
]});
const fs = require("fs")
require('dotenv').config()
const embedUtils = require("./utils/embed.js")

const bot = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS] });

const commands = new Map();
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));
commandFiles.forEach(async (file) => {
  const command = await import(`./commands/${file}`);
  commands.set(command.info.name, command);
  console.log(`Loaded command ${command.info.name}`);
});
bot.commands = commands;

const services = [];
const serviceFiles = fs.readdirSync('./services').filter((file) => file.endsWith('.js'));
serviceFiles.forEach(async (file) => {
  const service = await import(`./services/${file}`);
  services.push(service);
  console.log(`Loaded service ${service.info.name}`);
});
bot.services = services;

bot.on('messageCreate', async (message) => {
  if (message.author.bot || !message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  try {
    const command = commands.get(commandName);
    command.invoke(bot, message, args);
  } catch (error) {
    message.channel.send({ embeds: [embedUtils.error(`${error.toString()}`)] });
  }
});

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

services
  .filter((service) => !service.info.disabled)
  .forEach((service) => { setInterval(service.loop, service.info.interval); });

bot.login(config.discordToken);
