import { Client, Message } from "discord.js"
import * as capeUtils from "../utils/capes.js";
import * as embedUtils from "../utils/embed.js";

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {string[]} args 
 */
const invoke = (client, message, args) => {
  if (message.member.roles.cache.has("848787555575267328")) {
    switch (args[0]) {
      case 'pull':
        const result = capeUtils.pull();
        if (result === 'conflict' && args[1] !== '--force') {
          message.channel.send({ embeds: [embedUtils.error('Conflict detected. Please resolve it first. Add `--force` to override local data.')] });
        }
        break;
      case 'push':
        capeUtils.push();
        break;
      default:
        message.channel.send({ embeds: [embedUtils.error('Specify push or pull.')] })
        break;
    }
  }
}

const info = {
  name: 'cape',
}

export {
  invoke,
  info,
}