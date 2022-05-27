const { EmbedBuilder } = require('discord.js');
const axios = require('axios').default;
const size = require('../utils/bytes');
const { listPlugins } = require('../utils/plugins');

module.exports = {
  name: 'plugins',
  description: 'Check plugin list',
  timeout: 300000,

  run: async (interaction) => {
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
    return await interaction.reply({ embeds: [pluginEmbed] });
  },
};
