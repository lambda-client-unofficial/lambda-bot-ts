import db from 'quick.db';
import sha1 from 'sha1';

const init = async () => {
  if (!db.get('capes')) { db.set('capes', []); }
};

const push = async (key: any, ...data: any) => {
  init();
  const array: any = [];
  data.forEach((i: any) => {
    array.push(i);
  });
  db.set(key, array);
};

const shaPush = async (data: any, origin: any, check = false) => {
  init();
  if (data === '') throw Error('Empty data');
  if (check) if (sha1(origin) !== data) throw Error('Content does not match the sha1 hash');
  db.set('sha', data);
};

const get = async (key: string) => {
  init();
  const data = await db.get(key);
  return data != null ? data : false;
};

const dbUtils = {
  push,
  get,
  shaPush,
};

export default dbUtils;
