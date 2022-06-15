import fetch from 'cross-fetch';
import Profile from '../types/Profile';
import Names from '../types/name';
import Textures, { TextureURL } from '../types/textures';

async function profile(name: string): Promise<Profile | undefined> {
  const profile: Profile = await (await fetch(`https://api.mojang.com/users/profiles/minecraft/${name}`)).json()
  return profile instanceof Error ? undefined : profile
}

async function nameHistory(uuid: string): Promise<Names | undefined> {
  const names: Names = await (await fetch(`https://api.mojang.com/user/profiles/${uuid}/names`)).json()
  return names instanceof Error ? undefined : names
}

async function textures(uuid: string): Promise<TextureURL | undefined> {
  const textures = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`).catch(err => err).then(async(textures) => {
    return await textures.json() as Textures
  })
  const texture_url: TextureURL = JSON.parse(atob(textures.properties[0].value as unknown as string))!
  return textures instanceof Error ? undefined : texture_url
}

const minecraftUtils = {
  profile,
  nameHistory,
  textures,
};

export default minecraftUtils;
