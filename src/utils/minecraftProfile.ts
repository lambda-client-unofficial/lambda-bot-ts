import fetch from 'node-fetch';

const profile = async (name: string) => {
  fetch(`https://api.mojang.com/users/profiles/minecraft/${name}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => err);
};
const names = async (uuid: string) => {
  fetch(`https://api.mojang.com/user/profiles/${uuid}/names`)
    .then((res) => res.json)
    .then((data) => data)
    .catch((err) => err);
};
const textures = async (name: string) => {
  fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${name}`)
    .then((res) => res.json())
    .then((data: any) => {
      const value = data.properties[0].value;
      return JSON.parse(Buffer.from(value, 'base64').toString()).textures?.SKIN?.url
    })
    .catch((err) => err);
};
const minecraftUtils = {
  profile,
  names,
  textures,
};

export default minecraftUtils;