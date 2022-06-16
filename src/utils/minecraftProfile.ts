import fetch from 'cross-fetch';
import Profile from '../types/Profile';
import Names from '../types/names';
import Textures, { TextureURL } from '../types/textures';

function profile(name: string): Profile | undefined {
  fetch(`https://api.mojang.com/users/profiles/minecraft/${name}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((e) => e);
  return undefined;
}

function nameHistory(uuid: string): Names | undefined {
  fetch(`https://api.mojang.com/user/profiles/${uuid}/names`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((e) => e);
  return undefined;
}

function textures(uuid: string): TextureURL | undefined {
  fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`)
    .then((res) => res.json())
    .then((data: Textures) => JSON.parse(Buffer.from(data.properties[0].value.toString(), 'base64').toString('utf8')))
    .catch((e) => e);
  return undefined;
}

const minecraftUtils = {
  profile,
  nameHistory,
  textures,
};

export default minecraftUtils;
