import fs from 'graceful-fs';
import { Octokit } from '@octokit/core';
import * as config from '../../config.js';
import { format } from './uuid.js';
import { capeRepo } from '../../config.js';

const octokit = new Octokit({
  auth: config.githubToken,
});

const pull = async () => {
  octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: capeRepo.owner,
    repo: capeRepo.repo,
    path: capeRepo.path,
    ref: capeRepo.branch,
  }).then(res => {
    if (fs.existsSync('../capes.json') && Buffer.from(res.data.content, 'base64') !== fs.readFileSync('../capes.json')) {
      return 'conflict';
    }
    fs.writeFileSync('../capes.json', Buffer.from(res.data.content, 'base64'));
    fs.writeFileSync('../capes.json.shasum', res.data.sha);
  });
}

const push = async () => {
  if (!fs.existsSync('../capes.json') || !fs.existsSync('../capes.json.shasum')) {
    return 'not found';
  }
  octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: capeRepo.owner,
    repo: capeRepo.repo,
    path: capeRepo.path,
    branch: capeRepo.branch,
    message: new Date().toISOString(),
    committer: {
      name: 'Cape Bot',
      email: 'cape@lamb.da'
    },
    content: Buffer.from(fs.readFileSync('../capes.json')).toString('base64'),
    sha: fs.readFileSync('../capes.json.shasum').toString(),
  }).then(res => {
    return res;
  });
}

const add = async (discordId, uuid) => {
  if (!fs.existsSync('../capes.json') || !fs.existsSync('../capes.json.shasum')) {
    return 'not found';
  }

  const data = JSON.parse(fs.readFileSync('../capes.json'));
  data.push({
    "id": discordId,
    "capes": [
      {
        "cape_uuid": parseInt(data[data.length - 1].capes[0].cape_uuid) + 1,
        "player_uuid": format(uuid),
        "type": "CONTRIBUTOR",
        "color": {
          "primary": "272727",
          "border": "363636"
        }
      }
    ],
    "is_premium": true
  })
  fs.writeFileSync('../capes.json', JSON.stringify(data, null, 2));
}

const capeUtils = {
  pull,
  push,
  add,
}

export default capeUtils;