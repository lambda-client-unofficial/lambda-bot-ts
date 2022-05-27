const db = require('quick.db');
const sha1 = require('sha1');
const safecheck = require('./checkjson');

const init = async () => {
  if (!db.get('capes')) { db.set('capes', []); }
};

const push = async (key, ...data) => {
  init();
  const array = [];
  data = JSON.parse(data);
  for (const i in data) {
    if (!safecheck(data[i])) return false;

    array.push(data[i]);
  }
  db.set(key, array);
};
const sha_push = async (data, safecheck = false, origin) => {
  if (data === '') throw 'Empty data';
  if (safecheck) if (sha1(origin) !== data) throw 'Content does not match the sha1 hash';
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
  sha_push,
};
module.exports = modules;
