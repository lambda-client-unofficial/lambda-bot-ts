import {
  CommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Colors,
} from 'discord.js';
import embedUtils from '../utils/embed.js';
import minecraftUtils from '../utils/minecraftProfile';
import Names from '../types/names';

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
      if (!interaction.isChatInputCommand()) return;
      switch (index.name) {
        case 'name': {
          const username = interaction.options.getString('username')!;
          const user = minecraftUtils.profile(username)!; // no need to check if the type is set to string bruh
          if (!user) { interaction.reply({ embeds: [embedUtils.error('No user found.')] }); return; }
          const namesRes = minecraftUtils.nameHistory(user.id);
          if (!namesRes) { interaction.reply({ embeds: [embedUtils.error('Unknown error')] }); return; }
          const texturesRes = minecraftUtils.textures(user.id)!;
          if (!texturesRes) { interaction.reply({ embeds: [embedUtils.error('Unknown error')] }); return; }

          const embed = new EmbedBuilder()
            .setTitle(`${username}'s Profile`)
            .addFields([{ name: 'UUID:', value: user.id }])
            .setImage(`https://crafatar.com/renders/body/${user.id}?overlay`)
            .setColor(Colors.Blue);
          try {
            namesRes.forEach((name: Names[0]) => {
              const time = name.changedToAt !== undefined ? new Date(name.changedToAt).toLocaleString('en-US') : 'First Appeared Name';
              embed.addFields([{ name: name.name, value: time }]);
            });
          } catch (e: any) {
            interaction.reply({ embeds: [embedUtils.error(e.toString())] });
            return;
          }
          const row = new ActionRowBuilder().addComponents([
            new ButtonBuilder()
              .setStyle(ButtonStyle.Link)
              .setURL(texturesRes.textures.SKIN.url)
              .setLabel('Player skin'),
          ]).addComponents([
            new ButtonBuilder()
              .setStyle(ButtonStyle.Link)
              .setURL(`https://namemc.com/search?q=${username}`)
              .setLabel('NameMC'),
          ]);
          interaction.reply({ embeds: [embed], components: [row as any] }); // need fix
          return;
        }
        default:
          interaction.reply({ embeds: [embedUtils.error('Please choose something.')] });
      }
    });
  },
};
