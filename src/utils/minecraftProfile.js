const axios = require('axios').default;

const profile = async (name) => {
  const user = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${name}`).then((res) => res?.data?.id).catch((err) => err);
  return user instanceof Error ? false : user;
};
const names = async (name) => {
  const data = await axios.get(`https://api.mojang.com/user/profiles/${name}/names`).then((res) => res?.data).catch((err) => err);
  return data instanceof Error ? false : data;
};
const textures = async (name) => {
  const req = await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${name}`).then((res) => res?.data?.properties[0]?.value).catch((err) => err);
  const data = JSON.parse(Buffer.from(req, 'base64').toString()).textures?.SKIN?.url;
  return data instanceof Error ? false : data;
};
const modules = {
  profile,
  names,
  textures,
};
module.exports = modules;
