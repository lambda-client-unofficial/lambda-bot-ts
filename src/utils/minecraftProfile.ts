import axios from 'axios';  

const profile = async (name: string) => {
  const user = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${name}`).then((user) => user?.data?.id).catch((user) => user);
  return user instanceof Error ? false : user;
};
const names = async (name: String) => {
  const names = await axios.get(`https://api.mojang.com/user/profiles/${name}/names`).then((names) => names?.data).catch((names) => names);
  return names instanceof Error ? false : names;
};
const textures = async (name: String) => {
  const req = await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${name}`).then((textures) => textures?.data?.properties[0]?.value).catch((textures) => textures);
  const textures = JSON.parse(Buffer.from(req, 'base64').toString()).textures?.SKIN?.url;
  return textures instanceof Error ? false : textures;
};

const minecraftUtils = {
  profile,
  names,
  textures,
};

export default minecraftUtils;
