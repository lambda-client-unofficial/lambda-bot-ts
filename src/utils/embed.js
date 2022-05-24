import { MessageEmbed } from 'discord.js';
import colors from './colors.js';

const error = (msg) => (
  new MessageEmbed()
    .setTitle('Error')
    .addField('Info', msg)
    .setColor(colors.red)
);

const success = (msg) => (
  new MessageEmbed()
    .setTitle('Success')
    .addField('Info', msg)
    .setColor(colors.green)
);

const embedUtils = {
  error,
  success,
};

export default embedUtils;
