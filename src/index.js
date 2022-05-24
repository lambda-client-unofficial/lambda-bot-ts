import { Client, Intents } from "discord.js";
import fs from 'graceful-fs';
import * as config from "../config.js";
import * as embeds from "./utils/embed.js";

const bot = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS] })

const commands = new Map();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  commands.set(command.info.name, command);
  console.log(`Loaded command ${command.info.name}`);
}
bot.commands = commands;

const services = [];
const serviceFiles = fs.readdirSync("./services").filter(file => file.endsWith(".js"));
for (const file of serviceFiles) {
  const service = await import(`./services/${file}`);
  services.push(service);
  console.log(`Loaded service ${service.info.name}`);
}
bot.services = services;

bot.on('messageCreate', async message => {
  if (message.author.bot || !message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  try {
    const command = commands.get(commandName);
    command.invoke(bot, message, args);
  } catch (error) {
    message.channel.send({ embeds: [embeds.error(`${error.toString()}`)] });
  }
})

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
})

services.filter(service => !service.info.disabled).map(service => { setInterval(service.loop, service.info.interval); })

bot.login(config.discordToken);