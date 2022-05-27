const db = require('quick.db');
const sha1 = require('sha1');
const safecheck = require('./checkjson');

const init = async () => {
  if (!db.get('capes')) { db.set('capes', []); }
};

const push = async (key, ...data) => {
  init();
  const array = [];
  // eslint-disable-next-line consistent-return
  data.forEach((i) => {
    if (!safecheck(data[i])) return false;
    array.push(data[i]);
  });
  db.set(key, array);
};
const shaPush = async (data, origin, check = false) => {
  init();
  if (data === '') throw Error('Empty data');
  if (check) if (sha1(origin) !== data) throw Error('Content does not match the sha1 hash');
  db.set('sha', data);
};

const get = async (key = String) => {
  init();
  const data = await db.get(key);
  return data != null ? data : false;
};

const modules = {
  push,
  get,
  shaPush,
};
module.exports = modules;
