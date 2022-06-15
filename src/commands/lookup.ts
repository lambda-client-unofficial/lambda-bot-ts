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
import Names from '../types/names.js';

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
          const user = await minecraftUtils.profile(username)!; // no need to check if the type is set to string bruh
          if (user == undefined) return interaction.reply({ embeds: [embedUtils.error('No user found.')] });
          const namesRes = await minecraftUtils.nameHistory(user.id);
          if (namesRes == undefined) return interaction.reply({ embeds: [embedUtils.error('Unknown error')] });
          const texturesRes = await minecraftUtils.textures(user.id)!;
          if (texturesRes == undefined) return interaction.reply({ embeds: [embedUtils.error('Unknown error')] });

          const embed = new EmbedBuilder()
            .setTitle(`${username}'s Profile`)
            .addFields([{ name: 'UUID:', value: user.id }])
            .setImage(`https://crafatar.com/renders/body/${user.id}?overlay`)
            .setColor(Colors.Blue);
          try {
            namesRes.forEach((name: Names[0]) => { //need fix for Usernames
              let time = name.changedToAt ? new Date(name.changedToAt).toLocaleString("en-US") : "First Appeared Name"
              embed.addFields([{ name: name.name, value: time }]);
            });
          } catch (e) {
            return e;
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
          return interaction.reply({ embeds: [embed], components: [row as any] }); // need fix
        }
        default:
          return interaction.reply({ embeds: [embedUtils.error('Please choose something.')] });
      }
    });
  },
};