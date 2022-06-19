import { Client, CommandInteraction } from 'discord.js';
import ms from 'ms';
import { commands } from '../../slash';
import embedUtils from '../../utils/embed';

const timeout = new Set();

export default async (client: Client, interaction: CommandInteraction) => {
  if (!commands.has(interaction.commandName)) return;
  if (!interaction.guild) return;
  const command = commands.get(interaction.commandName)!;
  try {
    if (command.timeout) {
      if (timeout.has(`${interaction.user.id}${command.name}`)) {
        await interaction.reply({ embeds: [embedUtils.error(`You need to wait **${ms(command.timeout, { long: true })}** to use command again`)], ephemeral: true });
        return;
      }
    }
    command.run(interaction, client);
    timeout.add(`${interaction.user.id}${command.name}`);
    setTimeout(() => {
      timeout.delete(`${interaction.user.id}${command.name}`);
    }, command.timeout, clearTimeout());
  } catch (e: any) {
    await interaction.reply({ embeds: [embedUtils.error(`An error occured: ${e.toString()}`)] });
  }
};
