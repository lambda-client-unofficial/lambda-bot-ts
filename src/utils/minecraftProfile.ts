import fetch from 'node-fetch';
import Profile from '../types/profile';
import Name from '../types/name';
import Textures from '../types/textures';

function profile(name: string): Profile | undefined {
  fetch(`https://api.mojang.com/users/profiles/minecraft/${name}`)
    .then((res) => res.json())
    .then((data) => (data as Profile))
    .catch((_err) => false);
  return undefined;
}

function nameHistory(uuid: string): Name[] | undefined {
  fetch(`https://api.mojang.com/user/profiles/${uuid}/names`)
    .then((res) => res.json())
    .then((data) => (data as Name[]))
    .catch((_err) => false);
  return undefined;
}

function textures(uuid: string): Textures | undefined {
  fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`)
    .then((res) => res.json())
    .then((data) => (data as Textures))
    .catch((_err) => false);
  return undefined;
}

const minecraftUtils = {
  profile,
  nameHistory,
  textures,
};

export default minecraftUtils;
