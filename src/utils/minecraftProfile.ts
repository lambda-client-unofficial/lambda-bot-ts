import fetch from 'node-fetch';
import Profile from '../interfaces/minecraftProfile';
import Names from '../interfaces/minecraftNames';
import Texture from '../interfaces/minecraftTexture';

function profile(name: string): Profile | undefined {
  fetch(`https://api.mojang.com/users/profiles/minecraft/${name}`)
    .then((res) => res.json())
    .then((data) => data as Profile)
    .catch(() => {});
  return undefined;
}

function names(uuid: string): Names | undefined {
  fetch(`https://api.mojang.com/user/profiles/${uuid}/names`)
    .then((res) => res.json())
    .then((data) => data as Names)
    .catch(() => {});
  return undefined;
}
function textures(name: string): string | undefined {
  fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${name}`)
    .then((res) => res.json())
    .then((data) => {
      const { value } = (data as Texture).properties[0];
      return JSON.parse(Buffer.from(value, 'base64').toString()).textures?.SKIN?.url;
    })
    .catch(() => {});
  return undefined;
}

const minecraftUtils = {
  profile,
  names,
  textures,
};

export default minecraftUtils;
