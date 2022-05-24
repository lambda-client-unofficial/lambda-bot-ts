import fs from 'graceful-fs';
import { Octokit } from '@octokit/core';
import * as config from '../../config.js';

const octokit = new Octokit({
  auth: config.githubToken,
});

const pull = async () => {
  octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'i-spin',
    repo: 'cape-api',
    path: 'capes.json',
    ref: 'capes',
  }).then(res => {
    if (Buffer.from(res.data.content, 'base64') !== fs.readFileSync('../capes.json')) {
      return 'conflict';
    }
    fs.writeFileSync('../capes.json', Buffer.from(res.data.content, 'base64'));
    fs.writeFileSync('../capes.json.shasum', res.data.sha);
  });
}

const push = async () => {
  octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: 'i-spin',
    repo: 'cape-api',
    path: 'capes.json',
    branch: 'capes',
    message: new Date().toISOString(),
    committer: {
      name: 'Cape Bot',
      email: 'cape@lamb.da'
    },
    content: Buffer.from(fs.readFileSync('../capes.json')).toString('base64'),
    sha: fs.readFileSync('../capes.json.shasum').toString(),
  }).then(res => {
    console.log(res);
  });
}

export {
  pull,
  push,
}