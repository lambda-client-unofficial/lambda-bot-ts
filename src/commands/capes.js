const capeUtils = require('../utils/capes.js');
const embedUtils = require('../utils/embed.js');
const uuidUtils = require('../utils/uuid.js');
const checkuser = require('../utils/checkuser.js');

module.exports = {
  name: 'capes',
  description: 'Edit capes',
  options: [
    {
      name: 'pull',
      description: 'Pull capes',
      type: 1,
      options: [
        {
          name: 'force',
          description: 'Force overwrite',
          type: 5,
        },
      ],
    },
    {
      name: 'push',
      description: 'Push capes',
      type: 1,
    },
    {
      name: 'add',
      description: 'Add capes',
      type: 1,
      options: [
        {
          name: 'user_id',
          description: 'User ID',
          type: 3,
          required: true,
        },
        {
          name: 'minecraft_username',
          description: 'Minecraft username',
          type: 3,
          required: true,
        },
        /* {
                    name: "cape",
                    description: "Cape",
                    type: 3,
                    required: true,
                    choices: [
                        {
                            name: "Contributor",
                            name: "Contributor cape",
                            value: ""
                        },
                    ]
                } */
      ],
    },
  ],

  run: async (interaction) => {
    for (const index of interaction.options.data) {
      switch (index.name) {
        case 'pull': {
          const isForced = interaction.options.getBoolean('force') ?? false;
          const pullResult = await capeUtils.pull(isForced);
          if (!pullResult && !isForced) return interaction.reply({ embeds: [embedUtils.error('Add `force:true` in the options to override local data.')] });
          return interaction.reply({ embeds: [embedUtils.success('Pulled!')] });
        }
        case 'push': {
          const pushResult = await capeUtils.push();
          if (!pushResult) { await capeUtils.pull(); await capeUtils.push(); }
          return interaction.reply({ embeds: [embedUtils.success('Pushed to remote.')] });
        }
        case 'add': {
          const minecraft_username = await interaction.options.getString('minecraft_username');
          const user = await interaction.options.getString('user_id').split("'")[0];
          if (!await checkuser(user)) return await interaction.reply({ embeds: [embedUtils.error('Invalid user')] });
          const minecraft_uuid = await uuidUtils.usernameToUUID(minecraft_username);
          if (!minecraft_uuid) return await interaction.reply({ embeds: [embedUtils.error('Invalid username or nonexistent player')] });
          const addResult = await capeUtils.add(user, minecraft_uuid);
          if (!addResult) return interaction.reply({ embeds: [embedUtils.error('No local data found. Please pull first.')] });
          return interaction.reply({ embeds: [embedUtils.success(`Added <@${user}>, Info: \`\`\`Username: ${minecraft_username}\nUUID: ${minecraft_uuid}\`\`\``)] });
        }
        default: return interaction.reply({ embeds: [embedUtils.error('Please choose something.')] });
      }
    }
  },
};
