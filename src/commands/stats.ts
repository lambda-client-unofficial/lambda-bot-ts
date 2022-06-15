import { Client, CommandInteraction, Message } from 'discord.js';

import embedUtils from '../utils/embed';

export default {
  name: 'stats',
  description: 'Get stats',
  run: async (interaction: CommandInteraction, client: Client) => {
    await interaction.reply('🏓 Pong!');
    const msg = await interaction.fetchReply();
    let ws;
    if (msg instanceof Message) {
      ws = msg.createdTimestamp - interaction.createdTimestamp;
    }
    const api = Math.round(client.ws.ping);

    return interaction.editReply({ embeds: [embedUtils.success(`Bot ping: ${ws} ms\nDiscord API: ${api} ms`)] });
  },
};
