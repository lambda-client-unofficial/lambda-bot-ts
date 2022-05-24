import { MessageEmbed } from "discord.js";
import { Client, Message } from "discord.js"
import { colors } from "../utils/colors.js";
import { error } from "../utils/embed.js";
import fetch from 'node-fetch';

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {string[]} args 
 */
const invoke = (client, message, args) => {
  switch (args[0]) {
    case 'name':
      if (!args[1]) {
        message.channel.send({ embeds: [error('Please provide a name.')] });
      }
      fetch(`https://api.mojang.com/users/profiles/minecraft/${args[1]}`)
        .then(res => res.json())
        .then(data => {
          if (!data.id || !data.name) {
            message.channel.send({ embeds: [error('No user found.')] });
            return
          }
          const embed = new MessageEmbed()
            .setTitle(`${data.name}'s UUID`)
            .setDescription(`\`\`\`${data.id}\`\`\``)
            .setImage(`https://crafatar.com/renders/body/${data.id}?overlay`)
            .setColor(colors.blue)
          message.channel.send({ embeds: [embed] });
        })
        .catch(err => { error(err) });
      break;

    case 'uuid':
      if (!args[1]) {
        message.channel.send({ embeds: [error('Please provide a UUID.')] });
      }
      fetch(`https://api.mojang.com/user/profiles/${args[1]}/names`)
        .then(res => res.json())
        .then(data => {
          if (!data[data.length - 1]) {
            message.channel.send({ embeds: [error('No user found.')] });
            return
          }
          const embed = new MessageEmbed()
            .setTitle(`${args[1]}'s Name`)
            .setDescription(`\`\`\`${data[data.length - 1].name}\`\`\``)
            .setImage(`https://crafatar.com/renders/body/${args[1]}?overlay`)
            .setColor(colors.blue)
          message.channel.send({ embeds: [embed] });
        })
        .catch(err => { error(err) });
      break;
    default:
      message.channel.send({ embeds: [error('Specify name or uuid.')] })
      break;
  }
}

const info = {
  name: 'lookup',
  description: 'looks up player by name or by UUID',
}

export {
  invoke,
  info,
}