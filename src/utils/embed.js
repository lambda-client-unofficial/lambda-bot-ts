const { EmbedBuilder } = require('discord.js');

const error = (msg = '') => new EmbedBuilder()
  .setTitle('Error')
  .addFields([{ name: 'Info', value: `${msg}` }])
  .setColor('Red');

const success = (msg = '') => new EmbedBuilder()
  .setTitle('Success')
  .addFields([{ name: 'Info', value: `${msg}` }])
  .setColor('Green');

const embedUtils = {
  error,
  success,
};

module.exports = embedUtils;
