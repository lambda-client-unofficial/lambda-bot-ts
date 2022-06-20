import { MessageReaction, User } from 'discord.js';

export default async (reaction: MessageReaction, _user: User) => {
  if (reaction.message.author?.id === reaction.client.user?.id && reaction.emoji.name === '🗑') {
    await reaction.message.delete();
  }
};
