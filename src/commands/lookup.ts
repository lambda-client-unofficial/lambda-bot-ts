import { CommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder } from 'discord.js';
import embedUtils from '../utils/embed.js';
import minecraftUtils from '../utils/minecraftProfile';

export default {
  name: 'lookup',
  description: 'Lookup minecraft users',
  options: [
    {
      name: 'name',
      description: 'The name of the user to lookup',
      type: 1,
      options: [
        {
          name: 'username',
          description: 'The username of the user to lookup',
          type: 3,
        },
      ],
    },

  ],

  run: async (interaction: CommandInteraction) => {
    interaction.options.data.forEach(async (index) => {
      switch (index.name) {
        case 'name': {
          const username = await interaction.options.get('username');
          const user = await minecraftUtils.profile(username);

          if (!user) return interaction.reply({ embeds: [embedUtils.error('No user found.')] });
          const namesRes = await minecraftUtils.names(user);
          if (!namesRes) return interaction.reply({ embeds: [embedUtils.error('Unknown error')] });
          const texturesRes = await minecraftUtils.textures(user);
          if (!texturesRes) return interaction.reply({ embeds: [embedUtils.error('Unknown error')] });

          const embed = new EmbedBuilder()
            .setTitle(`${username}'s Profile`)
            .addFields([{ name: 'UUID:', value: user }])
            .setImage(`https://crafatar.com/renders/body/${user}?overlay`)
            .setColor('Blue');
          try {
            namesRes.forEach((name) => {
              let time = timestampToDate(name.changedToAt, 'yyyy-MM-dd HH:mm:ss'); if (time.toLowerCase().includes('nan')) time = 'First Appeared Name';
              embed.addFields([{ name: name.name ?? 'Unknown', value: time ?? 'First Appeared Name' }]);
            });
          } catch (e) {
            return e;
          }
          const row = new ActionRowBuilder().addComponents([
            new ButtonBuilder()
              .setStyle('Link')
              .setURL(texturesRes)
              .setLabel('Player skin'),
          ]).addComponents([
            new ButtonBuilder()
              .setStyle('Link')
              .setURL(`https://namemc.com/search?q=${username}`)
              .setLabel('NameMC'),
          ]);
          return interaction.reply({ embeds: [embed], components: [row] });
        }
        default:
          return interaction.reply({ embeds: [embedUtils.error('Please choose something.')] });
      }
    });
  },
};
