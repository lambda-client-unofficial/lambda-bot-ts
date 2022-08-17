import { Client, CommandInteraction, EmbedBuilder } from 'discord.js';
import logger from '../utils/logger';

const colorFormat = (log: string) => log
  .split('\n')
  .map((line) => {
    if (line.includes('[SUCCESS]')) return `+ ${line}`;
    if (line.includes('[ERROR]') || line.includes('[WARN]')) return `- ${line}`;
    return line;
  })
  .join('\n');

export default {
  name: 'log',
  description: 'Get last 10 lines of log',
  run: async (interaction: CommandInteraction, _client: Client) => {
    if (!interaction.isCommand()) return;
    const embed = new EmbedBuilder()
      .setTitle('Last 10 lines of log file')
      .setDescription(`\`\`\`diff\n${colorFormat(await logger.last(10))}\`\`\``)
      .setColor('Aqua');
    interaction.reply({ embeds: [embed] });
  },
};
