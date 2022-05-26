const fs = require('fs');
const uuidUtils = require('./uuid.js');
require('dotenv').config();
const { Octokit } = require('octokit');
const axios = require('axios');
const capeRepo = require('../config');
const db = require('./quickdb');

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const pull = async (overwrite = Boolean) => {
  const res = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: capeRepo.owner,
    repo: capeRepo.repo,
    path: capeRepo.path,
    ref: capeRepo.branch,
  }).catch(((e) => console.error(e)));
  db.push('capes', Buffer.from(res.data.content, 'base64').toString());
  db.sha_push(res.data.sha);
};

const push = async () => {
  const _ = await db.get('capes');
  console.log(_);
  const __ = await db.get('sha');
  const ___ = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: capeRepo.owner,
    repo: capeRepo.repo,
    path: capeRepo.path,
    branch: capeRepo.branch,
    message: new Date().toISOString(),
    committer: {
      name: 'Cape Bot',
      email: 'cape@lamb.da',
    },
    content: Buffer.from(JSON.stringify(_)).toString('base64'),
    sha: __,
  }).catch((e) => {
    console.log(e); return false;
  });
  return true;
};

const add = async (discordId, uuid, type) => {
  const _ = await db.get('capes');
  const template = {
    id: discordId,
    capes: [
      {
        cape_uuid: Number(JSON.stringify(_.length + 1)),
        player_uuid: uuid,
        type: 'CONTRIBUTOR',
        color: {
          primary: '272727',
          border: '363636',
        },
      },
    ],
    is_premium: true,
  };
  try {
    _.push(template);
  } catch (e) {
    console.log(e);
  }
  db.push('capes', template).catch((e) => {
    console.log(e);
  });
  console.log(await db.get('capes')).catch((e) => {});
};

const capeUtils = {
  pull,
  push,
  add,
};

module.exports = capeUtils;
