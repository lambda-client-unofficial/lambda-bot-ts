import { MessageEmbed, Client, Message } from 'discord.js';
import pluginUtils from '../utils/plugins.js';
import fs from 'graceful-fs';
import colors from '../utils/colors.js';

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
const invoke = async (client, message, args) => {
  const plugins = (await pluginUtils.listPlugins()).data;
  fs.writeFileSync('../data.json', JSON.stringify(plugins));
  const embed = new MessageEmbed()
    .setColor(colors.blue)
    .setTitle('Plugins List');
  plugins.forEach((plugin) => {
    embed.addField(`${plugin.name}`, `**Link:**\n${plugin.html_url}\n**Description**:\n${plugin.description}\n**Stars:**\n${plugin.stargazers_count}`, true);
  });
  message.channel.send({ embeds: [embed] });
};

const info = {
  name: 'plugins',
  description: 'list plugins',
};

export {
  invoke,
  info,
};
