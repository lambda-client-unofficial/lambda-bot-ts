import { Client, Message } from 'discord.js';

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {string[]} args
 */
const invoke = (client, message, args) => {
  message.channel.send(`Pong! Latency is ${client.ws.ping}ms. API Latency is ${client.ping}ms.`);
};

const info = {
  name: 'ping',
  description: 'pong',
};

export {
  invoke,
  info,
};
