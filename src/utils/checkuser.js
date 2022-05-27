const axios = require('axios');

const checkuser = async (id) => {
  if (!id instanceof Number) return false;
  const req = await axios.get(`https://discordapp.com/api/v9/users/${id}`, {
    headers: {
      authorization: `Bot ${process.env.TOKEN}`,
    },
  }).then((req) => req.data.id).catch((err) => err);
  return !(req instanceof Error);
};
module.exports = checkuser;
