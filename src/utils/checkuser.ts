import fetch from 'node-fetch';

const checkuser = async (id: number) => {
  fetch(`https://discordapp.com/api/v9/users/${id}`, {
    headers: {
      authorization: `Bot ${process.env.TOKEN}`,
    },
  })
    .then((req) => req.json())
    .then((data: any) => data.id)
    .catch(() => false);
  return true;
};

const discordUtils = {
  checkuser,
};

export default discordUtils;
