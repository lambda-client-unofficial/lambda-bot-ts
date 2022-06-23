import { Message } from 'discord.js';
import { defaultRepo } from '../../../config';

import('colors');

const issueRegex = /#\d+/g;
const fullIssueRegex = /[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}\/[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}#\d+/g; // validUsername/validRepo#issueNum
const commitRegex = /([a-fA-F0-9]{40})|([a-fA-F0-9]{7})/g; // either 40 characters long alphanumeric or 7 characters alphanumeric
const fullCommitRegex = /[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}\/[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}@(?:([a-fA-F0-9]{40})|([a-fA-F0-9]{7}))/g; // validUsername/validReponame@validCommit

export default async (message: Message) => {
  if (message.author.bot) return;

  if (issueRegex.test(message.content) || fullIssueRegex.test(message.content)) {
    try {
      const match = message.content.match(fullIssueRegex)![0].split('#');
      message.reply(`https://github.com/${match[0].split('/')[0]}/${match[0].split('/')[1]}/issues/${match[1]}`);
    } catch (e) {
      const match = message.content.match(issueRegex)!;
      message.reply(`https://github.com/${defaultRepo.owner}/${defaultRepo.repo}/issues/${match[0].slice(1)}`);
    }
  }

  if (commitRegex.test(message.content) || fullCommitRegex.test(message.content)) {
    try {
      const match = message.content.match(fullCommitRegex)![0].split('@');
      message.reply(`https://github.com/${match[0].split('/')[0]}/${match[0].split('/')[1]}/commit/${match[1]}`);
    } catch (e) {
      const match = message.content.match(commitRegex)!;
      message.reply(`https://github.com/${defaultRepo.owner}/${defaultRepo.repo}/commit/${match[0]}`);
    }
  }
};
