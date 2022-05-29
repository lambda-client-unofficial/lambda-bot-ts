import { Snowflake } from 'discord.js';
import axios from 'axios';

async function checkuser(id: Snowflake) {
  const req = await axios.get(`https://discordapp.com/api/v9/users/${id}`, {
    headers: {
      authorization: `Bot ${process.env.TOKEN}`,
    },
  }).then((req) => req.data.id).catch((err) => err);
  return !(req instanceof Error);
};

const discordUtils = {
  checkuser,
};

export default discordUtils;
