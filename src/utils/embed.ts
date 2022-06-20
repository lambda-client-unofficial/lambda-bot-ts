import { MessageEmbed } from 'discord.js';

const error = (msg: string) => new MessageEmbed()
  .setTitle('Error')
  .addFields([{ name: 'Info', value: `${msg}` }])
  .setColor('RED');

const success = (msg: string) => new MessageEmbed()
  .setTitle('Success')
  .addFields([{ name: 'Info', value: `${msg}` }])
  .setColor('GREEN');

const embedUtils = {
  error,
  success,
};

export default embedUtils;
