import fetch from 'node-fetch';
import Profile from '../types/Profile';

function profile(name: string): Profile | undefined {
  fetch(`https://api.mojang.com/users/profiles/minecraft/${name}`)
    .then((res) => res.json())
    .then((data) => (data as Profile))
    .catch((_err) => false);
  return undefined;
}

function nameHistory(uuid: string) {
  fetch(`https://api.mojang.com/user/profiles/${uuid}/names`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((_err) => false);
}

function textures(uuid: string) {
  fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((_err) => false);
}

const minecraftUtils = {
  profile,
  nameHistory,
  textures,
};

export default minecraftUtils;
