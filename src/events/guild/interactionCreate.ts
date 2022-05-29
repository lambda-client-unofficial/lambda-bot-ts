import { Client, CommandInteraction } from 'discord.js';
import ms from 'ms';
import { commands } from '../../commandsLoader';
import embedUtils from '../../utils/embed';

const Timeout = new Set();

export default async (client: Client, interaction: CommandInteraction) => {
  if (commands.has(interaction.commandName)) return;
  if (!interaction.guild) return;
  const command = commands.get(interaction.commandName);
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
  } catch (e: any) {
    await interaction.reply({ embeds: [embedUtils.error(`An error occured: ${e.toString()}`)] });
  }
};
