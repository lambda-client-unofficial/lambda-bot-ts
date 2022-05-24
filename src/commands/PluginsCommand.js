import { MessageEmbed, Client, Message } from 'discord.js';
import pluginUtils from '../utils/plugins.js';
import colors from '../utils/colors.js';

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
const invoke = async (client, message, args) => {
  const plugins = await pluginUtils.listPlugins();
  const embed = new MessageEmbed()
    .setColor(colors.blue)
    .setTitle('Plugins List');
  // plugins.forEach((plugin) => {
  //   embed.addField(`[${plugin.full_name}](${plugin.html_url})`, `**Description**:\n${plugin.description}\n\n**Stars:**\n${plugin.stargazers_count}\n\n**License:**\n${plugin.license.name}`, true);
  // });
  // message.channel.send({ embeds: [embed] });
  console.log(plugins);
};

const info = {
  name: 'plugins',
  description: 'list plugins',
};

export {
  invoke,
  info,
};
