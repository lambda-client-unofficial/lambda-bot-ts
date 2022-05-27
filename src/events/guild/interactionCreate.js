const ms = require('ms');
const embedUtils = require('../../utils/embed');

const Timeout = new Set();

module.exports = async (client, interaction) => {
  if (!client.slash.has(interaction.commandName)) return;
  if (!interaction.guild) return;
  const command = client.slash.get(interaction.commandName);
  try {
    if (command.timeout) {
      if (Timeout.has(`${interaction.user.id}${command.name}`)) {
        await interaction.reply({ embeds: [embedUtils.error(`You need to wait **${ms(command.timeout, { long: true })}** to use command again`)], ephemeral: true });
      }
    }
    command.run(interaction, client);
    Timeout.add(`${interaction.user.id}${command.name}`);
    setTimeout(() => {
      Timeout.delete(`${interaction.user.id}${command.name}`);
    }, command.timeout, clearTimeout());
  } catch (e) {
    await interaction.reply({ embeds: [embedUtils.error(`An error occured: ${e.toString()}`)] });
  }
};
