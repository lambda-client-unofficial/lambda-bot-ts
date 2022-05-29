import ms from 'ms';
import { Client, CommandInteraction, EmbedBuilder } from 'discord.js';
import size from '../utils/bytes';
import { Octokit } from 'octokit';
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export default {
  name: 'plugins',
  description: 'Check plugin list',
  timeout: ms('30s'),

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  run: async (interaction: CommandInteraction, _client: Client) => {
    const pluginList: { name: any; stargazers: any; watchers: any; issues: string; url: string; size: any; }[] = [];
    /*const plugins: { name: any; stargazers: any; watchers: any; issues: string; url: string; size: any; }[] = await octokit.request('GET /orgs/{org}/repos', { org: 'lambda-plugins' }) // need fix
    plugins.forEach((plugin: { name: any; stargazers: any; watchers: any; issues: string; url: string; size: any; }[]) => {
      pluginList.push({
        name: plugin?.name,
        stargazers: plugin?.stargazers_count,
        watchers: plugin?.watchers_count,
        issues: `[Issues](${plugin?.issues_url})`,
        url: `[Repo URL](${plugin?.html_url}) ()`,
        size: plugin?.size,
      });
    });*/
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
