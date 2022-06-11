import fetch from 'node-fetch';

const format = (uuid: string) => {
  if (typeof uuid !== 'string') throw Error('Bad UUID');
  const part1 = uuid.slice(0, 8);
  const part2 = uuid.slice(8, 12);
  const part3 = uuid.slice(12, 16);
  const part4 = uuid.slice(16, 20);
  const part5 = uuid.slice(20, 32);
  return `${part1}-${part2}-${part3}-${part4}-${part5}`;
};

function usernameToUUID(username: string): string?{
  fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`)
    .then((res) => res.json())
    .then((data: any) => data.data.id)
  return undefined;
};

const uuidUtils = {
  format,
  usernameToUUID,
};

export default uuidUtils;
