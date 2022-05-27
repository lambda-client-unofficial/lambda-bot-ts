/* eslint-disable no-console */
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { readdirSync } = require('graceful-fs');
const path = require('path');
require('colors');

const commands: any[] = [];
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

readdirSync(`${__dirname}/commands/`).map(async (cmd) => {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  commands.push(require(path.join(__dirname, `/commands/${cmd}`)));
});

const register = async (client) => {
  try {
    console.log('[Discord API] Started refreshing application (/) commands.'.yellow);
    client.guilds.cache.forEach(async (guild) => {
      try {
        await rest.put(
          Routes.applicationGuildCommands(process.env.BOT_ID, guild.id),
          { body: commands },
        );
      } catch (e) {
        console.log(e);
      }
    });
    console.log('[Discord API] Successfully reloaded application (/) commands.'.green);
  } catch (error) {
    console.log(error);
  }
};

export default register;