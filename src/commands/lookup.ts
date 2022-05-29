import {
  CommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';
import embedUtils from '../utils/embed.js';
import minecraftUtils from '../utils/minecraftProfile';
import { Usernames } from './types/Usernames.js';

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
          const username = interaction.options.get("username") as unknown; //need fix
          let user = await minecraftUtils.profile(username as any); //no need to check if the type is set to string bruh
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
            namesRes.forEach((name: Usernames) => {
              let time = new Date(name.changedToAt).toString(); if (time.toString().toLowerCase().includes('nan')) time = 'First Appeared Name';
              embed.addFields([{ name: name.name ?? 'Unknown', value: time ?? 'First Appeared Name' }]);
            });
          } catch (e) {
            return e;
          }
          const row = new ActionRowBuilder().addComponents([
            new ButtonBuilder()
              .setStyle(ButtonStyle.Link)
              .setURL(texturesRes)
              .setLabel('Player skin'),
          ]).addComponents([
            new ButtonBuilder()            
              .setStyle(ButtonStyle.Link)
              .setURL(`https://namemc.com/search?q=${username}`)
              .setLabel('NameMC'),
          ]);
          return interaction.reply({ embeds: [embed], components: [row as any] }); //need fix
        }
        default:
          return interaction.reply({ embeds: [embedUtils.error('Please choose something.')] });
      }
    });
  },
};

