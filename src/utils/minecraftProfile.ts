import fetch from 'cross-fetch';
import Profile from '../types/Profile';
import Names from '../types/names';
import Textures, { TextureURL } from '../types/textures';

async function profile(name: string): Promise<Profile | undefined> {
  const userProfile: Profile = await fetch(`https://api.mojang.com/users/profiles/minecraft/${name}`).then(async res => await res.json()).catch((err: Error) => err)
  return userProfile instanceof Error ? undefined : userProfile;
}

async function nameHistory(uuid: string): Promise<Names | undefined> {
  const names: Names = await fetch(`https://api.mojang.com/user/profiles/${uuid}/names`).then(async res => await res.json()).catch((err: Error) => err)
  return names instanceof Error ? undefined : names;
}

async function textures(uuid: string): Promise<TextureURL | undefined> {
  const textureUser: Textures = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`).then(async res => await res.json()).catch((err: Error) => err);
  const texture_url: TextureURL = JSON.parse(atob(textureUser.properties[0].value.toString()))!;
  return textureUser instanceof Error ? undefined : texture_url;
}

const minecraftUtils = {
  profile,
  nameHistory,
  textures,
};

export default minecraftUtils;
