const { Octokit } = require('@octokit/core');
const uuidUtils = require('./uuid.js');
require('dotenv').config();
const { capeRepo } = require('../../config.js');
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
  JSON.parse(Buffer.from(res.data.content, 'base64').toString()).forEach((cape) => {
    db.push('capes', cape);
  });
  db.sha_push(res.data.sha);
};

const push = async () => {
  const capes = await db.get('capes');
  const sha = await db.get('sha');
  console.log(sha);
  await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: capeRepo.owner,
    repo: capeRepo.repo,
    path: capeRepo.path,
    branch: capeRepo.branch,
    message: new Date().toISOString(),
    committer: {
      name: 'Cape Bot',
      email: 'cape@lamb.da',
    },
    content: Buffer.from(JSON.stringify(capes)).toString('base64'),
    sha,
  }).catch((e) => {
    console.log(e); return false;
  });
  return true;
};

const add = async (discordId, uuid, type /* <-When more than CONTRIBUTOR */) => {
  const capes = await db.get('capes');
  const template = {
    id: discordId,
    capes: [
      {
        cape_uuid: Number(JSON.stringify(capes.length + 1)),
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
    capes.push(template);
  } catch (e) {
    console.log(e);
    return false;
  }
  db.push('capes', template).catch(() => false);
  return true;
};

const capeUtils = {
  pull,
  push,
  add,
};

module.exports = capeUtils;
