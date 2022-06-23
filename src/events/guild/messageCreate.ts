import { MessageEmbed, Message } from 'discord.js';
import embedUtils from '../../utils/embed';
import * as githubUtils from '../../utils/github';
import logger from '../../utils/logger';
import { defaultRepo } from '../../../config';

import('colors');

const issueRegex = /#\d+/g;
const commitRegex = /([a-fA-F0-9]{40})|([a-fA-F0-9]{7})/g; // either 40 characters long alphanumeric or 7 characters alphanumeric
const fullCommitRegex = /[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}\/[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}@(?:([a-fA-F0-9]{40})|([a-fA-F0-9]{7}))/g; // validUsername/validReponame@validCommit

export default async (message: Message) => {
  if (message.author.bot) return;

  if (issueRegex.test(message.content)) {
    const match = message.content.match(issueRegex)!;
    let data;
    try {
      data = await githubUtils.getIssue(null, null, Number(match[0].slice(1)));
    } catch (e: any) {
      logger.error(`[Github] ${e.toString()}`.red);
      (await message.reply({ embeds: [embedUtils.error(e.toString())] })).react('🗑');
      return;
    }
    const embed = new MessageEmbed()
      .setTitle(data.title)
      .setURL(data.html_url)
      .setDescription(data.body ?? 'No description provided')
      .setThumbnail(data.user.avatar_url)
      .setColor('AQUA');
    (await message.reply({ embeds: [embed] })).react('🗑');
  }

  if (commitRegex.test(message.content) || fullCommitRegex.test(message.content)) {
    try {
      const match = message.content.match(fullCommitRegex)![0].split('@');
      message.reply(`https://github.com/${match[0].split('/')[0]}/${match[0].split('/')[1]}/commit/${match[1]}`);
      message.content.match(commitRegex);
    } catch (e) {
      const match = message.content.match(commitRegex)!;
      message.reply(`https://github.com/${defaultRepo.owner}/${defaultRepo.repo}/commit/${match[0]}`);
    }
  }
};
