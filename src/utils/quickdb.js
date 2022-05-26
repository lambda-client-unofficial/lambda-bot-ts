const db = require('quick.db');
const sha1 = require('sha1');
const safecheck = require('./checkjson');

const init = async () => {
  if (!db.get('capes')) { db.set('capes', []); }
};

const push = async (key, ...data) => {
  init();
  const __ = [];
  data = JSON.parse(data);
  for (const _ in data) {
    if (!safecheck(data[_])) return false;

    __.push(data[_]);
  }
  db.set(key, __);
};
const sha_push = async (data = '', safecheck = false, origin = '') => {
  if (data === '') throw 'Empty data';
  if (safecheck) if (sha1(origin) !== data) throw 'Content does not match the sha1 hash';
  db.set('sha', data);
};

const get = async (key = String) => {
  init();
  const _ = await db.get(key);
  return _ != null ? _ : false;
};

const UwU = {
  push,
  get,
  sha_push,
};
module.exports = UwU;
