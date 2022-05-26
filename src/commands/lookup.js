const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const embedUtils = require('../utils/embed.js');
const timestampToDate = require('timestamp-to-date');
const { profile, names, textures } = require('../utils/minecraftProfile')

module.exports = {
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

  run: async (interaction) => {
    for (const index of interaction.options.data) {
      switch (index.name) {
        case 'name': {
          const username = await interaction.options.getString('username');

          const user = profile(username)
          if (!user.name || !user.id) return await interaction.reply({ embeds: [embedUtils.error('No user found.')] });
          const _names = names(user.id)
          if(!_names) return await interaction.reply({ embeds: [embedUtils.error("Unknown error")]})
          const _textures = textures(user.id)
          if(!_textures) return await interaction.reply({ embeds: [embedUtils.error("No textures found")]})

          const embed = new EmbedBuilder()
            .setTitle(`${username}'s UUID`)
            .addFields([{ name: 'UUID:', value: user.id }])
            .setImage(`https://crafatar.com/renders/body/${user.id}?overlay`)
            .setColor('Blue');
          try {
            _names.forEach((name) => {
              let time = timestampToDate(name.changedToAt, 'yyyy-MM-dd HH:mm:ss'); if (time.toLowerCase().includes('nan')) time = 'First Appeared Name';
              embed.addFields([{ name: name.name ?? 'Unknown', value: time ?? 'First Appeared Name' }]);
            });
          } catch (e) {
            console.log(e);
          }
          const row = new ActionRowBuilder().addComponents([
            new ButtonBuilder()
              .setStyle('Link')
              .setURL(_textures.textures.SKIN.url)
              .setLabel('Player skin'),
          ]).addComponents([
            new ButtonBuilder()
              .setStyle('Link')
              .setURL(`https://namemc.com/search?q=${user.name}`)
              .setLabel('NameMC'),
          ]);
          return await interaction.reply({ embeds: [embed], components: [row] });
        }
      }
    }
  },
};
