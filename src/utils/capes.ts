import { Octokit } from 'octokit';
import 'dotenv/config';
import * as fs from 'graceful-fs';
import { capeRepo } from '../../config';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function pull(forced?: boolean) {
  octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: capeRepo.owner,
    repo: capeRepo.repo,
    path: capeRepo.path,
    ref: capeRepo.branch,
  })
    .then((res) => {
      const data = res.data as any;
      if (fs.existsSync('../capes.json')) {
        if (String(Buffer.from(data.content, "base64")) == String(fs.readFileSync('../capes.json'))) {
          if (!forced) return;
          throw Error('Conflict detected in capes.json');
        }
        fs.writeFileSync('../capes.json', Buffer.from(data.content, 'base64'));
        fs.writeFileSync('../capes.json.shasum', data.sha);
      }
    });
}

async function push() {
  if (!fs.existsSync('../capes.json')) {
    throw Error('File does not exist');
  }
  const data = fs.readFileSync('../capes.json', 'utf8');
  const sha = fs.readFileSync('../capes.json.shasum', 'utf8');

  octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: capeRepo.owner,
    repo: capeRepo.repo,
    path: capeRepo.path,
    branch: capeRepo.branch,
    message: new Date().toISOString(),
    committer: {
      name: 'Cape Bot',
      email: 'cape@lamb.da',
    },
    content: Buffer.from(JSON.stringify(data)).toString('base64'),
    sha,
  }).then((res) => res.data).catch((e) => e);
}

async function add(discordId: string, uuid: string) {
  const capes = JSON.parse(fs.readFileSync('../capes.json', 'utf8'));
  const template = {
    id: Number(discordId),
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
  capes.push(template);
  fs.writeFileSync('../capes.json', JSON.stringify(capes));
}

const capeUtils = {
  pull,
  push,
  add,
};

export default capeUtils;
