import { Client, Message } from "discord.js"
import * as capeUtils from "../utils/capes.js";
import * as embedUtils from "../utils/embed.js";
import { format } from "../utils/uuid.js";

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {string[]} args 
 */
const invoke = async (client, message, args) => {
  if (!message.member.roles.cache.has("848787555575267328")) {
    switch (args[0]) {
      case 'pull':
        const pullResult = await capeUtils.pull();
        if (pullResult === 'conflict' && args[1] !== '--force') {
          message.channel.send({ embeds: [embedUtils.error('Conflict detected. Please resolve it first. Add `--force` to override local data.')] });
        }
        message.channel.send({ embeds: [embedUtils.success('Pulled from remote.')] });
        break;
      case 'push':
        const pushResult = await capeUtils.push();
        if (pushResult === 'not found') {
          message.channel.send({ embeds: [embedUtils.error('No local data found. Please pull first.')] });
        }
        message.channel.send({ embeds: [embedUtils.success('Pushed to remote.')] });
        break;
      case 'add':
        if (args.length - 1 < 2) {
          message.channel.send({ embeds: [embedUtils.error('Please provide a discord id and a UUID.')] });
        }
        const addResult = capeUtils.add(args[1], args[2]);
        if (addResult === 'not found') {
          message.channel.send({ embeds: [embedUtils.error('No local data found. Please pull first.')] });
        }
        message.channel.send({ embeds: [embedUtils.success(`Added <@${args[1]}> with UUID ${format(args[2])}`)] });
        break;
      default:
        message.channel.send({ embeds: [embedUtils.error('Specify push or pull.')] })
        break;
    }
  } else {
    message.channel.send({ embeds: [embedUtils.error('You do not have the permission to do that.')] })
  }
}

const info = {
  name: 'cape',
}

export {
  invoke,
  info,
}