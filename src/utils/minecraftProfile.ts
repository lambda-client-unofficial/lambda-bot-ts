import fetch from 'cross-fetch';
import Profile from '../types/profile';
import Names from '../types/names';
import Textures, { TextureURL } from '../types/textures';

async function profile(name: string): Promise<Profile> {
  return (await (await fetch(`https://api.mojang.com/users/profiles/minecraft/${name}`)).json()) as Profile;
}

async function nameHistory(uuid: string): Promise<Names> {
  return (await (await fetch(`https://api.mojang.com/user/profiles/${uuid}/names`)).json()) as Names;
}

async function textures(uuid: string): Promise<TextureURL> {
  const data = (await (await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`)).json()) as Textures;
  return JSON.parse(Buffer.from(data.properties[0].value.toString(), 'base64').toString('utf8')) as TextureURL;
}

const minecraftUtils = {
  profile,
  nameHistory,
  textures,
};

export default minecraftUtils;
