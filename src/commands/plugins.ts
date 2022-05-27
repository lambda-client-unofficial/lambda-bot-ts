import ms from 'ms';
import { Client, CommandInteraction, EmbedBuilder } from 'discord.js';
import size from '../utils/bytes';
import { listPlugins } from '../utils/plugins';

export default {
  name: 'plugins',
  description: 'Check plugin list',
  timeout: ms('30s'),

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  run: async (interaction: CommandInteraction, _client: Client) => {
    const pluginList = [];
    const plugins = (await listPlugins()).data;
    plugins.forEach((plugin) => {
      pluginList.push({
        name: plugin?.name,
        stargazers: plugin?.stargazers_count,
        watchers: plugin?.watchers_count,
        issues: `[Issues](${plugin?.issues_url})`,
        url: `[Repo URL](${plugin?.html_url}) ()`,
        size: plugin?.size,
      });
    });
    const pluginEmbed = new EmbedBuilder().setTitle('Plugins Informations');
    pluginList.forEach((plugin) => {
      pluginEmbed.addFields([{
        name: plugin.name,
        value:
                    `Stargazers: ${plugin.stargazers}\n
                Watchers: ${plugin.watchers}\n
                Issues: ${plugin.issues}\n
                Size: ${size(plugin.size)}\n
                ${plugin.url}`,
        inline: true,
      }]);
    });
    return interaction.reply({ embeds: [pluginEmbed] });
  },
};
