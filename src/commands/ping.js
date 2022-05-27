const embedUtils = require('../utils/embed');

module.exports = {
  name: 'stats',
  description: 'Get stats',
  run: async (interaction, client) => {
    await interaction.reply('🏓 Pong!');
    const msg = await interaction.fetchReply();
    const ws = msg.createdTimestamp - interaction.createdTimestamp;
    const api = Math.round(client.ws.ping);

    return interaction.editReply({ embeds: [embedUtils.success(`Bot ping: ${ws} ms\nDiscord API: ${api} ms`)] });
  },
};
