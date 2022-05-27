const axios = require('axios');

const checkuser = async (id) => {
  if (!(id instanceof Number)) return false;
  axios.get(`https://discordapp.com/api/v9/users/${id}`, {
    headers: {
      authorization: `Bot ${process.env.TOKEN}`,
    },
  }).then((req) => req.data.id).catch((_err) => false);
  return true;
};
module.exports = checkuser;
