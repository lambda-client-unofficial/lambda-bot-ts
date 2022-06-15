import {
  CommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';
import embedUtils from '../utils/embed.js';
import minecraftUtils from '../utils/minecraftProfile';
import Name from '../types/name';

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
    if (!interaction.isChatInputCommand()) return;
    interaction.options.data.forEach(async (index) => {
      switch (index.name) {
        case 'name': {
          const username = interaction.options.getString('username');
          if (!username) return interaction.reply({ embeds: [embedUtils.error('Specify a player.')] })
          const user = minecraftUtils.profile(username);
          if (!user) return interaction.reply({ embeds: [embedUtils.error('No user found.')] });
          const namesRes = minecraftUtils.nameHistory(user.id);
          if (!namesRes) return interaction.reply({ embeds: [embedUtils.error('Unknown error')] });
          const texturesRes = minecraftUtils.textures(user.id);
          if (!texturesRes) return interaction.reply({ embeds: [embedUtils.error('Unknown error')] });

          const embed = new EmbedBuilder()
            .setTitle(`${username}'s Profile`)
            .addFields([{ name: 'UUID:', value: user.id }])
            .setImage(`https://crafatar.com/renders/body/${user}?overlay`)
            .setColor('Blue');
          try {
            namesRes.forEach((name: Name) => {
              let time: string | undefined = undefined;
              if (!name.changedToAt) {
                time = 'First Appeared Name'
              } else {
                time = new Date(name.changedToAt).toString();
              }
              embed.addFields([{ name: name.name ?? 'Unknown', value: time ?? 'First Appeared Name' }]);
            });
          } catch (e) {
            return e;
          }
          const row = new ActionRowBuilder().addComponents([
            new ButtonBuilder()
              .setStyle(ButtonStyle.Link)
              .setURL(texturesRes.id)
              .setLabel('Player skin'),
          ]).addComponents([
            new ButtonBuilder()
              .setStyle(ButtonStyle.Link)
              .setURL(`https://namemc.com/search?q=${username}`)
              .setLabel('NameMC'),
          ]);
          return interaction.reply({ embeds: [embed], components: [row as any] }); // need fix
        }
        default:
          return interaction.reply({ embeds: [embedUtils.error('Please choose something.')] });
      }
    });
  },
};

