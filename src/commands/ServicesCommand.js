import { Client, Message, MessageEmbed } from "discord.js"
import ms from 'ms';
import colors from "../utils/colors.js";

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {string[]} args 
 */
const invoke = (client, message, args) => {
  const embed = new MessageEmbed()
    .setTitle('Services')
    .setColor(colors.blue)
  client.services.map(service => {
    embed.addField(`${service.info.name} ${service.info.disabled ? '[DISABLED]' : ''}`, `\`\`\`Description:\n${service.info.description}\n\nInterval:\n${ms(service.info.interval, { long: true })}\`\`\``);
  })
  message.channel.send({ embeds: [embed] });
}

const info = {
  name: 'services',
  description: 'list all services',
}

export {
  invoke,
  info,
}