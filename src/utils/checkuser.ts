import { APIUser, Snowflake } from 'discord.js';
import fetch from 'cross-fetch';

async function checkuser(id: Snowflake) {
  const req = await fetch(`https://discordapp.com/api/v9/users/${id}`, {
    headers: {
      "Authorization": `Bot ${process.env.TOKEN}`,
    },
  })
  return req.ok ? await req.json() as APIUser : undefined;
}

const discordUtils = {
  checkuser,
};

export default discordUtils;
